// routes/get_one_document.go - Get one document route
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package routes

import (
	sql "database/sql"
	data "github.com/brettbroadhurst/script-generator/backend/data"
	gin "github.com/gin-gonic/gin"
	http "net/http"
	strconv "strconv"
)

// Route handler for getting a document by its id
func (service *APIService) GetOneDocument(ctx *gin.Context) {
	var (
		doc   *data.Document
		docId string
		id    int
		err   error
	)

	// Get docID parameter
	docId = ctx.Param("docId")

	// Convert string to integer
	id, err = strconv.Atoi(docId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get a document by an id
	doc, err = service.db.GetOneDocument(int64(id))
	if err != nil {
		switch err {
		case sql.ErrNoRows:
			ctx.JSON(http.StatusNotFound, gin.H{"error": "Not found"})
			return
		default:
			ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
	}

	// Return the data as JSON
	ctx.JSON(http.StatusOK, gin.H{"data": doc})
}
