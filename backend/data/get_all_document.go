// data/get_all_documents.go - Get all documents
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

package data

import (
	sql "database/sql"
)

// Get all entries in the sg.document table and return them
// in an array of structs
func (db *Database) GetAllDocument() ([]Document, error) {
	var (
		docs  []Document
		rows  *sql.Rows
		query string
		err   error
	)

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
	`

	// Execute the query
	rows, err = db.conn.Query(query)
	if err != nil {
		db.logger.Printf("GetAllDocument() failed: %s\n", err)
		return nil, err
	}

	// Allocate a new document array
	docs = make([]Document, 0)

	// Scan each row into the document array
	for rows.Next() {
		var d Document

		// Scan the rows into the structure
		err = rows.Scan(
			&d.Id,
			&d.Title,
			&d.Medium,
			&d.Format,
			&d.Genre,
			&d.CreatedOn,
			&d.UpdatedOn,
		)

		if err != nil {
			db.logger.Printf("GetAllDocument() failed: %s\n", err)
			return nil, err
		}

		docs = append(docs, d)
	}

	return docs, nil
}
