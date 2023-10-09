package dtos

type CreateProjectDTO struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	UserID      string `json:"userId"`
}

type DeleteProjectDTO struct {
	ID uint `json:"id"`
}

type ProjectRequestDTO struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	UserID      uint   `json:"userId"`
	Status      string `json:"status"`
	ID          uint   `json:"id"`
}
