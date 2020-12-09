// data/get_all_document_test.go - Test fetching all documents
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

package data

import (
	log "log"
	os "os"
	testing "testing"
)

// Test case for GetAllDocument.
// Should successfully return all documents serialized as an
// array of structs.
func TestGetAllDocument(t *testing.T) {
	l := log.New(os.Stdout, "TestGetAllDocument ", 0)
	title := "Test Document"
	medium := int16(1)
	format := int16(1)
	genre := int16(1)

	// Attempt to connect
	db, err := NewDBInstance(l)
	if err != nil {
		t.Fatal(err)
	}
	defer db.Clean()
	db.Clean()

	// Create 3 new documents to test
	for i := 0; i < 3; i++ {
		// Create a new document
		_, err := db.CreateDocument(title, medium, format, genre)
		if err != nil {
			t.Fatal(err)
		}
	}

	// Query document
	docs, err := db.GetAllDocument()
	if err != nil {
		t.Fatal(err)
	}

	if len(docs) != 3 {
		t.Fatalf("Expected number to be: %d. Got: %d\n", 3, len(docs))
	}
}
