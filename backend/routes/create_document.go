package routes

import (
	data "github.com/brettbroadhurst/script-generator/backend/data"
	gin "github.com/gin-gonic/gin"
	http "net/http"
)

// Request structure for creating a document.
type CreateDocumentRequest struct {
	// Title of the document
	Title string `form:"title" json:"title" xml:"title" binding:"required"`

	// Medium of the document; film/television
	Medium int16 `form:"medium" json:"medium" xml:"medium" binding:"required"`

	// Format of the document; Sitcom/Movie
	Format int16 `form:"format" json:"format" xml:"format" binding:"required"`

	// Genre of the document
	Genre int16 `form:"genre" json:"genre" xml:"genre" binding:"required"`
}

// Route handler for creating a new document
func (service *APIService) CreateDocument(ctx *gin.Context) {
	var (
		doc *data.Document
		req CreateDocumentRequest
	)

	// Serialize the request
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create the document in the database
	doc, err := service.db.CreateDocument(
		req.Title,
		req.Medium,
		req.Format,
		req.Genre,
	)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"data": doc})
}
