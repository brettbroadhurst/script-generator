// data/get_all_scene.go - Get all scenes in a document
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package data

import (
	sql "database/sql"
)

// Get all entres from the sg.scene table with a document id
// and return it as a serialized array of structs.
func (db *Database) GetAllSceneFromDocument(docId int64) ([]Scene, error) {
	var (
		scenes []Scene
		rows   *sql.Rows
		query  string
		err    error
	)

	// Insert query
	query = `
	SELECT
		scene_id,
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
		doc_id = $1
	ORDER BY
		order_idx ASC
	`

	// Execute the query
	rows, err = db.conn.Query(query, docId)

	// Allocate array of structs
	scenes = make([]Scene, 0)

	// Get all rows in the table
	for rows.Next() {
		var s Scene

		// Serialize struct
		err = rows.Scan(
			&s.Id,
			&s.DocumentId,
			&s.Title,
			&s.Location,
			&s.Time,
			&s.Setup,
			&s.Action,
			&s.Conclusion,
			&s.CreatedOn,
			&s.UpdatedOn,
		)
		if err != nil {
			db.logger.Printf("GetAllSceneFromDocument() failed: %s\n", err)
			return nil, err
		}

		scenes = append(scenes, s)
	}

	return scenes, nil
}
