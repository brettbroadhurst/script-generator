// routes/update_scene_position.go - Update a scene position route
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package routes

import (
	gin "github.com/gin-gonic/gin"
	http "net/http"
	strconv "strconv"
)

// Request structure for updating a scene.
type UpdateScenePositionRequest struct {
	// Desired position of the scene
	DesiredPosition int `form:"desired" json:"current" xml:"current" binding:"required"`
	// Current position of the scene
	CurrentPosition int `form:"current" json:"current" xml:"current" binding:"required"`
}

// Route handler for updating an existing document
func (service *APIService) UpdateScenePosition(ctx *gin.Context) {
	var (
		req     UpdateScenePositionRequest
		sceneId string
	)

	sceneId = ctx.Param("sceneId")

	// Convert string to integer
	id, err := strconv.Atoi(sceneId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if the scene exists in the database
	_, err = service.db.GetOneScene(int64(id))
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
	err = service.db.UpdateScenePosition(
		int64(id),
		int64(req.DesiredPosition),
		int64(req.CurrentPosition),
	)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the data as JSON
	ctx.JSON(http.StatusOK, gin.H{"data": "Successfully updated."})
}
