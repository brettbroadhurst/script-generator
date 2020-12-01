// data/delete_scene.go - Create Scene
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package data

// Delete an entry in the sg.scene table
func (db *Database) DeleteScene(id int64) error {
	var (
		query string
		err   error
	)

	// Insert query
	query = `
	DELETE FROM 
		sg.scene
	WHERE
		id = $1
	`

	// Execute the query
	_, err = db.conn.Exec(query, id)
	if err != nil {
		db.logger.Printf("DeleteScene() failed: %s\n", err)
		return err
	}

	return nil
}
