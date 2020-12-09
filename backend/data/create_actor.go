// data/create_actor.go - Create Actor
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package data

import (
	sql "database/sql"
)

// Create a new entry in the sg.actor table, get the entry and return it
// as a serialized struct.
func (db *Database) CreateActor(
	docId int64,
	a Actor,
) (*Actor, error) {
	var (
		b     *Actor
		row   *sql.Row
		query string
		err   error
	)

	// Insert query
	query = `
	INSERT INTO
		sg.actor (
			doc_id, name, avatar, meta_role,
			priority, ext_strength, ext_weakness, int_virtue,
			int_flaw, prime_desire, starting_goal, ultimate_goal,
			denouement
		)
	VALUES (
		$1, $2, $3, $4, $5, $6, $7,
		$8, $9, $10, $11, $12, $13
	) RETURNING
		actor_id, doc_id, name, avatar,
		meta_role, priority, ext_strength, ext_weakness,
		int_virtue, int_flaw, prime_desire, starting_goal,
		ultimate_goal, denouement, created_on, updated_on
	`

	// Execute query
	row = db.conn.QueryRow(
		query,
		docId,
		a.Name,
		a.Avatar,
		a.Role,
		a.Priority,
		a.ExternalStrength,
		a.ExternalWeakness,
		a.InternalVirtue,
		a.InternalFlaw,
		a.PrimaryDesire,
		a.StartingGoal,
		a.UltimateGoal,
		a.Denoument,
	)

	// Allocate new struct
	b = &Actor{}

	err = row.Scan(
		&b.Id,
		&b.DocumentId,
		&b.Name,
		&b.Avatar,
		&b.Role,
		&b.Priority,
		&b.ExternalStrength,
		&b.ExternalWeakness,
		&b.InternalVirtue,
		&b.InternalFlaw,
		&b.PrimaryDesire,
		&b.StartingGoal,
		&b.UltimateGoal,
		&b.Denoument,
		&b.CreatedOn,
		&b.UpdatedOn,
	)

	if err != nil {
		db.logger.Printf("CreateActor() failed: %s\n", err)
		return nil, err
	}

	return b, nil
}
