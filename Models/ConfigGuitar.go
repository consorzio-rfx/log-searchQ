package Models

type Guitar struct {
	Id          uint    `json:"id"`
	Brand       string  `json:"brand"`
	Price       float64 `json:"price"`
	Description string  `json:"description"`
	CreateTime  string  `json:"createTime"`
}

func (b *Guitar) TableName() string {
	return "guitar"
}
