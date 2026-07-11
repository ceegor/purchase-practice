# Практика: purchase CRUD

Монорепозиторий для задания по летней практике:

- `backend` - REST API на Spring Boot 3 и jOOQ.
- `frontend` - React-приложение с Consta UI.
- `database` - SQL-схема `purchase`.
- `postman` - коллекция для проверки REST-запросов.

## Что реализовано

- Схема PostgreSQL `purchase`.
- Таблицы `purchase.customer` и `purchase.lot`.
- CRUD REST API для контрагентов и лотов.
- Поиск, сортировка, добавление, редактирование и удаление в React.
- Навигация между экранами таблиц.

## Локальный запуск

1. Запустить PostgreSQL.

   Можно использовать локальный PostgreSQL на `localhost:5432` или Docker:

   ```powershell
   docker compose up -d
   ```

2. Настроить backend-подключение к БД.

   По умолчанию используются:

   ```text
   DB_URL=jdbc:postgresql://localhost:5432/postgres
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   ```

3. Запустить backend:

   ```powershell
   cd backend
   gradle bootRun
   ```

4. Запустить frontend:

   ```powershell
   cd frontend
   npm.cmd install
   npm.cmd run dev
   ```

5. Открыть приложение:

   ```text
   http://localhost:5173
   ```

## REST API

- `GET /api/customers?search=&sort=customerName,asc`
- `POST /api/customers`
- `PUT /api/customers/{customerCode}`
- `DELETE /api/customers/{customerCode}`
- `GET /api/lots?search=&sort=lotName,asc`
- `POST /api/lots`
- `PUT /api/lots`
- `DELETE /api/lots`

## Демо для куратора

1. В DBeaver показать схему `purchase`, таблицы `customer` и `lot`, а также тестовые данные.
2. В Postman импортировать коллекцию из папки `postman` и выполнить CRUD-запросы.
3. В браузере открыть React-приложение и показать списки, фильтрацию, сортировку, создание, изменение и удаление записей.
