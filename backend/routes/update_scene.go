// routes/update_scene.go - Update a scene route
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package routes

import (
	gin "github.com/gin-gonic/gin"
	http "net/http"
	strconv "strconv"
)

// Request structure for updating a scene.
type UpdateSceneRequest struct {
	// Title of the scene
	Title string `form:"title" json:"title" xml:"title" binding:"required"`

	// Int/Ext Setting
	Setting int `form:"setting" json:"setting" xml:"setting" binding:"required"`

	// Location setting
	Location string `form:"location" json:"location" xml:"location" binding:"required"`

	// Time setting
	Time string `form:"time" json:"time" xml:"time" binding:"required"`

	// Scene setup
	Setup string `form:"setup" json:"setup" xml:"setup" binding:"required"`

	// Scene action
	Action string `form:"action" json:"action" xml:"action" binding:"required"`

	// Scene conclusion
	Conclusion string `form:"conclusion" json:"conclusion" xml:"conclusion" binding:"required"`
}

// Route handler for updating an existing document
func (service *APIService) UpdateScene(ctx *gin.Context) {
	var (
		req     UpdateSceneRequest
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
	err = service.db.UpdateScene(
		int64(id),
		req.Title,
		int16(req.Setting),
		req.Location,
		req.Time,
		req.Setup,
		req.Action,
		req.Conclusion,
	)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the data as JSON
	ctx.JSON(http.StatusOK, gin.H{"data": "Successfully updated."})
}
