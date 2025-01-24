package Controllers

import (
	"fmt"
	"net/http"

	"rewsrv-gin/Models"

	"github.com/gin-gonic/gin"
)

// Get all runs
func GetAllRuns(c *gin.Context) {
	var runs []Models.Run

	err := Models.GetAllRuns(&runs)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, runs)
	}
}

// Create a new run
func CreateRun(c *gin.Context) {
	var run Models.Run
	c.BindJSON(&run)

	err := Models.CreateRun(&run)
	if err != nil {
		fmt.Println(err.Error())
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, run)
	}
}
