package api

import (
	"github.com/gofiber/fiber/v2"
)

func (s *Server) ConfigureAdmin() {
	s.fiberApp.Get(
		"/api/admin",
		s.authMiddleware,
		s.handleAdmin)
}

func (s *Server) handleAdmin(c *fiber.Ctx) error {
	return c.SendString("OK")
}
