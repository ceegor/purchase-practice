# Purchase Practice

Учебное приложение для управления контрагентами и лотами.

## Технологии

- PostgreSQL
- Java 17, Spring Boot 3, jOOQ, Gradle
- React, Vite, Consta UI
- Postman

## Структура проекта

- `database` — SQL-скрипты схемы `purchase`.
- `backend` — REST API для контрагентов и лотов.
- `frontend` — пользовательский интерфейс React.
- `postman` — коллекция запросов для проверки API.

## Подготовка базы данных

1. Запустить локальный PostgreSQL.
2. Открыть DBeaver и подключиться к базе `postgres`.
3. Выполнить скрипт `database/schema.sql`.
4. Если таблицы были созданы раньше, дополнительно выполнить
   `database/add_lot_primary_key.sql`.

Скрипты создают схему `purchase` и таблицы:

- `purchase.customer`;
- `purchase.lot` с составным ключом `(lot_name, customer_code)`.

## Запуск backend

В командной строке Windows:

```cmd
cd backend
set "DB_PASSWORD=пароль_от_PostgreSQL"
gradlew.bat bootRun
```

Дополнительные переменные подключения:

```text
DB_URL=jdbc:postgresql://localhost:5432/postgres
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

После запуска API доступно по адресу `http://localhost:8080`.

## Запуск frontend

В отдельной командной строке:

```cmd
cd frontend
npm.cmd install
npm.cmd run dev
```

Приложение доступно по адресу `http://localhost:5173`.

## REST API

### Контрагенты

- `GET /api/customers`
- `GET /api/customers?search=CUST&sortBy=customerCode&sortDirection=desc`
- `POST /api/customers`
- `PUT /api/customers/{customerCode}`
- `DELETE /api/customers/{customerCode}`

### Лоты

- `GET /api/lots`
- `GET /api/lots?search=RUB&sortBy=price&sortDirection=desc`
- `POST /api/lots`
- `PUT /api/lots?lotName=...&customerCode=...`
- `DELETE /api/lots?lotName=...&customerCode=...`

## Проверка в Postman

Импортировать файл:

```text
postman/purchase-practice.postman_collection.json
```

Запросы в папках коллекции выполнять сверху вниз. Коллекция содержит проверки
ожидаемых HTTP-статусов и автоматически создаёт тестовые значения для CRUD.

## Сценарий демонстрации

1. В DBeaver показать схему `purchase`, структуру и содержимое таблиц.
2. В Postman выполнить получение, поиск, создание, изменение и удаление записей.
3. В браузере показать обе вкладки React-приложения, поиск, сортировку и CRUD.
