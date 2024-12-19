package database

type IDatabaseProvider interface {
	GetMongoDatabase() *MongoDatabase
}

type Provider struct{}

func NewDatabaseProvider() Provider {
	return Provider{}
}

func (d Provider) GetMongoDatabase() *MongoDatabase {
	return NewMongoDatabase()
}
