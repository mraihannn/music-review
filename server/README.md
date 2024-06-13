# Music Review API Documentation

This API is hosted at `api-v1.raix.online`.

## Endpoints :

List of available endpoints:

- `POST /api/users/register`
- `POST /api/users/login`
- `POST /api/users/login-google`
- `GET /api/music/search`
- `GET /api/music/recommendations`
- `GET /api/music/:spotifyId`
- `POST /api/reviews/:spotifyId`

## 1. POST /api/users/register

Description:

- Register user

Request:

- No headers required

_Response (200 - OK)_

```json
{
  "id": 7,
  "email": "user5@example.com"
}
```

&nbsp;

## 2. POST /api/users/login

Description:

- Login user

Request:

- No headers required

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE4MzAxOTc3fQ.pF2m6-dKErLFiPh0LUBQ9aJBtHXgH_B_nq8vt37m5N8"
}
```

_Response (401 - Unathorized)_

```json
{
  "message": "Email or password is incorrect"
}
```

&nbsp;

## 3. POST /api/users/login-google

Description:

- Login user

Request:

```json
{
  "google_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE4MzAxOTc3fQ.pF2m6-dKErLFiPh0LUBQ9aJBtHXgH_B_nq8vt37m5N8"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzE4MzAxOTc3fQ.pF2m6-dKErLFiPh0LUBQ9aJBtHXgH_B_nq8vt37m5N8"
}
```

&nbsp;

## 4. GET /api/music/search

Description:

- Get music by params

Request:

- headers:

```json
{
  "author": "Bearer {token from login}"
}
```

_Response (200 - OK)_

```json
{
  "tracks": {
    "href": "href to spotify",
    "item": [
      {
        "album": {},
        "artist": {},
        "name": "name of the artist"
      }
    ]
  }
}
```

&nbsp;

## 5. GET /api/music/recommendations

Description:

- Get music by recommendations from Gemini AI

Request:

- headers:

```json
{
  "author": "Bearer {token from login}"
}
```

_Response (200 - OK)_

```json
{
  "tracks": {
    "href": "href to spotify",
    "item": [
      {
        "album": {},
        "artist": {},
        "name": "name of the artist"
      }
    ]
  }
}
```

&nbsp;

## 6. GET /api/music/:spotifyId

Description:

- Get music by spotifyId

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
  "data": {
      {
        "album": {},
        "artist": {},
        "name": "name of the artist"
      }
  }
}
```

&nbsp;

## 7. POST /api/reviews/:spotifyId

Description:

- Create review

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
  "id": 16,
  "userId": 3,
  "spotifyId": "1ExfPZEiahqhLyajhybFeS",
  "rating": 7,
  "comment": "Kerenn",
  "updatedAt": "2024-06-13T18:20:36.762Z",
  "createdAt": "2024-06-13T18:20:36.762Z"
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
