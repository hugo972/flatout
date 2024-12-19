package data

import "time"

type Event struct {
	Id            string    `bson:"_id" json:"id"`
	Name          string    `bson:"name" json:"name"`
	ParentEventId *string   `bson:"parentEventId" json:"parentEventId"`
	Time          time.Time `bson:"time" json:"time"`
	TrackLayoutId string    `bson:"trackLayoutId" json:"trackLayoutId"`
}

type EventResult struct {
	Id       string  `bson:"_id" json:"id"`
	CarId    string  `bson:"carId" json:"carId"`
	DriverId string  `bson:"driverId" json:"driverId"`
	EventId  string  `bson:"eventId" json:"eventId"`
	LapTime  float64 `bson:"lapTime" json:"lapTime"`
}

type EventModel struct {
	Id     string            `json:"id"`
	Name   string            `json:"name"`
	Events []EventModelEvent `json:"events"`
}

type EventModelEvent struct {
	Id          string        `json:"id"`
	Name        string        `json:"name"`
	Results     []EventResult `json:"results"`
	Time        time.Time     `json:"time"`
	TrackLayout TrackLayout   `json:"trackLayout"`
}
