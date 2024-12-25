package data

type User struct {
	Id       string `bson:"_id" json:"id"`
	Name     string `bson:"name" json:"name"`
	Password string `bson:"password" json:"password"`
}

type UserModel struct {
	Id   string `json:"id"`
	Name string `json:"name"`
}

type GetUserModelResponse struct {
	UserModel *UserModel `json:"userModel"`
}
