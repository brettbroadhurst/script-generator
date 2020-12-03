// data/update_scene_position.go - Update Scene Position
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package data

// Update the position field of an entry in the sg.scene table
func (db *Database) UpdateScenePosition(
	id int64,
	desired int64,
	current int64,
) error {
	var (
		query string
		up    bool
		err   error
	)

	if desired == current {
		return nil
	}

	// Determine the movement
	if desired > current {
		up = true
	} else {
		up = false
	}

	// Move: Update the items between the current position and the desired position, decreasing/increasing each item by 1 to make space for the new item
	if up {
		query = `
		UPDATE sg.scene 
		SET order_idx = (order_idx + 1)
		WHERE order_idx >= $2
		AND order_idx < $3
		AND id = $1 
		`
	} else {
		query = `
		UPDATE sg.scene
		SET order_idx = (order_idx - 1)
		WHERE order_idx > $3 
		AND order_idx <= $2 
		AND id = $1 
		`
	}

	// Execute query
	_, err = db.conn.Exec(
		query,
		id,
		desired,
		current,
	)

	if err != nil {
		db.logger.Printf("UpdateScenePosition(): %s\n", err)
		return err
	}

	return nil
}
