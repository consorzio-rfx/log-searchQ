package Controllers

import (
	"fmt"
	"net/http"
	"strconv"

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

// Update a run
func UpdateRun(c *gin.Context) {
	var run Models.Run

	idStr := c.Params.ByName("id")
	c.BindJSON(&run)
	id, _ := strconv.ParseUint(idStr, 10, 64)
	run.Run = uint(id)

	err := Models.UpdateRun(&run)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, run)
	}
}

// Delete a run
func DeleteRun(c *gin.Context) {
	var run Models.Run
	idStr := c.Params.ByName("id")
	id, _ := strconv.ParseUint(idStr, 10, 64)
	run.Run = uint(id)

	err := Models.DeleteRun(&run)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, run)
	}
}
