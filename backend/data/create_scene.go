// data/create_scene.go - Create Scene
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package data

import (
	sql "database/sql"
)

// Create a new entry in the sg.scene table, get the entry and return it
// as a serialized struct.
func (db *Database) CreateScene(
	title string,
	location string,
	time string,
	setup string,
	action string,
	conclusion string,
) (*Scene, error) {
	var (
		scene *Scene
		row   *sql.Row
		query string
		err   error
	)

	// Insert query
	query = `
	INSERT INTO sg.scene (
		title,
		location,
		time,
		setup,
		action,
		conclusion
	) VALUES (
		$1,
		$2,
		$3,
		$4,
		$5,
		$6
	) RETURNING
		scene_id,
		next_id,
		doc_id,
		title,
		location,
		time,
		setup,
		action,
		conclusion,
		created_on,
		updated_on
	`

	// Execute the query
	row = db.conn.QueryRow(
		query,
		title,
		location,
		time,
		setup,
		action,
		conclusion,
	)

	scene = &Scene{}

	// Serialize struct
	err = row.Scan(
		&scene.Id,
		&scene.NextId,
		&scene.DocumentId,
		&scene.Title,
		&scene.Location,
		&scene.Time,
		&scene.Setup,
		&scene.Action,
		&scene.Conclusion,
		&scene.CreatedOn,
		&scene.UpdatedOn,
	)

	if err != nil {
		db.logger.Printf("CreateScene() failed: %s\n", err)
		return nil, err
	}

	return scene, nil
}
