package api

import (
	"github.com/gofiber/fiber/v2"
)

func (m *Server) ConfigureImages() {
	m.fiberApp.Get(
		"/api/image/:imageId",
		m.HandleGetImage)
}

func (m *Server) HandleGetImage(c *fiber.Ctx) error {
	mongoDatabase := m.databaseProvider.GetMongoDatabase()

	imageId := c.Params("imageId")

	image, err := mongoDatabase.Images.Get(imageId)
	if err != nil {
		return err
	}

	c.Set("Content-Type", "image/jpeg")
	return c.Send(image.Data)
}
