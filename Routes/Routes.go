package Routes

import (
	"rewsrv-gin/Controllers"
	"rewsrv-gin/middleware"

	"github.com/gin-gonic/gin"
)

// Setup Router
func SetupRouter() *gin.Engine {
	r := gin.Default()

	// REMEMBER: middleware must precede routes !! //
	r.Use(middleware.Cors())

	r.GET("/logbook/runs", Controllers.GetRuns)
	r.POST("/logbook/runs", Controllers.CreateRun)
	r.PUT("/logbook/runs/:id", Controllers.UpdateRun)
	r.DELETE("/logbook/runs/:id", Controllers.DeleteRun)

	r.GET("/logbook/shots", Controllers.GetAllShots)
	r.POST("/logbook/shots", Controllers.CreateShot)
	r.PUT("/logbook/shots/:id", Controllers.UpdateShot)
	r.DELETE("/logbook/shots/:id", Controllers.DeleteShot)

	return r
}
