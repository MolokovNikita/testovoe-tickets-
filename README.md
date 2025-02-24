# Ticket Management API

API для управления обращениями с использованием **Express**, **Sequelize** и **TypeScript**.

---

## Возможности

- 📥 **Создание обращения**  
- 🛠️ **Взятие обращения в работу**  
- ✅ **Завершение обращения**  
- ❌ **Отмена обращения**  
- 📋 **Получение списка обращений**  
- 🔄 **Отмена всех обращений в статусе "В работе"**  

## Структура проекта

```
.
├── config/               # Конфигурационные файлы (база данных, окружение)
├── migrations/           # Миграции базы данных
├── models/               # Модели Sequelize
├── src/
│   ├── routers/          # Маршруты API
│   ├── controllers/      # Бизнес-логика приложения
│   ├── types/            # Типы TypeScript
│   └── index.ts          # Основной файл приложения
├── package.json          # Зависимости и скрипты
└── README.md             # Документация
```

## Установка и запуск

### Клонирование репозитория

`git clone https://github.com/your-username/your-repo.git](https://github.com/MolokovNikita/testovoe-tickets-`

### Установка зависимостей

`npm install`

### Настройка базы данных

Создайте базу данных и выполните миграции:
`npx sequelize-cli db:create`
`npx sequelize-cli db:migrate`

###  Запуск приложения

`npm run dev`
Сервер будет запущен на http://localhost:3000

### Технологии 🛠️

- **Node.js — среда выполнения JavaScript.**
- **Express — фреймворк для создания API.**
- **Sequelize — ORM для работы с базой данных.**
- **TypeScript — язык программирования для строгой типизации.**
- **PostgreSQL — реляционная база данных.**



