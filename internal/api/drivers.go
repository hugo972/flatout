package api

import (
	"flatout/internal/data"
	"github.com/gofiber/fiber/v2"
	"github.com/samber/lo"
)

func (s *Server) ConfigureDrivers() {
	s.fiberApp.
		Get(
			"/api/drivers/getDriverModel/:driverId",
			s.handleGetDriverModel).
		Get(
			"/api/drivers/getDriverModels",
			s.handleGetDriverModels)
}

func (s *Server) handleGetDriverModel(c *fiber.Ctx) error {
	mongoDatabase := s.databaseProvider.GetMongoDatabase()

	driverId := c.Params("driverId")

	driver, err := mongoDatabase.Drivers.Get(driverId)
	if err != nil {
		return err
	}

	return c.JSON(&data.DriverModel{Driver: *driver})
}

func (s *Server) handleGetDriverModels(c *fiber.Ctx) error {
	mongoDatabase := s.databaseProvider.GetMongoDatabase()

	drivers, err := mongoDatabase.Drivers.List()
	if err != nil {
		return err
	}

	return c.JSON(
		lo.Map(
			*drivers,
			func(driver data.Driver, _ int) data.DriverModel {
				return data.DriverModel{Driver: driver}
			}))
}
