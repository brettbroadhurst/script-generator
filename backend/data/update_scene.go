// data/update_scene.go - Update Scene
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package data

// Update an entry in the sg.scene table
func (db *Database) UpdateScene(
	id int64,
	title string,
	setting int16,
	location string,
	time string,
	setup string,
	action string,
	conclusion string,
) error {
	var (
		query string
		err   error
	)

	// Update query
	query = `
	UPDATE
		sg.scene
	SET title=$2,
		setting=$3,
		location=$4,
		time=$5,
		setup=$6,
		action=$7,
		conclusion=$8
	WHERE
		scene_id = $1
	`

	// Execute query
	_, err = db.conn.Exec(
		query,
		id,
		title,
		setting,
		location,
		time,
		setup,
		action,
		conclusion,
	)

	if err != nil {
		db.logger.Printf("UpdateScene(): %s\n", err)
		return err
	}

	return nil
}
