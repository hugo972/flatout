package main

import (
	"github.com/gofiber/fiber/v2"
	"log"
)

type Track struct {
	Name string `json:"name"`
}

var tracks = []*Track{
	{Name: "Arad Racing Track"},
	{Name: "Motorcity"},
	{Name: "Pezael"},
}

func main() {
	app := fiber.New()

	app.Static("/", "./console-app")

	app.Get(
		"/api/getTracks",
		func(c *fiber.Ctx) error {
			return c.JSON(tracks)
		})

	log.Fatal(app.Listen(":3000"))
}
