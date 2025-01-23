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
	Config.DB.AutoMigrate(
		&Models.Guitar{},
		&Models.RSSFeed{},
	)

	// delete all preexistent items
	Config.DB.Unscoped().Where("id > ?", 0).Delete(&Models.Guitar{})

	// create one item
	Config.DB.Create(&Models.Guitar{
		Brand:       "Fender 2",
		Price:       1000,
		Description: "Very good guitar",
	})

	// create another item
	Config.DB.Create(&Models.Guitar{
		Brand:       "Gibson 2",
		Price:       2000,
		Description: "Very good guitar",
	})

	// create another item
	Config.DB.Create(&Models.RSSFeed{
		Name:  "The Daily",
		Title: "The Daily Art19",
		Url:   "http://rss.art19.com/the-daily",
	})

	// create another item
	Config.DB.Create(&Models.RSSFeed{
		Name:  "The Weekly",
		Title: "The Weekly Art19",
		Url:   "http://rss.art19.com/the-daily",
	})

	// routes
	r := Routes.SetupRouter()

	// add cors middleware
	// r.Use(middleware.GinCors())

	//running
	r.Run()
}
