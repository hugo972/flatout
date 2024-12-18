package api

import (
	"context"
	"flatout/internal/database"
	"github.com/gofiber/fiber/v2"
	"go.uber.org/fx"
	"log"
)

type Server struct {
	databaseProvider *database.DatabaseProvider
	fiberApp         *fiber.App
}

func NewServer(
	databaseProvider *database.DatabaseProvider,
	lc fx.Lifecycle) *Server {
	s := &Server{
		databaseProvider: databaseProvider,
		fiberApp:         fiber.New(),
	}

	lc.Append(
		fx.Hook{
			OnStart: func(ctx context.Context) error {
				s.ConfigureImages()
				s.ConfigureStaticFiles()
				s.ConfigureTracks()

				go func() {
					if err := s.fiberApp.Listen(":8080"); err != nil {
						log.Fatal(err)
					}
				}()

				return nil
			},
			OnStop: func(ctx context.Context) error {
				return s.fiberApp.Shutdown()
			},
		})

	return s
}
