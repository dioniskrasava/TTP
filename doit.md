Шаг 4: Настройка PostgreSQL

    Установи PostgreSQL если еще не установлен

    Создай базу данных:

sql

CREATE DATABASE myapp;
CREATE USER myapp_user WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE myapp TO myapp_user;

    Обнови connection string в database/database.go