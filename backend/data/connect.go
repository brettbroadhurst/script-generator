// data/connect.go - Connect to the database
// Written by Brett Broadhurst <brett@crevolute.com>
//

package data

import (
	sql "database/sql"
	fmt "fmt"
	_ "github.com/lib/pq"
	log "log"
	os "os"
)

var (
	HOST     = os.Getenv("POSTGRES_HOST")
	PORT     = os.Getenv("POSTGRES_PORT")
	USERNAME = os.Getenv("POSTGRES_USER")
	PASSWORD = os.Getenv("POSTGRES_PASS")
	DATABASE = os.Getenv("POSTGRES_DB")
)

// Database Structure.
// Dependancy inject these fields.
type Database struct {
	conn   *sql.DB
	logger *log.Logger
}

// Create a new Database instance and inject a logger.
func NewDBInstance(l *log.Logger) (*Database, error) {
	var (
		str  string
		conn *sql.DB
		err  error
	)

	str = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		HOST,
		PORT,
		USERNAME,
		PASSWORD,
		DATABASE,
	)

	conn, err = sql.Open("postgres", str)
	if err != nil {
		return nil, err
	}

	return &Database{conn: conn, logger: l}, nil
}

// Clean all data in the database.
// Will only be used for testing.
func (db *Database) Clean() {
	_, _ = db.conn.Exec(`
		DELETE FROM sg.document;
	`)
}
