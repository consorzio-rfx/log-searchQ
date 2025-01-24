package Models

import (
	"rewsrv-gin/Config"

	"time"

	"gorm.io/gorm"
)

type Shot struct {
	Username     string    `gorm:"type:varchar(14)"`
	Entered      time.Time `gorm:"type:timestamp without time zone;default:CURRENT_TIMESTAMP"`
	Run          uint
	Shot         uint   `gorm:"primaryKey;"`
	PreBrief     string `gorm:"type:varchar(300)"`
	PostBrief    string `gorm:"type:varchar(300)"`
	PreKeywords  string `gorm:"type:varchar(150)"`
	PostKeywords string `gorm:"type:varchar(150)"`
	Quality      string `gorm:"type:varchar(2)"`
}

func (b *Shot) TableName() string {
	return "shots"
}

// Get all shots
func GetAllShots(shots *[]Shot) (err error) {
	if err = Config.DB.Find(shots).Error; err != nil {
		return err
	}
	return nil
}

// BeforeCreate hook to assign the maxID for the new shot
func (shot *Shot) BeforeCreate(tx *gorm.DB) (err error) {
	var maxID uint
	tx.Raw("SELECT COALESCE(MAX(shot), 0) + 1 FROM shots").Scan(&maxID)
	shot.Shot = maxID
	return
}

// Create a new shot
func CreateShot(shot *Shot) (err error) {
	if err = Config.DB.Create(shot).Error; err != nil {
		return err
	}
	return nil
}
