package rssbot

import (
	"fmt"

	"github.com/mmcdole/gofeed"
)

// type RSSItem struct {
// 	Title       string `xml:"title"`
// 	Link        string `xml:"link"`
// 	Description string `xml:"description"`
// 	PubDate     string `xml:"pubDate"`
// }

// type RSSFeed struct {
// 	XMLName xml.Name  `xml:"channel"`
// 	Title   string    `xml:"title"`
// 	Link    string    `xml:"link"`
// 	Items   []RSSItem `xml:"item"`
// }

// func fetchRSSFeed(url string) (*RSSFeed, error) {
// 	resp, err := http.Get(url)
// 	if err != nil {
// 		return nil, err
// 	}
// 	defer resp.Body.Close()

// 	var feed RSSFeed
// 	decoder := xml.NewDecoder(resp.Body)
// 	if err := decoder.Decode(&feed); err != nil {
// 		return nil, err
// 	}

// 	return &feed, nil
// }

// rssbot fetches and prints the RSS feed items from a specified URL.
// It uses the gofeed library to parse the RSS feed and outputs the title, link,
// description, and published date for each item in the feed.
func rssbot(url string) {
	// url := "http://rss.art19.com/the-daily" // Replace with a real RSS feed URL

	fp := gofeed.NewParser()
	feed, err := fp.ParseURL(url)
	if err != nil {
		fmt.Println("Error fetching feed:", err)
		return
	}

	for _, item := range feed.Items {
		fmt.Printf("Title: %s\nLink: %s\nDescription: %s\nPublished: %s\n\n",
			item.Title, item.Link, item.Description, item.Published)
	}

	// // Example poll every 10 minutes
	// ticker := time.NewTicker(1 * time.Minute)
	// defer ticker.Stop()

	// for {
	// 	select {
	// 	case <-ticker.C:
	// 		feed, err = fp.ParseURL(url)
	// 		if err != nil {
	// 			fmt.Println("Error fetching feed:", err)
	// 			continue
	// 		}

	// 		for _, item := range feed.Items {
	// 			fmt.Printf("Title: %s\nLink: %s\nDescription: %s\nPublished: %s\n\n",
	// 				item.Title, item.Link, item.Description, item.Published)
	// 		}
	// 	}
	// }
}
