package core

type NebulumMarsRoversError struct {
	IsNebulumMarsRoversError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewNebulumMarsRoversError(code string, msg string, ctx *Context) *NebulumMarsRoversError {
	return &NebulumMarsRoversError{
		IsNebulumMarsRoversError: true,
		Sdk:              "NebulumMarsRovers",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *NebulumMarsRoversError) Error() string {
	return e.Msg
}
