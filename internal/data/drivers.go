package data

type Driver struct {
	Id   string `bson:"_id" json:"id"`
	Name string `bson:"name" json:"name"`
}

type DriverModel struct {
	Driver `tstype:",extends"`
}
