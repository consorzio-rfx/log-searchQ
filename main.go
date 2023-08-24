package main

import (
	"fmt"
	"simple-rest-api-go/Config"
	"simple-rest-api-go/Models"
	"simple-rest-api-go/Routes"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)
var err error

func main() {
	Config.DB, err = gorm.Open("mysql", Config.DbURL(Config.BuildDBConfig()))
	
	if err != nil {
		fmt.Println("Status:", err)
	}
	defer Config.DB.Close()

	Config.DB.AutoMigrate(&Models.Guitar{})
	r := Routes.SetupRouter()

	//running
	r.Run()
}