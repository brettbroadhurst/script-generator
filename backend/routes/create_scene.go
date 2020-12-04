// routes/create_document.go - Create a new document route
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package routes

import (
	data "github.com/brettbroadhurst/script-generator/backend/data"
	gin "github.com/gin-gonic/gin"
	http "net/http"
	strconv "strconv"
)

// Request structure for creating a document.
type CreateSceneRequest struct {
	// Title of the document
	Title string `form:"title" json:"title" xml:"title" binding:"required"`

	// Setting of the document
	Setting int `form:"setting" json:"setting" xml:"setting" binding:"required"`

	// Location setting
	Location string `form:"location" json:"location" xml:"location" binding:"required"`

	// Time setting
	Time string `form:"time" json:"time" xml:"time" binding:"required"`

	// Scene setup
	Setup string `form:"setup" json:"setup" xml:"setup" binding:"required"`

	// Scene action
	Action string `form:"action" json:"action" xml:"action" binding:"required"`

	// Scene conclusion
	Conclusion string `form:"conclusion" json:"conclusion" xml:"conclusion" binding:"required"`
}

// Route handler for creating a new document
func (service *APIService) CreateScene(ctx *gin.Context) {
	var (
		doc   *data.Scene
		req   CreateSceneRequest
		docId string
	)

	docId = ctx.Param("docId")

	// Convert string to integer
	id, err := strconv.Atoi(docId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Serialize the request
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create the document in the database
	doc, err = service.db.CreateScene(
		int64(id),
		req.Title,
		int16(req.Setting),
		req.Location,
		req.Time,
		req.Setup,
		req.Action,
		req.Conclusion,
	)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the data as JSON
	ctx.JSON(http.StatusCreated, gin.H{"data": doc})
}
