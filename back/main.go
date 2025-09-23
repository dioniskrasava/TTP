package main

import (
	"backendGo/database"
	"backendGo/routes"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Подключаемся к базе данных
	database.Connect()

	r := gin.Default()

	// Настройка CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Content-Type", "Authorization"}
	r.Use(cors.New(config))

	// Настраиваем маршруты
	routes.SetupRoutes(r)

	// Запускаем сервер
	log.Println("Server starting on :8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
