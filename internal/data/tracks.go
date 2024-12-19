package data

type Track struct {
	Id   string `bson:"_id" json:"id"`
	Name string `bson:"name" json:"name"`
}

type TrackLayout struct {
	Id      string `bson:"_id" json:"id"`
	Name    string `bson:"name" json:"name"`
	ImageId string `bson:"imageId" json:"imageId"`
	TrackId string `bson:"trackId" json:"trackId"`
}
