// routes/get_all_actor.go - Get all actors from a document route
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package routes

import (
	data "github.com/brettbroadhurst/script-generator/backend/data"
	gin "github.com/gin-gonic/gin"
	http "net/http"
	strconv "strconv"
)

// Route handler for getting all actors from a document
func (service *APIService) GetAllActor(ctx *gin.Context) {
	var (
		actors []data.Actor
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
	actors, err = service.db.GetAllActorFromDocument(int64(id))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the data as JSON
	ctx.JSON(http.StatusOK, gin.H{"data": actors})
}
