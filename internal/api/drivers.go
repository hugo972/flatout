package api

import (
	"github.com/gofiber/fiber/v2"
)

func (m *Server) ConfigureDrivers() {
	m.fiberApp.
		Get(
			"/api/drivers/getDriver/:driverId",
			m.handleGetDriver).
		Get(
			"/api/drivers/getDrivers",
			m.handleGetDrivers)
}

func (m *Server) handleGetDriver(c *fiber.Ctx) error {
	mongoDatabase := m.databaseProvider.GetMongoDatabase()

	driverId := c.Params("driverId")

	driver, err := mongoDatabase.Drivers.Get(driverId)
	if err != nil {
		return err
	}

	return c.JSON(driver)
}

func (m *Server) handleGetDrivers(c *fiber.Ctx) error {
	mongoDatabase := m.databaseProvider.GetMongoDatabase()

	drivers, err := mongoDatabase.Drivers.List()
	if err != nil {
		return err
	}

	return c.JSON(drivers)
}
