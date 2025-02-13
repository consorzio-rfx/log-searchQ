package Controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"rewsrv-gin/Models"

	"github.com/gin-gonic/gin"
)

// Get shots with pagination
func GetShots(c *gin.Context) {
	// Get page and pageSize from query parameters
	runId, _ := strconv.Atoi(c.DefaultQuery("Run", "-1"))
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	pageSize, _ := strconv.Atoi(c.DefaultQuery("pageSize", "100"))

	var totalShots int64
	var shots []Models.Shot

	err1 := Models.GetTotalShots(&totalShots, runId)
	err2 := Models.GetShots(&shots, runId, page, pageSize)

	if err1 != nil || err2 != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		// Respond with paginated shots
		c.JSON(http.StatusOK, gin.H{
			"shots":      shots,
			"totalShots": totalShots,
		})
	}
}

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
