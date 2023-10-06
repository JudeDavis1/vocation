package dtos

type CreateProjectRequestDTO struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	UserID      string `json:"userId"`
}
