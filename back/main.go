package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	// Создаем роутер Gin
	r := gin.Default()

	// Настройка CORS - КРИТИЧЕСКИ ВАЖНО для связи с фронтендом
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000") // URL твоего React-приложения
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Обработка preflight запросов (OPTIONS)
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Простой эндпоинт для проверки работы
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Сервер работает!",
		})
	})

	// Эндпоинт для получения данных (например, списка задач)
	r.GET("/api/tasks", func(c *gin.Context) {
		// Пока просто возвращаем статические данные
		tasks := []gin.H{
			{"id": 1, "title": "Изучить Go"},
			{"id": 2, "title": "Написать API"},
			{"id": 3, "title": "Связать с React"},
		}
		c.JSON(http.StatusOK, tasks)
	})

	// Эндпоинт для создания новой задачи (принимает JSON)
	r.POST("/api/tasks", func(c *gin.Context) {
		var newTask struct {
			Title string `json:"title" binding:"required"`
		}

		// Парсим JSON из тела запроса
		if err := c.BindJSON(&newTask); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Неверные данные"})
			return
		}

		// В реальном приложении здесь будем сохранять в базу данных
		c.JSON(http.StatusCreated, gin.H{
			"id":      4, // Временный ID
			"title":   newTask.Title,
			"message": "Задача создана!",
		})
	})

	// Запускаем сервер на порту 8080
	r.Run(":8080")
}
