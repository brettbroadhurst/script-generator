// routes/create_actor.go - Create a new actor route
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package routes

import (
	data "github.com/brettbroadhurst/script-generator/backend/data"
	gin "github.com/gin-gonic/gin"
	http "net/http"
	strconv "strconv"
)

// Request structure for creating a actor.
type CreateActorRequest struct {
	Name             string `json:"name" binding:"required"`
	Avatar           string `json:"avatar" binding:"required"`
	Role             int    `json:"role" binding:"required"`
	Priority         int    `json:"priority" binding:"required"`
	ExternalStrength string `json:"strength" binding:"required"`
	ExternalWeakness string `json:"weakness" binding:"required"`
	InternalVirtue   string `json:"virtue" binding:"required"`
	InternalFlaw     string `json:"flaw" binding:"required"`
	PrimaryDesire    string `json:"desire" binding:"required"`
	StartingGoal     string `json:"startingGoal" binding:"required"`
	UltimateGoal     string `json:"ultimateGoal" binding:"required"`
	Denoument        string `json:"denoument" binding:"required"`
}

// Route handler for creating a new actor
func (service *APIService) CreateActor(ctx *gin.Context) {
	var (
		actor *data.Actor
		obj   data.Actor
		req   CreateActorRequest
		docId string
	)

	docId = ctx.Param("docId")

	// Convert string to integer
	id, err := strconv.Atoi(docId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Serialize the request
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	obj = data.Actor{
		Name:             req.Name,
		Avatar:           req.Avatar,
		Role:             int16(req.Role),
		Priority:         int16(req.Priority),
		ExternalStrength: req.ExternalStrength,
		ExternalWeakness: req.ExternalWeakness,
		InternalVirtue:   req.InternalVirtue,
		InternalFlaw:     req.InternalFlaw,
		PrimaryDesire:    req.PrimaryDesire,
		StartingGoal:     req.StartingGoal,
		UltimateGoal:     req.UltimateGoal,
		Denoument:        req.Denoument,
	}

	// Create the actor in the database
	actor, err = service.db.CreateActor(
		int64(id),
		obj,
	)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Return the data as JSON
	ctx.JSON(http.StatusCreated, gin.H{"data": actor})
}
