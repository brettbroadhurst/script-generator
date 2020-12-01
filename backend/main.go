package main

import (
	data "github.com/brettbroadhurst/script-generator/backend/data"
	routes "github.com/brettbroadhurst/script-generator/backend/routes"
	cors "github.com/gin-contrib/cors"
	gin "github.com/gin-gonic/gin"
	log "log"
	os "os"
)

func main() {
	// Create a new router
	r := gin.Default()

	// Enable logging
	r.Use(gin.Logger())

	// Enable panic recovery to 500
	r.Use(gin.Recovery())

	// Enable CORS
	r.Use(cors.Default())

	// Create a new logger
	l := log.New(os.Stdout, "API ", 0)

	// Connect to the database
	db, err := data.NewDBInstance(l)
	if err != nil {
		log.Fatal(err)
	}

	// Create a new API service
	api := routes.NewAPIService(db, l)

	// API Routines
	r.GET("/documents", api.GetAllDocument)
	r.POST("/documents", api.CreateDocument)
	r.GET("/documents/:docId", api.GetOneDocument)
	//r.GET("/documents/:docId/scenes", api.GetAllScene)
	r.POST("/documents/:docId/scenes", api.CreateScene)
	r.Run()
}
