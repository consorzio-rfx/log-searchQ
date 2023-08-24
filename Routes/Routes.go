package Routes

import (
	"simple-rest-api-go/Controllers"

	"github.com/gin-gonic/gin"
)

//Setup Router
func SetupRouter() *gin.Engine {
	r := gin.Default()
	// grouping
	guitar := r.Group("/guitar-store")
	{
		guitar.GET("guitar", Controllers.GetGuitar)
		guitar.POST("guitar", Controllers.CreateGuitar)
		guitar.PUT("guitar/:id", Controllers.UpdateGuitar)
		guitar.DELETE("guitar/:id", Controllers.DeleteGuitar)
	}
	return r
}