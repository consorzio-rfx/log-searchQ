package Models

import (
	"rewsrv-gin/Config"
)

type RSSFeed struct {
	Id          uint   `json:"id"`
	Name        string `xml:"name"`
	Title       string `xml:"title"`
	Url         string `xml:"link"`
	Description string `xml:"description"`
}

// Get All RSS Feed
func GetAllRSSFeed(feed *[]RSSFeed) (err error) {
	if err = Config.DB.Find(feed).Error; err != nil {
		return err
	}
	return nil
}

// Create RSS Feed
func CreateRSSFeed(feed *RSSFeed) (err error) {
	if err = Config.DB.Create(feed).Error; err != nil {
		return err
	}
	return nil
}

// Get RSS Feed
func GetRSSFeed(feed *RSSFeed) (err error) {
	if err = Config.DB.Find(feed).Error; err != nil {
		return err
	}
	return nil
}

// Update RSS Feed
func UpdateRSSFeed(feed *RSSFeed) (err error) {
	Config.DB.Save(feed)
	return nil
}

// Delete RSS Feed
func DeleteRSSFeed(feed *RSSFeed) (err error) {
	Config.DB.Delete(feed)
	return nil
}

// Get RSS Feed ByID
func GetRSSFeedByID(feed *RSSFeed, id string) (err error) {
	if err = Config.DB.Where("id = ?", id).First(feed).Error; err != nil {
		return err
	}
	return nil
}

// Get RSS Feed ByTitle
func GetRSSFeedByTitle(feed *RSSFeed, title string) (err error) {
	if err = Config.DB.Where("title = ?", title).First(feed).Error; err != nil {
		return err
	}
	return nil
}
