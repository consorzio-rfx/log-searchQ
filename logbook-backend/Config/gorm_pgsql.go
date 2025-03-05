package Config

// import (
// 	_ "github.com/jinzhu/gorm/dialects/postgres"
// )

type PgsqlConfig struct {
	GeneralDBConfig `yaml:",inline" mapstructure:",squash"`
}

func (p *PgsqlConfig) Dsn() string {
	return "host=" + p.Path + " user=" + p.Username + " password=" + p.Password + " dbname=" + p.Dbname + " port=" + p.Port + " " + p.Config
}

func (p *PgsqlConfig) LinkDsn(dbname string) string {
	return "host=" + p.Path + " user=" + p.Username + " password=" + p.Password + " dbname=" + dbname + " port=" + p.Port + " " + p.Config
}
