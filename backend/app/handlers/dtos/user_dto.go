package dtos

type CreateUserRequestDTO struct {
	Firstname string `json:"firstName"`
	Lastname  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type LoginUserDTO struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserRequestDTO struct {
	ID              uint                `json:"id"`
	Firstname       string              `json:"firstName"`
	Lastname        string              `json:"lastName"`
	Role            string              `json:"role"`
	Email           string              `json:"email"`
	UserType        string              `json:"userType"`
	AnnualLeaveDays int                 `json:"annualLeaveDays"`
	Projects        []ProjectRequestDTO `json:"projects"`
}
