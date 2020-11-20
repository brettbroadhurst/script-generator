package main

import (
	data "github.com/brettbroadhurst/script-generator/backend/data"
	gin "github.com/gin-gonic/gin"
	log "log"
	http "net/http"
	os "os"
	strconv "strconv"
)

// API Service
type APIService struct {
	db *data.Database
}

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
	doc, err := service.db.CreateDocument(req.Title, req.Medium, req.Format, req.Genre)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"data": doc})
}

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

// Route handler for getting a document by its id
func (service *APIService) GetOneDocument(ctx *gin.Context) {
	// Get docID parameter
	docId := ctx.Param("docId")

	// Convert string to integer
	id, err := strconv.Atoi(docId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get a document by an id
	doc, err := service.db.GetOneDocument(int64(id))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"data": doc})
}

func main() {
	// Create a new router
	r := gin.Default()

	// Enable logging
	r.Use(gin.Logger())

	// Enable panic recovery to 500
	r.Use(gin.Recovery())

	// Create a new logger
	l := log.New(os.Stdout, "API ", 0)

	// Connect to the database
	db, err := data.NewDBInstance(l)
	if err != nil {
		log.Fatal(err)
	}

	// Create a new API service
	api := APIService{db}

	// API Routines
	r.GET("/documents", api.GetAllDocument)
	r.GET("/documents/:docId", api.GetOneDocument)
	r.POST("/documents", api.CreateDocument)
	r.Run()
}
