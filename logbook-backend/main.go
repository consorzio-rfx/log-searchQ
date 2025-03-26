package main

import (
	"fmt"
	"log"
	"os"

	"rewsrv-gin/Config"
	"rewsrv-gin/Routes"
	"rewsrv-gin/utils"
)

var err error
var config *Config.GeneralDBConfig

func main() {

	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		// Default
		databaseURL = "postgres://helloworld:helloworld@localhost:5432/logbookdb"
	}

	// Parse DATABASE_URL
	config, err = utils.ParseDatabaseURL(databaseURL)
	if err != nil {
		log.Fatalf("Error parsing DATABASE_URL: %v", err)
	}

	// config
	Config.DB, err = Config.NewGormDBFromGeneralDBConfig(config)

	if err != nil {
		fmt.Println("Status:", err)
		return
	}
	// defer Config.DB.Close()

	// automigrate
	// Config.DB.AutoMigrate(&Models.Run{})
	// Config.DB.AutoMigrate(&Models.Shot{})

	// routes
	r := Routes.SetupRouter()

	//running
	r.Run(":8081")
}
