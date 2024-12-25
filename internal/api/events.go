package api

import (
	"flatout/internal/data"
	"github.com/gofiber/fiber/v2"
	"github.com/samber/lo"
)

func (s *Server) ConfigureEvents() {
	s.fiberApp.Get(
		"/api/events/getEventModels",
		s.handleGetEventModels)
}

func (s *Server) handleGetEventModels(c *fiber.Ctx) error {
	mongoDatabase := s.databaseProvider.GetMongoDatabase()

	events, err := mongoDatabase.Events.List()
	if err != nil {
		return err
	}

	eventResults, err := mongoDatabase.EventResults.List()
	if err != nil {
		return err
	}

	trackLayouts, err := mongoDatabase.TrackLayouts.List()
	if err != nil {
		return err
	}

	eventIdToResultsMap :=
		lo.GroupBy(
			*eventResults,
			func(eventResult data.EventResult) any {
				return eventResult.EventId
			})

	trackLayoutMap :=
		lo.KeyBy(
			*trackLayouts,
			func(trackLayout data.TrackLayout) string {
				return trackLayout.Id
			})

	rootEvents :=
		lo.Filter(
			*events,
			func(event data.Event, _ int) bool {
				return event.ParentEventId == nil
			})

	var eventModels []data.EventModel
	for _, rootEvent := range rootEvents {
		relatedEvents :=
			lo.Filter(
				*events,
				func(event data.Event, _ int) bool {
					return event.ParentEventId != nil && *event.ParentEventId == rootEvent.Id
				})

		var modelEvents []data.EventModelEvent
		for _, relatedEvent := range relatedEvents {
			modelEvents =
				append(
					modelEvents,
					data.EventModelEvent{
						Id:          relatedEvent.Id,
						Name:        relatedEvent.Name,
						Results:     eventIdToResultsMap[relatedEvent.Id],
						Time:        relatedEvent.Time,
						TrackLayout: trackLayoutMap[relatedEvent.TrackLayoutId],
					})
		}

		eventModels =
			append(
				eventModels,
				data.EventModel{
					Id:     rootEvent.Id,
					Name:   rootEvent.Name,
					Events: modelEvents,
				})
	}

	return c.JSON(eventModels)
}
