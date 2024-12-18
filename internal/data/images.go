package data

type Image struct {
	Data []byte `bson:"data" json:"data"`
	Id   string `bson:"_id" json:"id"`
}
