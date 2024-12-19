package api

import (
	"github.com/gofiber/fiber/v2"
)

func (m *Server) ConfigureCars() {
	m.fiberApp.
		Get(
			"/api/cars/getCar/:carId",
			m.handleGetCar).
		Get(
			"/api/cars/getCars",
			m.handleGetCars)
}

func (m *Server) handleGetCar(c *fiber.Ctx) error {
	mongoDatabase := m.databaseProvider.GetMongoDatabase()

	carId := c.Params("carId")

	car, err := mongoDatabase.Cars.Get(carId)
	if err != nil {
		return err
	}

	return c.JSON(car)
}

func (m *Server) handleGetCars(c *fiber.Ctx) error {
	mongoDatabase := m.databaseProvider.GetMongoDatabase()

	cars, err := mongoDatabase.Cars.List()
	if err != nil {
		return err
	}

	return c.JSON(cars)
}
