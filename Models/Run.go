package Models

import (
	"rewsrv-gin/Config"

	"time"
)

type Run struct {
	Username     string    `gorm:"type:varchar(14)"`
	Entered      time.Time `gorm:"type:timestamp without time zone;default:CURRENT_TIMESTAMP"`
	Run          uint      `gorm:"primaryKey;"`
	PreBrief     string    `gorm:"type:varchar(300)"`
	PostBrief    string    `gorm:"type:varchar(300)"`
	PreKeywords  string    `gorm:"type:varchar(150)"`
	PostKeywords string    `gorm:"type:varchar(150)"`
	Leader       string    `gorm:"type:varchar(150)"`
	Summary      string    `gorm:"type:varchar(256)"`
	Rt           string    `gorm:"type:varchar(256)"`
	Sc           string    `gorm:"type:varchar(256)"`
	Sl           string    `gorm:"type:varchar(256)"`
}

func (b *Run) TableName() string {
	return "runs"
}

// Get all runs
func GetAllRuns(runs *[]Run) (err error) {
	if err = Config.DB.Find(runs).Error; err != nil {
		return err
	}
	return nil
}

// // BeforeCreate hook to assign the maxID for the new run
// func (run *Run) BeforeCreate(tx *gorm.DB) (err error) {
// 	var maxID uint
// 	tx.Raw("SELECT COALESCE(MAX(run), 0) + 1 FROM runs").Scan(&maxID)
// 	run.Run = maxID
// 	return
// }

// Create a new run
func CreateRun(run *Run) (err error) {
	if err = Config.DB.Create(run).Error; err != nil {
		return err
	}
	return nil
}

// Update a run
func UpdateRun(run *Run) (err error) {
	if err = Config.DB.Omit("entered").Save(run).First(run).Error; err != nil {
		return err
	}
	return nil
}

// Delete a run
func DeleteRun(run *Run) (err error) {
	// Retrieve the run first
	if err = Config.DB.First(run).Error; err != nil {
		return err
	}

	if err = Config.DB.Delete(run).Error; err != nil {
		return err
	}
	return nil
}
