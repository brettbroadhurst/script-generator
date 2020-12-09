// data/get_all_actor.go - Get all actors in a document
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package data

import (
	sql "database/sql"
)

// Get all entres from the sg.actor table with a document id
// and return it as a serialized array of structs.
func (db *Database) GetAllActorFromDocument(docId int64) ([]Actor, error) {
	var (
		actors []Actor
		rows   *sql.Rows
		query  string
		err    error
	)

	// Insert query
	query = `
	SELECT
		actor_id, doc_id, name, avatar,
		meta_role, priority, ext_strength, ext_weakness,
		int_virtue, int_flaw, prime_desire, starting_goal,
		ultimate_goal, denouement, created_on, updated_on
	FROM
		sg.actor
	WHERE
		doc_id = $1
	`

	// Execute the query
	rows, err = db.conn.Query(query, docId)
	if err != nil {
		db.logger.Printf("GetAllActorFromDocument() failed: %s\n", err)
		return nil, err
	}

	// Allocate array of structs
	actors = make([]Actor, 0)

	// Get all rows in the table
	for rows.Next() {
		var a Actor

		// Serialize struct
		err = rows.Scan(
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
			db.logger.Printf("GetAllActorFromDocument() failed: %s\n", err)
			return nil, err
		}

		actors = append(actors, a)
	}

	return actors, nil
}
