package database

import (
	"context"
	"flatout/internal/data"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type MongoDatabase struct {
	database *mongo.Database
	Images   *MongoCollection[data.Image]
	Tracks   *MongoCollection[data.Track]
}

type MongoCollection[TDocument interface{}] struct {
	collection *mongo.Collection
}

func NewMongoDatabase() *MongoDatabase {
	client, err := mongo.Connect(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		return nil
	}

	database := client.Database("flatout")
	return &MongoDatabase{
		database: database,
		Images:   &MongoCollection[data.Image]{collection: database.Collection("Images")},
		Tracks:   &MongoCollection[data.Track]{collection: database.Collection("Tracks")},
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

	tracksCursor, err := c.collection.Find(ctx, bson.D{})
	if err != nil {
		return nil, err
	}

	var documents []TDocument
	if err := tracksCursor.All(ctx, &documents); err != nil {
		return nil, err
	}

	return &documents, nil
}
