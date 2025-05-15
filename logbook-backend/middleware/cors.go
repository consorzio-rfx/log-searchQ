package middleware

import (
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func CORSDumpMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == "GET" {
			fmt.Println("preflight request")
			fmt.Println("preflight request headers")
			for k, v := range c.Request.Header {
				fmt.Printf("%s: %s\n", k, v)
			}
			fmt.Println("preflight request body")
			body, err := io.ReadAll(c.Request.Body)
			if err != nil {
				fmt.Println(err)
				return
			}
			fmt.Println(string(body))
			c.AbortWithStatus(204)
		}
	}
}

func CORSMiddleware() gin.HandlerFunc {
	fmt.Println("cors middleware")
	return cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"PUT", "PATCH", "GET", "POST", "OPTIONS", "DELETE"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "http://localhost:3000"
		},
		MaxAge: 12 * time.Hour,
	})
}

func CorsMyMiddleware() gin.HandlerFunc {
	fmt.Println("cors MY middleware")
	return func(c *gin.Context) {
		fmt.Println("cors MY middleware func")
		c.AbortWithStatus(204)
		return
	}
}

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		method := c.Request.Method
		origin := c.Request.Header.Get("Origin")
		c.Header("Access-Control-Allow-Origin", origin)
		c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token,X-Token,X-User-Id")
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type, New-Token, New-Expires-At")
		c.Header("Access-Control-Allow-Credentials", "true")

		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		c.Next()
	}
}
