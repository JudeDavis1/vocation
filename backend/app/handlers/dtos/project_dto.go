package dtos

type CreateProjectDTO struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	UserID      string `json:"userId"`
}

type ProjectDTO struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	UserID      uint   `json:"userId"`
}
