// data/delete_document.go - Delete document
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package data

// Delete an entry in the sg.document table
func (db *Database) DeleteDocument(id int64) error {
	var (
		query string
		err   error
	)

	// Insert query
	query = `
	DELETE FROM
		sg.document
	WHERE
		id = $1;

	DELETE FROM 
		sg.scene
	WHERE
		doc_id = $1
	`

	// Execute the query
	_, err = db.conn.Exec(query, id)
	if err != nil {
		db.logger.Printf("DeleteDocument() failed: %s\n", err)
		return err
	}

	return nil
}
