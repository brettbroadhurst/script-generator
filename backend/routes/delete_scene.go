// routes/delete_scene.go - Delete a scene route
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package routes

import (
	gin "github.com/gin-gonic/gin"
	http "net/http"
	strconv "strconv"
)

// Route handler for deleting a scene
func (service *APIService) DeleteScene(ctx *gin.Context) {
	var docId string

	docId = ctx.Param("docId")

	// Convert string to integer
	id, err := strconv.Atoi(docId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create the document in the database
	err = service.db.DeleteScene(int64(id))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the data as JSON
	ctx.JSON(http.StatusCreated, gin.H{"data": "Successfully deleted."})
}
