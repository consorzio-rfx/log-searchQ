package Controllers

import (
	"net/http"
	"strconv"

	"rewsrv-gin/Models"

	"github.com/gin-gonic/gin"
)

// Get runs with pagination
func GetRuns(c *gin.Context) {
	// Get page and pageSize from query parameters
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "100"))

	var totalRuns int64
	var runs []Models.Run

	err1 := Models.GetTotalRuns(&totalRuns)
	err2 := Models.GetRuns(&runs, page, pageSize)

	if err1 != nil || err2 != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
	} else {
		// Respond with paginated runs
		c.JSON(http.StatusOK, gin.H{
			"runs":      runs,
			"totalRuns": totalRuns,
		})
	}
}

// Get a single run by id
func GetRun(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	var run Models.Run
	err := Models.GetRun(&run, id)

	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
	} else {
		c.JSON(http.StatusOK, run)
	}
}

// Get all runs
func GetAllRuns(c *gin.Context) {
	var runs []Models.Run

	err := Models.GetAllRuns(&runs)
	if err != nil {
		c.AbortWithStatus(http.StatusInternalServerError)
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
		c.AbortWithStatus(http.StatusInternalServerError)
	} else {
		c.JSON(http.StatusCreated, run)
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
		c.AbortWithStatus(http.StatusInternalServerError)
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
		c.AbortWithStatus(http.StatusInternalServerError)
	} else {
		c.JSON(http.StatusOK, run)
	}
}
