// data/document.go - Document
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>
//

package data

type Document struct {
	// Big Serial ID
	Id int64 `form:"id" json:"id" xml:"id" binding:"required"`

	// Title of the document
	Title string `form:"title" json:"title" xml:"title" binding:"required"`

	// Medium of the document; film/television
	Medium int16 `form:"medium" json:"medium" xml:"medium" binding:"required"`

	// Format of the document; Sitcom/Movie
	Format int16 `form:"format" json:"format" xml:"format" binding:"required"`

	// Genre of the document
	Genre int16 `form:"genre" json:"genre" xml:"genre" binding:"required"`

	// Timestamp for creation
	CreatedOn string `form:"createdOn" json:"createdOn" xml:"createdOn" binding:"required"`

	// Timestamp for last update
	UpdatedOn string `form:"updatedOn" json:"updatedOn" xml:"updatedOn" binding:"required"`
}
