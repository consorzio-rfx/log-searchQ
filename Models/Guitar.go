package Models

import (
	"simple-rest-api-go/Config"
)

//Get All Guitar
func GetAllGuitar(guitar *[]Guitar) (err error) {
	if err = Config.DB.Find(guitar).Error; err != nil {
		return err
	}
	return nil
}

//Create Guitar 
func CreateGuitar(guitar *Guitar) (err error) {
	if err = Config.DB.Create(guitar).Error; err != nil {
		return err
	}
	return nil
}