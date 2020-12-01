package routes

import (
	gin "github.com/gin-gonic/gin"
	http "net/http"
)

// Route handler for getting all documents
func (service *APIService) GetAllDocument(ctx *gin.Context) {
	// Get all documents in the database
	docs, err := service.db.GetAllDocument()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": docs})
}
