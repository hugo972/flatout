package database

type DatabaseProvider struct {
}

func NewDatabaseProvider() *DatabaseProvider {
	return &DatabaseProvider{}
}

func (d *DatabaseProvider) GetMongoDatabase() *MongoDatabase {
	return NewMongoDatabase()
}
