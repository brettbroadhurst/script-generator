// data/create_document.go - Create a new document
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

package data

import (
	sql "database/sql"
)

// Create a new entry in the sg.document table and return a
// struct containing its data.
func (db *Database) CreateDocument(title string, medium, format, genre int16) (*Document, error) {
	var (
		doc   *Document
		row   *sql.Row
		query string
		err   error
	)

	// Insert query
	query = `
	INSERT INTO sg.document(
		title,
		medium,
		format,
		genre
	) VALUES (
		$1, $2, $3, $4
	) RETURNING
		doc_id,
		title,
		medium,
		format,
		genre,
		created_on,
		updated_on
	`

	// Execute the query
	row = db.conn.QueryRow(query, title, medium, format, genre)

	// Allocate a new document struct
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
		db.logger.Printf("CreateDocument() failed: %s\n", err)
		return nil, err
	}

	return doc, nil
}
