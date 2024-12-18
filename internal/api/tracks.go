package api

import (
	"github.com/gofiber/fiber/v2"
)

func (m *Server) ConfigureTracks() {
	m.fiberApp.Get(
		"/api/getTracks",
		m.HandleGetTracks)
}

func (m *Server) HandleGetTracks(c *fiber.Ctx) error {
	mongoDatabase := m.databaseProvider.GetMongoDatabase()

	tracks, err := mongoDatabase.Tracks.List()
	if err != nil {
		return err
	}

	return c.JSON(tracks)
}
