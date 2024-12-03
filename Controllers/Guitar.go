package Controllers

import (
	"fmt"
	"net/http"

	"rewsrv-gin/Models"

	"github.com/gin-gonic/gin"
)

// Get Guitar
func GetGuitar(c *gin.Context) {
	var guitar []Models.Guitar

	err := Models.GetAllGuitar(&guitar)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, guitar)
	}
}

// Create Guitar
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

// Update Guitar
func UpdateGuitar(c *gin.Context) {
	var guitar Models.Guitar
	id := c.Params.ByName("id")

	err := Models.GetGuitarByID(&guitar, id)
	if err != nil {
		c.JSON(http.StatusNotFound, guitar)
	}

	c.BindJSON(&guitar)

	err = Models.UpdateGuitar(&guitar, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, guitar)
	}
}

// Delete Guitar
func DeleteGuitar(c *gin.Context) {
	var guitar Models.Guitar
	id := c.Params.ByName("id")

	err := Models.DeleteGuitar(&guitar, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id" + id: "is deleted"})
	}
}
