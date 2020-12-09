// data/get_all_documents.go - Get all documents
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

package data

import (
	sql "database/sql"
)

// Get one entry in the sg.document table by its Id and return it
// as a struct
func (db *Database) GetOneDocument(id int64) (*Document, error) {
	var (
		doc   *Document
		row   *sql.Row
		query string
		err   error
	)

	// Select query
	query = `
	SELECT
		doc_id,
		title,
		medium,
		format,
		genre,
		created_on,
		updated_on
	FROM
		sg.document
	WHERE
		doc_id = $1
	`

	// Execute the query
	row = db.conn.QueryRow(query, id)

	doc = &Document{}

	// Scan the rows into the structure
	err = row.Scan(
		&doc.Id,
		&doc.Title,
		&doc.Medium,
		&doc.Format,
		&doc.Genre,
		&doc.CreatedOn,
		&doc.UpdatedOn,
	)

	if err != nil {
		db.logger.Printf("GetOneDocument() failed: %s\n", err)
		return nil, err
	}

	return doc, nil
}
