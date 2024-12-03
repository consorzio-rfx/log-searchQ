package middleware

import (
	"github.com/gin-gonic/gin"
)

func Footer() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		c.Writer.Write([]byte("<p align=\"center\">Copyright &copy; 2022 <a href=\"https://yfingames.com\">YFinGames</a>. All Rights Reserved.</p>"))
	}
}
