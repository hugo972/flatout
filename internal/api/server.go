package api

import (
	"context"
	"flatout/internal/database"
	"log"

	"github.com/gofiber/fiber/v2"
	jwtware "github.com/gofiber/jwt/v3"
	"go.uber.org/fx"
)

type Server struct {
	authRequiredMiddleware fiber.Handler
	authSigningKey         []byte
	databaseProvider       database.IDatabaseProvider
	fiberApp               *fiber.App
}

func NewServer(
	databaseProvider database.IDatabaseProvider,
	lc fx.Lifecycle) *Server {

	authSigningKey := []byte("flatout")
	jwtMiddleware :=
		jwtware.New(
			jwtware.Config{
				ErrorHandler: func(ctx *fiber.Ctx, err error) error {
					ctx.Locals("jwtMiddleware:error", err)
					return ctx.Next()
				},
				SigningKey:  authSigningKey,
				TokenLookup: "cookie:Authorization",
			})

	fiberApp :=
		fiber.New(
			fiber.Config{
				ErrorHandler: func(ctx *fiber.Ctx, err error) error {
					log.Printf("[%s %s] %s", ctx.Method(), ctx.Path(), err.Error())
					return fiber.DefaultErrorHandler(ctx, err)
				},
			})

	s :=
		&Server{
			authRequiredMiddleware: func(ctx *fiber.Ctx) error {
				err := ctx.Locals("jwtMiddleware:error").(error)
				if err != nil {
					return ctx.SendStatus(fiber.StatusUnauthorized)
				}

				return ctx.Next()
			},
			authSigningKey:   authSigningKey,
			databaseProvider: databaseProvider,
			fiberApp:         fiberApp,
		}

	lc.Append(
		fx.Hook{
			OnStart: func(ctx context.Context) error {
				s.fiberApp.Use(jwtMiddleware)

				s.ConfigureAdmin()
				s.ConfigureAuth()
				s.ConfigureCars()
				s.ConfigureDrivers()
				s.ConfigureEvents()
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
