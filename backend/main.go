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
	// Documents
	r.GET("/documents", api.GetAllDocument)
	r.POST("/documents", api.CreateDocument)
	r.GET("/documents/:docId", api.GetOneDocument)

	// Scenes
	r.GET("/documents/:docId/scenes", api.GetAllScene)
	r.POST("/documents/:docId/scenes", api.CreateScene)
	r.PUT("/scenes/:sceneId", api.UpdateScene)
	r.PUT("/scenes/:sceneId/position", api.UpdateScenePosition)
	r.DELETE("/scenes/:sceneId", api.DeleteScene)

	// Actors
	r.GET("/documents/:docId/actors", api.GetAllActor)
	r.POST("/documents/:docId/actors", api.CreateActor)

	r.Run()
}
