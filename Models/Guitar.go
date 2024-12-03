package Models

import (
	"fmt"

	"rewsrv-gin/Config"
)

// Get All Guitar
func GetAllGuitar(guitar *[]Guitar) (err error) {
	if err = Config.DB.Find(guitar).Error; err != nil {
		return err
	}
	return nil
}

// Create Guitar
func CreateGuitar(guitar *Guitar) (err error) {
	if err = Config.DB.Create(guitar).Error; err != nil {
		return err
	}
	return nil
}

// Get Guitar ByID
func GetGuitarByID(guitar *Guitar, id string) (err error) {
	if err = Config.DB.Where("id = ?", id).First(guitar).Error; err != nil {
		return err
	}
	return nil
}

// Update Guitar
func UpdateGuitar(guitar *Guitar, id string) (err error) {
	fmt.Println(guitar)
	Config.DB.Save(guitar)
	return nil
}

// Delete Guitar
func DeleteGuitar(guitar *Guitar, id string) (err error) {
	Config.DB.Where("id = ?", id).Delete(guitar)
	return nil
}
