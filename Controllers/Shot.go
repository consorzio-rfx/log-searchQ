package Controllers

import (
	"fmt"
	"net/http"

	"rewsrv-gin/Models"

	"github.com/gin-gonic/gin"
)

// Get all shots
func GetAllShots(c *gin.Context) {
	var shots []Models.Shot

	err := Models.GetAllShots(&shots)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, shots)
	}
}

// Create a new shot
func CreateShot(c *gin.Context) {
	var shot Models.Shot
	c.BindJSON(&shot)

	err := Models.CreateShot(&shot)
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, shot)
	}
}
