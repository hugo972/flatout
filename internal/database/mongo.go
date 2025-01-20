package database

import (
	"context"
	"flatout/internal/data"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type MongoDatabase struct {
	database     *mongo.Database
	Cars         *MongoCollection[data.Car]
	Drivers      *MongoCollection[data.Driver]
	Events       *MongoCollection[data.Event]
	EventResults *MongoCollection[data.EventResult]
	Images       *MongoCollection[data.Image]
	Tracks       *MongoCollection[data.Track]
	TrackLayouts *MongoCollection[data.TrackLayout]
	Users        *MongoCollection[data.User]
}

type MongoCollection[TDocument interface{}] struct {
	collection *mongo.Collection
}

func NewMongoDatabase() *MongoDatabase {
	client, err := mongo.Connect(options.Client().ApplyURI("mongodb://admin:admin@localhost:27017/admin"))
	if err != nil {
		return nil
	}

	database := client.Database("flatout")
	return &MongoDatabase{
		database:     database,
		Cars:         &MongoCollection[data.Car]{collection: database.Collection("Cars")},
		Drivers:      &MongoCollection[data.Driver]{collection: database.Collection("Drivers")},
		Events:       &MongoCollection[data.Event]{collection: database.Collection("Events")},
		EventResults: &MongoCollection[data.EventResult]{collection: database.Collection("EventResults")},
		Images:       &MongoCollection[data.Image]{collection: database.Collection("Images")},
		Tracks:       &MongoCollection[data.Track]{collection: database.Collection("Tracks")},
		TrackLayouts: &MongoCollection[data.TrackLayout]{collection: database.Collection("TrackLayouts")},
		Users:        &MongoCollection[data.User]{collection: database.Collection("Users")},
	}
}

func (c *MongoCollection[TDocument]) Get(id string) (*TDocument, error) {
	ctx := context.Background()

	var document TDocument
	err := c.collection.FindOne(ctx, bson.M{"_id": id}).Decode(&document)
	if err != nil {
		return nil, err
	}

	return &document, nil
}

func (c *MongoCollection[TDocument]) List() (*[]TDocument, error) {
	ctx := context.Background()

	documentCursor, err := c.collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}

	var documents []TDocument
	if err := documentCursor.All(ctx, &documents); err != nil {
		return nil, err
	}

	return &documents, nil
}
