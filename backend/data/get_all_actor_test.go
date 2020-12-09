// data/get_all_actor_test.go - Test fetching all actors
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

package data

import (
	log "log"
	os "os"
	testing "testing"
)

// Test case for GetAllActorFromDocument.
// Should successfully return all actors under a document
// serialized as an array of structs.
func TestGetAllActorFromDocument(t *testing.T) {
	l := log.New(os.Stdout, "TestGetAllActorFromDocument ", 0)
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

	// Create 3 new documents to test
	for i := 0; i < 3; i++ {
		// Seed data
		a := Actor{
			DocumentId:       doc.Id,
			Name:             "name",
			Avatar:           "avatar",
			Role:             1,
			Priority:         1,
			ExternalStrength: "strength",
			ExternalWeakness: "weakness",
			InternalVirtue:   "virtue",
			InternalFlaw:     "flaw",
			PrimaryDesire:    "desire",
			StartingGoal:     "starting goal",
			UltimateGoal:     "ultimate goal",
			Denoument:        "denoument",
		}

		// Create a new actor
		_, err := db.CreateActor(doc.Id, a)
		if err != nil {
			t.Fatal(err)
		}
	}

	// Query document
	actors, err := db.GetAllActorFromDocument(doc.Id)
	if err != nil {
		t.Fatal(err)
	}

	if len(actors) != 3 {
		t.Fatalf("Expected number to be: %d. Got: %d\n", 3, len(actors))
	}
}
