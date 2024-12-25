package data

type Car struct {
	DriverId        string   `bson:"driverId" json:"driverId"`
	Drivetrain      string   `bson:"drivetrain" json:"drivetrain"`
	EnginePlacement string   `bson:"enginePlacement" json:"enginePlacement"`
	Horsepower      int      `bson:"horsepower" json:"horsepower"`
	Id              string   `bson:"_id" json:"id"`
	Mods            []string `bson:"mods" json:"mods"`
	Tires           CarTire  `bson:"tires" json:"tires"`
	Title           string   `bson:"title" json:"title"`
}

type CarTire struct {
	Brand string `bson:"brand" json:"brand"`
	Size  string `bson:"size" json:"size"`
}

type CarModel struct {
	Car `tstype:",extends"`
}
