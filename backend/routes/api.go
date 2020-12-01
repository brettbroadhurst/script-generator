// routes/api.go - API Service
// Written by Brett Broadhurst <brettbroadhurst@gmail.com>

package routes

import (
	data "github.com/brettbroadhurst/script-generator/backend/data"
	log "log"
)

// API Service
type APIService struct {
	db     *data.Database
	logger *log.Logger
}

// Create a new API service instance
func NewAPIService(db *data.Database, l *log.Logger) *APIService {
	return &APIService{db, l}
}
