package utils

import (
	"net/url"
	"rewsrv-gin/Config"
)

// ParseDatabaseURL parses the DATABASE_URL from env
func ParseDatabaseURL(databaseURL string) (*Config.GeneralDBConfig, error) {
	parsedURL, err := url.Parse(databaseURL)
	if err != nil {
		return nil, err
	}

	// Extract credentials
	user := parsedURL.User.Username()
	password, _ := parsedURL.User.Password()

	// Extract host and port
	host := parsedURL.Hostname()
	port := parsedURL.Port()

	// Extract DB name
	dbname := parsedURL.Path
	if len(dbname) > 0 && dbname[0] == '/' {
		dbname = dbname[1:] // Remove leading slash
	}

	return &Config.GeneralDBConfig{
		Engine:   parsedURL.Scheme,
		Path:     host,
		Port:     port,
		Dbname:   dbname,
		Username: user,
		Password: password,
		Config:   "sslmode=disable TimeZone=Europe/Rome",
	}, nil
}
