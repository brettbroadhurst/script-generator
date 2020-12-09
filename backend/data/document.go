// data/document.go - Document
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

package data

type Document struct {
	// Big Serial ID
	Id int64 `json:"id" binding:"required"`

	// Title of the document
	Title string `json:"title" binding:"required"`

	// Medium of the document; film/television
	Medium int16 `json:"medium" binding:"required"`

	// Format of the document; Sitcom/Movie
	Format int16 `json:"format" binding:"required"`

	// Genre of the document
	Genre int16 `json:"genre" binding:"required"`

	// Timestamp for creation
	CreatedOn string `json:"createdOn" binding:"required"`

	// Timestamp for last update
	UpdatedOn string `json:"updatedOn" binding:"required"`
}
