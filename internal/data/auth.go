package data

type LoginRequest struct {
	Password string `json:"password"`
	Username string `json:"username"`
}
