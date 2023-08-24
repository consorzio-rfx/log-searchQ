package Controllers

import (
	"fmt"
	"net/http"

	"simple-rest-api-go/Models"

	"github.com/gin-gonic/gin"
)

//Get Guitar
func GetGuitar(c *gin.Context) {
	var guitar []Models.Guitar

	err := Models.GetAllGuitar(&guitar)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, guitar)
	}
}

//Create Guitar
func CreateGuitar(c *gin.Context) {
	var guitar Models.Guitar
	c.BindJSON(&guitar)
	
	err := Models.CreateGuitar(&guitar)
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, guitar)
	}
}