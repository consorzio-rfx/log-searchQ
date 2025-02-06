package middleware

import (
	"context"
	"net/http"
	"strings"

	"github.com/Nerzal/gocloak/v13"
	"github.com/gin-gonic/gin"
)

var (
	keycloakURL  = "http://localhost:8080"
	realm        = "myrealm"
	clientID     = "backend-client"
	clientSecret = "secret"
	client       = gocloak.NewClient(keycloakURL)
)

func KeycloakAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Get Authorization header
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
			c.Abort()
			return
		}

		// Extract the token from "Bearer <token>"
		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid Authorization header format"})
			c.Abort()
			return
		}

		tokenStr := tokenParts[1]

		// Decode and Validate Access Token
		ctx := context.Background()
		decodedToken, _, err := client.DecodeAccessToken(ctx, tokenStr, realm)
		// fmt.Printf("%+v\n", decodedToken)

		if err != nil || decodedToken == nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			c.Abort()
			return
		}

		c.Next()
	}
}
