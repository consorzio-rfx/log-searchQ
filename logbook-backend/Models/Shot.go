package Models

import (
	"rewsrv-gin/Config"

	"time"

	"gorm.io/gorm"
)

type Shot struct {
	Username     string    `gorm:"type:varchar(14)"`
	Entered      time.Time `gorm:"type:timestamp without time zone;default:CURRENT_TIMESTAMP"`
	RunID        uint      `gorm:"column:run" json:"Run"`
	Shot         uint      `gorm:"primaryKey;"`
	PreBrief     string    `gorm:"type:varchar(300)"`
	PostBrief    string    `gorm:"type:varchar(300)"`
	PreKeywords  string    `gorm:"type:varchar(150)"`
	PostKeywords string    `gorm:"type:varchar(150)"`
	Quality      string    `gorm:"type:varchar(2)"`

	RunRef Run `gorm:"foreignKey:RunID;references:Run;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;" json:"-"`
}

func (b *Shot) TableName() string {
	return "shots"
}

// Get total count of shots
func GetTotalShots(totalShots *int64, runId int) (err error) {
	if runId != -1 {
		if err = Config.DB.Model(&Shot{}).Where("Run = ?", runId).Count(totalShots).Error; err != nil {
			return err
		}
	} else {
		if err = Config.DB.Model(&Shot{}).Count(totalShots).Error; err != nil {
			return err
		}
	}
	return nil
}

// Get shots with pagination
func GetShots(shots *[]Shot, runId int, page int, pageSize int) (err error) {
	offset := (page - 1) * pageSize

	if runId != -1 {
		if err = Config.DB.Where("Run = ?", runId).Order("shot").Limit(pageSize).Offset(offset).Find(shots).Error; err != nil {
			return err
		}
	} else {
		if err = Config.DB.Order("shot").Limit(pageSize).Offset(offset).Find(shots).Error; err != nil {
			return err
		}
	}
	return nil
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

// Update a shot
func UpdateShot(shot *Shot) (err error) {
	if err = Config.DB.Omit("entered").Save(shot).First(shot).Error; err != nil {
		return err
	}
	return nil
}

// Delete a shot
func DeleteShot(shot *Shot) (err error) {
	// Retrieve the shot first
	if err = Config.DB.First(shot).Error; err != nil {
		return err
	}

	if err = Config.DB.Delete(shot).Error; err != nil {
		return err
	}
	return nil
}
