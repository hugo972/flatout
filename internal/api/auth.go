package api

import (
	"flatout/internal/data"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v4"
	"time"
)

func (s *Server) ConfigureAuth() {
	s.fiberApp.Get(
		"/api/auth/getUserModel",
		s.authMiddleware,
		s.handleGetUserModel)
	s.fiberApp.Post(
		"/api/auth/login",
		s.handleLogin)
}

func (s *Server) handleGetUserModel(c *fiber.Ctx) error {
	user := c.Locals("user")
	if user == nil {
		return c.JSON(&data.GetUserModelResponse{})
	}

	claims := user.(*jwt.Token).Claims.(jwt.MapClaims)

	return c.JSON(
		&data.GetUserModelResponse{
			UserModel: &data.UserModel{
				Id:   claims["id"].(string),
				Name: claims["name"].(string),
			},
		})
}

func (s *Server) handleLogin(c *fiber.Ctx) error {
	var request data.LoginRequest
	if err := c.BodyParser(&request); err != nil {
		return err
	}

	mongoDatabase := s.databaseProvider.GetMongoDatabase()

	user, err := mongoDatabase.Users.Get(request.Username)
	if err != nil {
		return err
	}

	if user.Password != request.Password {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	token :=
		jwt.NewWithClaims(
			jwt.SigningMethodHS256,
			jwt.MapClaims{
				"id":   user.Id,
				"name": user.Name,
				"exp":  time.Now().Add(time.Hour * 24).Unix(),
			})

	encryptedToken, err := token.SignedString(s.authSigningKey)
	if err != nil {
		return c.SendStatus(fiber.StatusInternalServerError)
	}

	c.Cookie(
		&fiber.Cookie{
			Name:  "Authorization",
			Value: encryptedToken,
		})
	return c.SendStatus(fiber.StatusOK)
}
