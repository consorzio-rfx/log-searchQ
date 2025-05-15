package Config

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

type GeneralDBConfig struct {
	Prefix       string `mapstructure:"prefix" json:"prefix" yaml:"prefix"`
	Port         string `mapstructure:"port" json:"port" yaml:"port"`
	Config       string `mapstructure:"config" json:"config" yaml:"config"`
	Dbname       string `mapstructure:"db-name" json:"db-name" yaml:"db-name"`
	Username     string `mapstructure:"username" json:"username" yaml:"username"`
	Password     string `mapstructure:"password" json:"password" yaml:"password"`
	Path         string `mapstructure:"path" json:"path" yaml:"path"`
	Engine       string `mapstructure:"engine" json:"engine" yaml:"engine" default:"postgres"`
	LogMode      string `mapstructure:"log-mode" json:"log-mode" yaml:"log-mode"`
	MaxIdleConns int    `mapstructure:"max-idle-conns" json:"max-idle-conns" yaml:"max-idle-conns"`
	MaxOpenConns int    `mapstructure:"max-open-conns" json:"max-open-conns" yaml:"max-open-conns"`
	// Singular     bool   `mapstructure:"singular" json:"singular" yaml:"singular"`
	// LogZap       bool   `mapstructure:"log-zap" json:"log-zap" yaml:"log-zap"`
}

func NewGormDBFromGeneralDBConfig(gdbc *GeneralDBConfig) (*gorm.DB, error) {
	if gdbc.Engine == "postgres" {
		// convert to pgsql config
		pgsqlConfig := PgsqlConfig{
			GeneralDBConfig: *gdbc,
		}
		return gorm.Open(postgres.Open(pgsqlConfig.Dsn()), &gorm.Config{})
	}
	return nil, fmt.Errorf("engine %s is not supported", gdbc.Engine)
}
