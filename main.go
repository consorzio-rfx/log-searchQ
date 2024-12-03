package main

import (
	"fmt"

	"rewsrv-gin/Config"
	"rewsrv-gin/Models"
	"rewsrv-gin/Routes"
)

var err error

func main() {

	// config
	Config.DB, err = Config.NewGormDBFromGeneralDBConfig(&Config.GeneralDBConfig{
		Engine:   "postgres",
		Path:     "localhost",
		Port:     "5432",
		Dbname:   "rewsrv",
		Username: "rewsrv",
		Password: "rewsrv",
		Config:   "sslmode=disable TimeZone=Europe/Rome",
	})

	if err != nil {
		fmt.Println("Status:", err)
		return
	}
	// defer Config.DB.Close()

	// automigrate
	Config.DB.AutoMigrate(&Models.Guitar{})

	// create one item
	Config.DB.Create(&Models.Guitar{
		Brand:       "Fender",
		Price:       1000,
		Description: "Very good guitar",
	})

	// create another item
	Config.DB.Create(&Models.Guitar{
		Brand:       "Gibson",
		Price:       2000,
		Description: "Very good guitar",
	})

	// routes
	r := Routes.SetupRouter()

	//running
	r.Run()
}
