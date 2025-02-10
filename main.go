package main

import (
	"fmt"

	"rewsrv-gin/Config"
	"rewsrv-gin/Routes"
)

var err error

func main() {

	// config
	Config.DB, err = Config.NewGormDBFromGeneralDBConfig(&Config.GeneralDBConfig{
		Engine:   "postgres",
		Path:     "localhost",
		Port:     "5432",
		Dbname:   "logbookdb",
		Username: "helloworld",
		Password: "helloworld",
		Config:   "sslmode=disable TimeZone=Europe/Rome",
	})

	if err != nil {
		fmt.Println("Status:", err)
		return
	}
	// defer Config.DB.Close()

	// automigrate
	// Config.DB.AutoMigrate(&Models.Run{})

	// routes
	r := Routes.SetupRouter()

	//running
	r.Run(":8081")
}
