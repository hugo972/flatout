package main

import (
	"flatout/internal/api"
	"flatout/internal/database"
	"go.uber.org/fx"
)

func main() {
	fx.
		New(
			fx.Provide(database.NewDatabaseProvider),
			fx.Provide(api.NewServer),
			fx.Invoke(func(_ *api.Server) {})).
		Run()
}
