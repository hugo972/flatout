package api

import (
	"flatout/internal/data"
	"github.com/gofiber/fiber/v2"
	"github.com/samber/lo"
)

func (s *Server) ConfigureCars() {
	s.fiberApp.
		Get(
			"/api/cars/getCarModel/:carId",
			s.handleGetCarModel).
		Get(
			"/api/cars/getCarModels",
			s.handleGetCarModels)
}

func (s *Server) handleGetCarModel(c *fiber.Ctx) error {
	mongoDatabase := s.databaseProvider.GetMongoDatabase()

	carId := c.Params("carId")

	car, err := mongoDatabase.Cars.Get(carId)
	if err != nil {
		return err
	}

	return c.JSON(&data.CarModel{Car: *car})
}

func (s *Server) handleGetCarModels(c *fiber.Ctx) error {
	mongoDatabase := s.databaseProvider.GetMongoDatabase()

	cars, err := mongoDatabase.Cars.List()
	if err != nil {
		return err
	}

	return c.JSON(
		lo.Map(
			*cars,
			func(car data.Car, _ int) data.CarModel {
				return data.CarModel{Car: car}
			}))
}
