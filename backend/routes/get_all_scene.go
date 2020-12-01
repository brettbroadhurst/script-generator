// routes/get_all_document.go - Get all scenes from a document route
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package routes

import (
	data "github.com/brettbroadhurst/script-generator/backend/data"
	gin "github.com/gin-gonic/gin"
	http "net/http"
	strconv "strconv"
)

// Route handler for getting all scenes from a document
func (service *APIService) GetAllScene(ctx *gin.Context) {
	var (
		scenes []data.Scene
		docId  string
		id     int
		err    error
	)

	docId = ctx.Param("docId")

	// Convert string to integer
	id, err = strconv.Atoi(docId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get all documents in the database
	scenes, err = service.db.GetAllSceneFromDocument(int64(id))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the data as JSON
	ctx.JSON(http.StatusOK, gin.H{"data": scenes})
}
