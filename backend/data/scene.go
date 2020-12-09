// data/scene.go - Scene struct definition
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package data

type Scene struct {
	// Scene Id
	Id int64 `json:"id" binding:"required"`

	// Document Id
	DocumentId int64 `json:"docId" binding:"required"`

	// Title of the scene
	Title string `json:"title" binding:"required"`

	// Scene setting (Interior/Exterior)
	Setting int16 `json:"setting" binding:"required"`

	// Location of the scene
	Location string `json:"location" binding:"required"`

	// Time of day in the scene
	Time string `json:"time" binding:"required"`

	// Scene setup
	Setup string `json:"setup" binding:"required"`

	// Scene action
	Action string `json:"action" binding:"required"`

	// Scene conclusion
	Conclusion string `json:"conclusion" binding:"required"`

	// Timestamp for creation
	CreatedOn string `json:"createdOn" binding:"required"`

	// Timestamp for last update
	UpdatedOn string `json:"updatedOn" binding:"required"`
}
