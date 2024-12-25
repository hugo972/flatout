package api

import (
	"github.com/gofiber/fiber/v2"
)

func (s *Server) ConfigureCars() {
	s.fiberApp.
		Get(
			"/api/cars/getCar/:carId",
			s.handleGetCar).
		Get(
			"/api/cars/getCars",
			s.handleGetCars)
}

func (s *Server) handleGetCar(c *fiber.Ctx) error {
	mongoDatabase := s.databaseProvider.GetMongoDatabase()

	carId := c.Params("carId")

	car, err := mongoDatabase.Cars.Get(carId)
	if err != nil {
		return err
	}

	return c.JSON(car)
}

func (s *Server) handleGetCars(c *fiber.Ctx) error {
	mongoDatabase := s.databaseProvider.GetMongoDatabase()

	cars, err := mongoDatabase.Cars.List()
	if err != nil {
		return err
	}

	return c.JSON(cars)
}
