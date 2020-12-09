// data/get_one_actor.go - Get one actor
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

package data

import (
	sql "database/sql"
)

// Get one entry in the sg.actor table by its Id and return it
// as a struct
func (db *Database) GetOneActor(id int64) (*Actor, error) {
	var (
		a     *Actor
		row   *sql.Row
		query string
		err   error
	)

	// Select query
	query = `
	SELECT
		actor_id, doc_id, name, avatar,
		meta_role, priority, ext_strength, ext_weakness,
		int_virtue, int_flaw, prime_desire, starting_goal,
		ultimate_goal, denouement, created_on, updated_on
	FROM
		sg.actor
	WHERE
		actor_id = $1
	`

	// Execute the query
	row = db.conn.QueryRow(query, id)

	a = &Actor{}

	// Scan the rows into the structure
	err = row.Scan(
		&a.Id,
		&a.DocumentId,
		&a.Name,
		&a.Avatar,
		&a.Role,
		&a.Priority,
		&a.ExternalStrength,
		&a.ExternalWeakness,
		&a.InternalVirtue,
		&a.InternalFlaw,
		&a.PrimaryDesire,
		&a.StartingGoal,
		&a.UltimateGoal,
		&a.Denoument,
		&a.CreatedOn,
		&a.UpdatedOn,
	)

	if err != nil {
		db.logger.Printf("GetOneActor() failed: %s\n", err)
		return nil, err
	}

	return a, nil
}
