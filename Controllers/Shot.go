package Controllers

import (
	"fmt"
	"net/http"
	"strconv"

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

// Update a shot
func UpdateShot(c *gin.Context) {
	var shot Models.Shot

	idStr := c.Params.ByName("id")
	c.BindJSON(&shot)
	id, _ := strconv.ParseUint(idStr, 10, 64)
	shot.Shot = uint(id)

	fmt.Printf("AAAAA %+v\n", shot)

	err := Models.UpdateShot(&shot)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, shot)
	}
}

// Delete a shot
func DeleteShot(c *gin.Context) {
	var shot Models.Shot
	idStr := c.Params.ByName("id")
	id, _ := strconv.ParseUint(idStr, 10, 64)
	shot.Shot = uint(id)

	err := Models.DeleteShot(&shot)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, shot)
	}
}
