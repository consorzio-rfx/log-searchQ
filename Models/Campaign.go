package Models

import (
	"rewsrv-gin/Config"
)

type Campaign struct {
	ID           string
	CampaignName string
	Description  string `gorm:"type:varchar(300)"`
}

func (b *Campaign) TableName() string {
	return "campaigns"
}

// Get all campaigns
func GetAllCampaigns(campaigns *[]Campaign) (err error) {
	if err = Config.DB.Find(campaigns).Error; err != nil {
		return err
	}
	return nil
}
