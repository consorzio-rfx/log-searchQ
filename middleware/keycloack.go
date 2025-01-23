package middleware

import (
	"fmt"
	"net/http"
	"net/url"

	keycloakmiddleware "github.com/erajayatech/go-keycloak-middleware"

	"github.com/gin-gonic/gin"
)

// wtoiiGcNCzZEEKK0COFzdBNexG5ZmwWE

var kcmiddleware = keycloakmiddleware.Construct(0) // 0: default wrapper, 1: standard wrapper, 2: traceable wrapper

func KCValidate(scopes []string) gin.HandlerFunc { return kcmiddleware.Validate(scopes) }

// api := app.Group("/api")
// {
// 	api.GET("/order", scopeMiddleware.Validate([]string{"order:view", "order:list"}), orderListHandler)
// 	api.PUT("/order/:id", scopeMiddleware.Validate([]string{"order:update"}), orderUpdateHandler)
// }

var (
	KeycloakBaseURL = "https://auth.mildstone.org/auth"
	Realm           = "mildstone.org"
	ClientID        = "keycloak-jwt"
	ClientSecret    = "wtoiiGcNCzZEEKK0COFzdBNexG5ZmwWE"
	RedirectURI     = "http://auth.mildstone.org/callback" // Deve corrispondere al redirect URI configurato
)

func KeycloakAuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Controlla se l'utente ha un token valido
		token := c.Query("token")
		if token == "" {
			// Se non c'è un token, reindirizza al portale di login di Keycloak
			authURL := fmt.Sprintf("%s/realms/%s/protocol/openid-connect/auth?client_id=%s&response_type=code&scope=openid&redirect_uri=%s",
				KeycloakBaseURL, Realm, ClientID, url.QueryEscape(RedirectURI))
			c.Redirect(http.StatusFound, authURL)
			c.Abort()
			return
		}

		// Altrimenti, prosegui con la richiesta
		c.Next()
	}
}
