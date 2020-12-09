// data/create_document_test.go - Test creating a new document
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

package data

import (
	log "log"
	os "os"
	testing "testing"
)

// Test case for CreateDocument.
// Should successfully create a new entry and return it serialized as a struct.
func TestCreateDocument(t *testing.T) {
	l := log.New(os.Stdout, "TestCreateDocument ", 0)
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
	doc, err := db.CreateDocument(title, medium, format, genre)
	if err != nil {
		t.Fatal(err)
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
