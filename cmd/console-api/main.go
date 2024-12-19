package main

import (
	"flatout/internal/api"
	"flatout/internal/database"
	"go.uber.org/fx"
)

func main() {
	fx.
		New(
			fx.Provide(
				fx.Annotate(
					database.NewDatabaseProvider,
					fx.As(new(database.IDatabaseProvider)))),
			fx.Provide(api.NewServer),
			fx.Invoke(func(_ *api.Server) {})).
		Run()
}
