package api

import (
	"github.com/gofiber/fiber/v2"
)

func (s *Server) ConfigureImages() {
	s.fiberApp.Get(
		"/api/images/:imageId",
		s.handleGetImage)
}

func (s *Server) handleGetImage(c *fiber.Ctx) error {
	mongoDatabase := s.databaseProvider.GetMongoDatabase()

	imageId := c.Params("imageId")

	image, err := mongoDatabase.Images.Get(imageId)
	if err != nil {
		return err
	}

	c.Set("Content-Type", "image/jpeg")
	return c.Send(image.Data)
}
