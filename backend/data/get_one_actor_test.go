// data/get_one_actor_test.go - Test fetching a actor
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

package data

import (
	log "log"
	os "os"
	testing "testing"
)

// Test case for GetOneActor.
// Should successfully fetch an entry and return it serialized as a struct.
func TestGetOneActor(t *testing.T) {
	l := log.New(os.Stdout, "TestCreateActor ", 0)
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
	actor, err := db.CreateActor(doc.Id, a)
	if err != nil {
		t.Fatal(err)
	}

	// Fetch the newly created actor
	actor2, err := db.GetOneActor(actor.Id)
	if err != nil {
		t.Fatal(err)
	}

	if actor2.Id != actor.Id {
		t.Fatalf("Expected id to be: %d. Got: %d\n", actor.Id, actor2.Id)
	}
}
