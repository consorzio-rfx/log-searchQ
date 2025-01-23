package Controllers

import (
	"net/http"

	"rewsrv-gin/Models"

	"github.com/gin-gonic/gin"
)

// Get RSS Feed
func GetRSSFeed(c *gin.Context) {
	var rssfeed Models.RSSFeed
	err := Models.GetRSSFeed(&rssfeed)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, rssfeed)
	}
}

// Get RSS Feed ByID
func GetRSSFeedByID(c *gin.Context) {
	id := c.Params.ByName("id")
	var rssfeed Models.RSSFeed
	err := Models.GetRSSFeedByID(&rssfeed, id)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, rssfeed)
	}
}

// Get RSS Feed ByTitle
func GetRSSFeedByTitle(c *gin.Context) {
	title := c.Params.ByName("title")
	var rssfeed Models.RSSFeed
	err := Models.GetRSSFeedByTitle(&rssfeed, title)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, rssfeed)
	}
}

// Create RSS Feed
func CreateRSSFeed(c *gin.Context) {
	var rssfeed Models.RSSFeed
	c.BindJSON(&rssfeed)
	err := Models.CreateRSSFeed(&rssfeed)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, rssfeed)
	}
}

// Update RSS Feed
func UpdateRSSFeed(c *gin.Context) {
	var rssfeed Models.RSSFeed
	id := c.Params.ByName("id")
	if err := Models.GetRSSFeedByID(&rssfeed, id); err != nil {
		c.JSON(http.StatusNotFound, rssfeed)
	}
	c.BindJSON(&rssfeed)
	err := Models.UpdateRSSFeed(&rssfeed)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, rssfeed)
	}
}

// Delete RSS Feed
func DeleteRSSFeed(c *gin.Context) {
	var rssfeed Models.RSSFeed
	id := c.Params.ByName("id")
	if err := Models.GetRSSFeedByID(&rssfeed, id); err != nil {
		c.JSON(http.StatusNotFound, rssfeed)
	}
	err := Models.DeleteRSSFeed(&rssfeed)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, gin.H{"id" + id: "is deleted"})
	}
}

// Get All RSS Feed
func GetAllRSSFeed(c *gin.Context) {
	var rssfeed []Models.RSSFeed
	err := Models.GetAllRSSFeed(&rssfeed)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.JSON(http.StatusOK, rssfeed)
	}
}

// Create RSS Feed
func CreateRSSFeedXML(c *gin.Context) {
	var rssfeed Models.RSSFeed
	c.BindXML(&rssfeed)
	err := Models.CreateRSSFeed(&rssfeed)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.XML(http.StatusOK, rssfeed)
	}
}

// Update RSS Feed
func UpdateRSSFeedXML(c *gin.Context) {
	var rssfeed Models.RSSFeed
	id := c.Params.ByName("id")
	if err := Models.GetRSSFeedByID(&rssfeed, id); err != nil {
		c.XML(http.StatusNotFound, rssfeed)
	}
	c.BindXML(&rssfeed)
	err := Models.UpdateRSSFeed(&rssfeed)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.XML(http.StatusOK, rssfeed)
	}
}

// Delete RSS Feed
func DeleteRSSFeedXML(c *gin.Context) {
	var rssfeed Models.RSSFeed
	id := c.Params.ByName("id")
	if err := Models.GetRSSFeedByID(&rssfeed, id); err != nil {
		c.XML(http.StatusNotFound, rssfeed)
	}
	err := Models.DeleteRSSFeed(&rssfeed)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.XML(http.StatusOK, gin.H{"id" + id: "is deleted"})
	}
}

// Get All RSS Feed
func GetAllRSSFeedXML(c *gin.Context) {
	var rssfeed []Models.RSSFeed
	err := Models.GetAllRSSFeed(&rssfeed)
	if err != nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.XML(http.StatusOK, rssfeed)
	}
}

// Get RSS Feed ByTitle
func GetRSSFeedByTitleXML(c *gin.Context) {
	title := c.Params.ByName("title")
	var rssfeed Models.RSSFeed
	err := Models.GetRSSFeedByTitle(&rssfeed, title)
	if err != nil {
		c.XML(http.StatusNotFound, rssfeed)
	} else {
		c.XML(http.StatusOK, rssfeed)
	}
}

// Get RSS Feed ByID
func GetRSSFeedByIDXML(c *gin.Context) {
	id := c.Params.ByName("id")
	var rssfeed Models.RSSFeed
	err := Models.GetRSSFeedByID(&rssfeed, id)
	if err != nil {
		c.XML(http.StatusNotFound, rssfeed)
	} else {
		c.XML(http.StatusOK, rssfeed)
	}
}

// Get RSS Feed
func GetRSSFeedXML(c *gin.Context) {
	var rssfeed Models.RSSFeed
	err := Models.GetRSSFeed(&rssfeed)
	if err != nil {
		c.XML(http.StatusNotFound, rssfeed)
	} else {
		c.XML(http.StatusOK, rssfeed)
	}
}
