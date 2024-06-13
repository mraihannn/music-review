[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=15153623&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

# Rental Transportation API Documentation

This API is hosted at `api-v1.raix.online`.

## Endpoints :

List of available endpoints:

- `GET /pub/transportation`
- `GET /pub/transportation/:id`
- `GET /pub/types/`
- `GET /transportation`
- `GET /types`

## 1. GET /pub/transportation

Description:

- Get all transportation from database

Request:

- No headers required

Query Parameters:

- `search`: A keyword to search for in the transportation names.
- `sort`: A field to sort by. Prefix with `-` for descending order.
- `filter`: A typeId to filter by.
- `page[size]`: Number of items per page.
- `page[number]`: Page number to retrieve.

### Example Request:

GET /pub/transportation?search=Mclaren&sort=-price&filter=1&page[size]=10&page[number]=1

_Response (200 - OK)_

```json
{
  "page": 1,
  "data": [
    {
      "id": 1,
      "name": "Mclaren",
      "description": "mclaren lu warna apa bos",
      "imgUrl": "awdawdawdawd",
      "location": "Jakarta",
      "price": 1000000,
      "typeId": 1,
      "authorId": 1,
      "createdAt": "2024-05-30T09:13:03.846Z",
      "updatedAt": "2024-05-30T09:13:03.846Z",
      "User": {
        "username": null,
        "email": "user1@example.com",
        "phoneNumber": null,
        "address": null,
        "role": "Admin"
      }
    }
  ],
  "totalData": 1,
  "totalPage": 1,
  "dataPerPage": 10
}
```

&nbsp;

## 2. GET /pub/transportation/:id

Description:

- Get transportation by id

Request:

- No headers required

_Response (200 - OK)_

```json
{
  "transportation": {
    "id": 1,
    "name": "Mclaren",
    "description": "mclaren lu warna apa bos",
    "imgUrl": "awdawdawdawd",
    "location": "Jakarta",
    "price": 1000000,
    "typeId": 1,
    "authorId": 1,
    "createdAt": "2024-05-30T09:13:03.846Z",
    "updatedAt": "2024-05-30T09:13:03.846Z",
    "User": {
      "username": null,
      "email": "user1@example.com",
      "phoneNumber": null,
      "address": null
    }
  }
}
```

_Response (404 - Not Found)_

```json
{
  "error": "Transportation not found"
}
```

&nbsp;

## 3. GET /pub/types

Description:

- Get all types from database

Request:

- headers:
- No headers required

_Response (200 - OK)_

```json
{
  "types": [
    {
      "id": 2,
      "name": "Sport",
      "createdAt": "2024-05-27T14:05:08.210Z",
      "updatedAt": "2024-05-27T14:05:08.210Z"
    },
    {
      "id": 3,
      "name": "Classic",
      "createdAt": "2024-05-27T14:21:56.808Z",
      "updatedAt": "2024-05-27T14:21:56.808Z"
    }
  ]
}
```

&nbsp;

## 4. GET /transportation

Description:

- Get all transportation from database

Request:

- headers:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJTdGFmZiIsImlhdCI6MTcxNjkxMjEwOX0.3znXEYIHL3ilx5_-9OjzNhf-B8iUhizRE2hj9Jtjfo0"
}
```

_Response (200 - OK)_

```json
{
  "transportations": [
    {
      "id": 5,
      "name": "Mclaren",
      "description": "mclaren lu warna apa bos",
      "imgUrl": "awdawdawdawd",
      "location": "Jakarta",
      "price": 1000000,
      "typeId": 2,
      "authorId": 1,
      "createdAt": "2024-05-27T14:34:26.905Z",
      "updatedAt": "2024-05-27T14:34:26.905Z",
      "User": {
        "username": "admin",
        "email": "admin@example.com",
        "phoneNumber": "08123123123",
        "address": "here NO 2"
      }
    },
    {
      "id": 6,
      "name": "Mclaren",
      "description": "mclaren lu warna apa bos",
      "imgUrl": "awdawdawdawd",
      "location": "Jakarta",
      "price": 1000000,
      "typeId": 2,
      "authorId": 1,
      "createdAt": "2024-05-27T14:51:19.656Z",
      "updatedAt": "2024-05-27T14:51:19.656Z",
      "User": {
        "username": "admin",
        "email": "admin@example.com",
        "phoneNumber": "08123123123",
        "address": "here NO 2"
      }
    }
  ]
}
```

&nbsp;

## 5. GET /types

Description:

- Get all types from database

Request:

- headers:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJTdGFmZiIsImlhdCI6MTcxNjkxMjEwOX0.3znXEYIHL3ilx5_-9OjzNhf-B8iUhizRE2hj9Jtjfo0"
}
```

_Response (200 - OK)_

```json
{
  "types": [
    {
      "id": 2,
      "name": "Sport",
      "createdAt": "2024-05-27T14:05:08.210Z",
      "updatedAt": "2024-05-27T14:05:08.210Z"
    },
    {
      "id": 3,
      "name": "Classic",
      "createdAt": "2024-05-27T14:21:56.808Z",
      "updatedAt": "2024-05-27T14:21:56.808Z"
    }
  ]
}
```

&nbsp;

## 6. GET /transportation/:id

Description:

- Get transportation by id

Request:

- headers:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJTdGFmZiIsImlhdCI6MTcxNjkxMjEwOX0.3znXEYIHL3ilx5_-9OjzNhf-B8iUhizRE2hj9Jtjfo0"
}
```

_Response (200 - OK)_

```json
{
  "transportation": {
    "id": 5,
    "name": "Mclaren",
    "description": "mclaren lu warna apa bos",
    "imgUrl": "awdawdawdawd",
    "location": "Jakarta",
    "price": 1000000,
    "typeId": 2,
    "authorId": 1,
    "createdAt": "2024-05-27T14:34:26.905Z",
    "updatedAt": "2024-05-27T14:34:26.905Z",
    "User": {
      "username": "admin",
      "email": "admin@example.com",
      "phoneNumber": "08123123123",
      "address": "here NO 2"
    }
  }
}
```

_Response (404 - Not Found)_

```json
{
  "error": "Transportation not found"
}
```

&nbsp;

## 7. DELETE /transportation/:id

Description:

- Delete transportation by id

Request:

- headers:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJTdGFmZiIsImlhdCI6MTcxNjkxMjEwOX0.3znXEYIHL3ilx5_-9OjzNhf-B8iUhizRE2hj9Jtjfo0"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Transportation deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "error": "Transportation not found"
}
```

&nbsp;

## 8. DELETE /types/:id

Description:

- Delete type by id

Request:

- headers:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJTdGFmZiIsImlhdCI6MTcxNjkxMjEwOX0.3znXEYIHL3ilx5_-9OjzNhf-B8iUhizRE2hj9Jtjfo0"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "Type deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "error": "Type not found"
}
```

&nbsp;

## 9. PUT /transportation/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJTdGFmZiIsImlhdCI6MTcxNjkxMjEwOX0.3znXEYIHL3ilx5_-9OjzNhf-B8iUhizRE2hj9Jtjfo0"
}
```

- body:

```json
{
  "name": "Mclaren",
  "description": "mclaren lu warna apa bos",
  "imgUrl": "awdawdawdawd",
  "location": "Jakarta",
  "price": 1000000,
  "authorId": 1,
  "typeId": 1
}
```

_Response (200 - Success)_

```json
{
  "name": "Mclaren",
  "description": "mclaren lu warna apa bos",
  "imgUrl": "awdawdawdawd",
  "location": "Jakarta",
  "price": 1000000,
  "authorId": 1,
  "typeId": 1
}
```

_Response (400 - Bad Request)_

```json
{
  "error": "Transportation not found"
}
OR
{
  "error": "Author or Type not found"
}
OR
{
    "errors": [
        "Name cannot be empty",
        "Description cannot be empty",
        "Price must be greater than 0"
    ]
}
```

&nbsp;

## 10. PUT /types/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJTdGFmZiIsImlhdCI6MTcxNjkxMjEwOX0.3znXEYIHL3ilx5_-9OjzNhf-B8iUhizRE2hj9Jtjfo0"
}
```

- body:

```json
{
  "name": "Sport"
}
```

_Response (200 - Success)_

```json
{
  "name": "Sport"
}
```

_Response (400 - Bad Request)_

```json
{
  "error": "Type not found"
}
OR
{
    "errors": [
        "Name cannot be empty",
    ]
}
```

&nbsp;

## 11. POST /transportation

Request:

- headers:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJTdGFmZiIsImlhdCI6MTcxNjkxMjEwOX0.3znXEYIHL3ilx5_-9OjzNhf-B8iUhizRE2hj9Jtjfo0"
}
```

- body:

```json
{
  "name": "Mclaren",
  "description": "mclaren lu warna apa bos",
  "imgUrl": "awdawdawdawd",
  "location": "Jakarta",
  "price": 1000000,
  "authorId": 1,
  "typeId": 1
}
```

_Response (200 - Success)_

```json
{
  "name": "Mclaren",
  "description": "mclaren lu warna apa bos",
  "imgUrl": "awdawdawdawd",
  "location": "Jakarta",
  "price": 1000000,
  "authorId": 1,
  "typeId": 1
}
```

_Response (400 - Bad Request)_

```json
{
  "error": "Author or Type not found"
}
OR
{
    "errors": [
        "Name cannot be empty",
    ]
}
```

&nbsp;

## 12. POST /types

Request:

- headers:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJTdGFmZiIsImlhdCI6MTcxNjkxMjEwOX0.3znXEYIHL3ilx5_-9OjzNhf-B8iUhizRE2hj9Jtjfo0"
}
```

- body:

```json
{
  "name": "Sport"
}
```

_Response (200 - Success)_

```json
{
  "name": "Sport"
}
```

_Response (400 - Bad Request)_

```json
{
  "errors": ["Name cannot be empty"]
}
```

&nbsp;

&nbsp;

## 13. POST /add-user

Request:

- headers:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJTdGFmZiIsImlhdCI6MTcxNjkxMjEwOX0.3znXEYIHL3ilx5_-9OjzNhf-B8iUhizRE2hj9Jtjfo0"
}
```

- body:

```json
{
  "email": "user1@example.com",
  "password": "12345678",
  "phoneNumber": "08123123123",
  "address": "Jakarta",
  "username": "user1"
}
```

_Response (200 - Success)_

```json
{
  "user": {
    "username": "user1",
    "email": "user1@example.com"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "errors": ["Email format is incorrect", "Email cannot be empty"]
}
OR
{
    "errors": [
        "Email already exists"
    ]
}
```

&nbsp;

## 14. POST /login

Request:

- headers:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJTdGFmZiIsImlhdCI6MTcxNjkxMjEwOX0.3znXEYIHL3ilx5_-9OjzNhf-B8iUhizRE2hj9Jtjfo0"
}
```

- body:

```json
{
  "email": "user1@example.com",
  "password": "12345678"
}
```

_Response (200 - Success)_

```json
{
  "message": "Login success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNjgyNzEyMX0.dZqvQHD4CirbV0vHpciECRu4BJ-4hzcpfulpGWcZHRI"
}
```

_Response (400 - Bad Request)_

```json
{
    "error": "User not found"
}
OR
{
    "error": "Email or password is incorrect"
}
OR
{
    "error": "Email and password are required"
}
```

&nbsp;

## 15. PATCH /transportation/:id

Request:

- headers:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJvbGUiOiJTdGFmZiIsImlhdCI6MTcxNjkxMjEwOX0.3znXEYIHL3ilx5_-9OjzNhf-B8iUhizRE2hj9Jtjfo0"
}
```

- body:

```json
{
  "imgUrl": file
}
```

_Response (200 - Success)_

```json
{
  "message": "Login success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNjgyNzEyMX0.dZqvQHD4CirbV0vHpciECRu4BJ-4hzcpfulpGWcZHRI"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "File is required"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
