package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	ID   uint   `json:"id" gorm:"primaryKey"`
	Name string `json:"name" gorm:"not null"`
	Age  int    `json:"age" gorm:"not null"`
}
