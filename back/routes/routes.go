package routes

import (
	"backendGo/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		users := api.Group("/users")
		{
			users.GET("/", handlers.GetUsers)
			users.GET("/:id", handlers.GetUser)
			users.POST("/", handlers.CreateUser)
			users.PUT("/:id", handlers.UpdateUser)
			users.DELETE("/:id", handlers.DeleteUser)
		}
	}
}
