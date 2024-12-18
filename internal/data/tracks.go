package data

type Track struct {
	Id   string `bson:"_id" json:"id"`
	Name string `bson:"name" json:"name"`
}
