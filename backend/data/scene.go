// data/scene.go - Scene struct definition
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package data

type Scene struct {
	Id         int64  `form:"id" json:"id" xml:"id" binding:"required"`
	NextId     int64  `form:"nextId" json:"nextId" xml:"nextId"`
	DocumentId int64  `form:"docId" json:"docId" xml:"docId" binding:"required"`
	Title      string `form:"title" json:"title" xml:"title" binding:"required"`
	Location   string `form:"location" json:"location" xml:"location" binding:"required"`
	Time       string `form:"time" json:"time" xml:"time" binding:"required"`
	Setup      string `form:"setup" json:"setup" xml:"setup" binding:"required"`
	Action     string `form:"action" json:"action" xml:"action" binding:"required"`
	Conclusion string `form:"conclusion" json:"conclusion" xml:"conclusion" binding:"required"`
	CreatedOn  string `json:"createdOn" binding:"required"`
	UpdatedOn  string `json:"updatedOn" binding:"required"`
}
