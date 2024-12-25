package api

import (
	"github.com/gofiber/fiber/v2"
)

func (s *Server) ConfigureTracks() {
	s.fiberApp.Get(
		"/api/tracks/getTracks",
		s.handleGetTracks)
}

func (s *Server) handleGetTracks(c *fiber.Ctx) error {
	mongoDatabase := s.databaseProvider.GetMongoDatabase()

	tracks, err := mongoDatabase.Tracks.List()
	if err != nil {
		return err
	}

	return c.JSON(tracks)
}
