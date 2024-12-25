package api

import (
	"github.com/gofiber/fiber/v2"
)

func (s *Server) ConfigureDrivers() {
	s.fiberApp.
		Get(
			"/api/drivers/getDriver/:driverId",
			s.handleGetDriver).
		Get(
			"/api/drivers/getDrivers",
			s.handleGetDrivers)
}

func (s *Server) handleGetDriver(c *fiber.Ctx) error {
	mongoDatabase := s.databaseProvider.GetMongoDatabase()

	driverId := c.Params("driverId")

	driver, err := mongoDatabase.Drivers.Get(driverId)
	if err != nil {
		return err
	}

	return c.JSON(driver)
}

func (s *Server) handleGetDrivers(c *fiber.Ctx) error {
	mongoDatabase := s.databaseProvider.GetMongoDatabase()

	drivers, err := mongoDatabase.Drivers.List()
	if err != nil {
		return err
	}

	return c.JSON(drivers)
}
