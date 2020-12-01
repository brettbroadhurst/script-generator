// data/get_one_scene.go - Get One Scene
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package data

import (
	sql "database/sql"
)

// Get an entry from the sg.scene table and return it
// as a serialized struct.
func (db *Database) GetOneScene(id int64) (*Scene, error) {
	var (
		scene *Scene
		row   *sql.Row
		query string
		err   error
	)

	// Insert query
	query = `
	SELECT
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
	FROM
		sg.scene
	WHERE
		id = $1
	`

	// Execute the query
	row = db.conn.QueryRow(query, id)

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
		db.logger.Printf("GetOneScene() failed: %s\n", err)
		return nil, err
	}

	return scene, nil
}
