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
	ID          uint   `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	UserID      uint   `json:"userId"`
	Status      string `json:"status"`
}

type UpdateProjectDTO struct {
	ID          uint   `json:"id,omitempty"`
	Title       string `json:"title,omitempty"`
	Description string `json:"description,omitempty"`
	UserID      uint   `json:"userId,omitempty"`
	Status      string `json:"status,omitempty"`
}
