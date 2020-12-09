// data/actor.go - Actor struct definition
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package data

// Character data
type Actor struct {
	// Actor Id
	Id int64 `json:"id" binding:"required"`

	// Document Id
	DocumentId int64 `json:"documentId" binding:"required"`

	// Name of the actor
	Name string `json:"name" binding:"required"`

	// URL of the actor avatar
	Avatar string `json:"avatar" binding:"required"`

	// Role in the story
	Role int16 `json:"role" binding:"required"`

	// Priority in the story
	Priority int16 `json:"priority" binding:"required"`

	// External strength
	ExternalStrength string `json:"strength" binding:"required"`

	// External weakness
	ExternalWeakness string `json:"weakness" binding:"required"`

	// Internal virtue
	InternalVirtue string `json:"virtue" binding:"required"`

	// Internal flaw
	InternalFlaw string `json:"flaw" binding:"required"`

	// Primary desire of the character
	PrimaryDesire string `json:"desire" binding:"required"`

	// Goal of the character at the beginning of the story
	StartingGoal string `json:"startingGoal" binding:"required"`

	// Goal of the character at the end of the story
	UltimateGoal string `json:"ultimateGoal" binding:"required"`

	// Final resolve of the character
	Denoument string `json:"denoument" binding:"required"`

	// Timestamp for creation
	CreatedOn string `json:"createdOn" binding:"required"`

	// Timestamp for last update
	UpdatedOn string `json:"updatedOn" binding:"required"`
}
