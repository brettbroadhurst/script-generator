// data/get_one_document_test.go - Test fetching a document by id
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

package data

import (
	log "log"
	os "os"
	testing "testing"
)

// Test case for GetOneDocument.
// Should successfully return a document serialized as a struct.
func TestGetOneDocument(t *testing.T) {
	l := log.New(os.Stdout, "TestGetOneDocument ", 0)
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

	// Create a new document
	newdoc, err := db.CreateDocument(title, medium, format, genre)
	if err != nil {
		t.Fatal(err)
	}

	// Query document
	doc, err := db.GetOneDocument(newdoc.Id)
	if err != nil {
		t.Fatal(err)
	}

	if doc.Id != newdoc.Id {
		t.Fatalf("Expected id to be: %d. Got: %d\n", newdoc.Id, doc.Id)
	}

	// Check if the title was inserted properly
	if doc.Title != title {
		t.Fatalf("Expected title to be: %s. Got %s.\n", title, doc.Title)
	}

	// Check if the medium was inserted properly
	if doc.Medium != medium {
		t.Fatalf("Expected medium to be: %d. Got %d.\n", medium, doc.Medium)
	}

	// Check if the format was inserted properly
	if doc.Format != format {
		t.Fatalf("Expected format to be: %d. Got %d.\n", format, doc.Format)
	}

	// Check if the genre was inserted properly
	if doc.Genre != genre {
		t.Fatalf("Expected genre to be: %d. Got %d.\n", genre, doc.Genre)
	}
}
