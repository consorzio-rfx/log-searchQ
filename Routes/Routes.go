package Routes

import (
	"rewsrv-gin/Controllers"
	"rewsrv-gin/middleware"

	"github.com/gin-gonic/gin"
)

// Setup Router
func SetupRouter() *gin.Engine {
	r := gin.Default()
	// grouping
	// guitar := r.Group("/guitar-store")
	// {
	// 	guitar.GET("guitar", Controllers.GetGuitar)
	// 	guitar.POST("guitar", Controllers.CreateGuitar)
	// 	guitar.PUT("guitar/:id", Controllers.UpdateGuitar)
	// 	guitar.DELETE("guitar/:id", Controllers.DeleteGuitar)
	// }

	r.Use(middleware.GinCors())

	r.GET("/guitar-store/guitar", middleware.KCValidate([]string{"guitar:view", "guitar:list"}), Controllers.GetGuitar)
	r.POST("/guitar-store/guitar", Controllers.CreateGuitar)
	r.PUT("/guitar-store/guitar/:id", Controllers.UpdateGuitar)
	r.DELETE("/guitar-store/guitar/:id", Controllers.DeleteGuitar)

	r.GET("/rss", Controllers.GetAllRSSFeed)
	r.GET("/rss/:id", Controllers.GetRSSFeed)
	r.POST("/rss", Controllers.CreateRSSFeed)
	r.PUT("/rss/:id", Controllers.UpdateRSSFeed)
	r.DELETE("/rss/:id", Controllers.DeleteRSSFeed)

	return r
}
