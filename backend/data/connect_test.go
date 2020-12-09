// data/connect_test.go - Test connecting to the database
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

package data

import (
	log "log"
	os "os"
	testing "testing"
)

// Test case for create a new database connection instance.
// Should successfully connect to Postgres and return a Database instance.
func TestNewDBInstance(t *testing.T) {
	l := log.New(os.Stdout, "TestNewDBInstance ", 0)

	// Attempt to connect
	_, err := NewDBInstance(l)
	if err != nil {
		t.Fatal(err)
	}
}
