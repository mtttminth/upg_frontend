# Chat API Documentation

## Overview

The Chat API provides a RAG (Retrieval-Augmented Generation) powered chatbot that answers questions based on company documents (Resources, Releases). It supports real-time streaming via Server-Sent Events (SSE).

## Base URL

`{API_BASE_URL}/api/v1/user`

## Authentication

All endpoints require Bearer token authentication.

```
Authorization: Bearer {user_token}
```

---

## Endpoints

### 1. Streaming Chat (SSE)

Real-time streaming response using Server-Sent Events.

**Endpoint:** `POST /chat`

**Headers:**
| Header | Value | Required |
|--------|-------|----------|
| Authorization | Bearer {token} | Yes |
| Content-Type | application/json | Yes |
| Accept | text/event-stream | Recommended |

**Request Body:**

```json
{
  "message": "string (required, max 2000 chars)",
  "history": [
    {
      "role": "user | model",
      "content": "string"
    }
  ]
}
```

**Response:** `text/event-stream`

**SSE Event Format:**

Each event follows the SSE standard format:

```
data: {json_payload}\n\n
```

**Event Types:**

1. **Text Chunk** - Partial response text

   ```
   data: {"text": "To apply for leave, you need to..."}\n\n
   ```

2. **Completion** - Stream finished successfully

   ```
   data: [DONE]\n\n
   ```

3. **Error** - An error occurred
   ```
   data: {"error": "Error message here"}\n\n
   ```

**Example Request:**

```bash
curl -N -X POST https://api.example.com/api/v1/user/chat \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1Q..." \
  -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  -d '{
    "message": "How do I apply for leave?",
    "history": []
  }'
```

**Example Response Stream:**

```
data: {"text": "To apply"}

data: {"text": " for leave, you need to"}

data: {"text": " follow these steps:\n\n1."}

data: {"text": " Log into the HR portal\n2."}

data: {"text": " Navigate to Leave section"}

data: [DONE]

```

---

### 2. Simple Chat (JSON)

Non-streaming endpoint that returns the complete response. Useful for testing or when streaming is not supported.

**Endpoint:** `POST /chat/simple`

**Headers:**
| Header | Value | Required |
|--------|-------|----------|
| Authorization | Bearer {token} | Yes |
| Content-Type | application/json | Yes |

**Request Body:**

```json
{
  "message": "string (required, max 2000 chars)",
  "history": [
    {
      "role": "user | model",
      "content": "string"
    }
  ]
}
```

**Response:** `application/json`

```json
{
  "message": "To apply for leave, you need to follow these steps..."
}
```

**Example Request (Postman/cURL):**

```bash
curl -X POST https://api.example.com/api/v1/user/chat/simple \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1Q..." \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is the company leave policy?",
    "history": []
  }'
```

---

## Request Parameters

### message (required)

The user's question or message.

| Property   | Value           |
| ---------- | --------------- |
| Type       | string          |
| Max Length | 2000 characters |
| Required   | Yes             |

### history (optional)

Previous conversation messages for context. The API uses this to maintain conversation continuity.

| Property | Value |
| -------- | ----- |
| Type     | array |
| Required | No    |
| Default  | []    |

**History Item Structure:**
| Field | Type | Values | Description |
|-------|------|--------|-------------|
| role | string | `user` or `model` | Who sent the message |
| content | string | - | The message content |

**Example with History:**

```json
{
  "message": "Can I take more than 5 days?",
  "history": [
    { "role": "user", "content": "How do I apply for leave?" },
    {
      "role": "model",
      "content": "You can apply for leave through the HR portal..."
    }
  ]
}
```

---

## Error Responses

### HTTP Status Codes

| Status | Description                             |
| ------ | --------------------------------------- |
| 200    | Success                                 |
| 401    | Unauthorized - Invalid or missing token |
| 422    | Validation Error - Invalid request body |
| 500    | Server Error                            |

### Validation Error (422)

```json
{
  "message": "The message field is required.",
  "errors": {
    "message": ["The message field is required."]
  }
}
```

### Unauthorized (401)

```json
{
  "message": "Unauthenticated."
}
```

---

## Language Support

The chatbot supports both **English** and **Burmese (Myanmar)** languages. The response language typically matches the query language.

**English Query:**

```json
{ "message": "What is the leave policy?" }
```

**Burmese Query:**

```json
{ "message": "ခွင့်ယူခြင်း မူဝါဒက ဘာလဲ?" }
```

---

## Rate Limiting

Currently no rate limiting is applied. Consider implementing rate limiting for production:

- Recommended: 10 requests per minute per user
- Burst: 3 requests per second

---

## Security Notes

1. **RBAC Enforcement**: The chatbot only searches documents the authenticated user has access to (based on user/group assignments)
2. **No Cross-User Data Leakage**: Users cannot access documents they are not authorized to view
3. **Token Validation**: All requests require valid Sanctum bearer token

---

## Testing

### Test with cURL

**Streaming (SSE):**

```bash
# -N disables buffering for real-time output
curl -N -X POST http://localhost/api/v1/user/chat \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the leave policy?"}'
```

**Simple (JSON):**

```bash
curl -X POST http://localhost/api/v1/user/chat/simple \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the leave policy?"}'
```

### Test with Postman

1. Use the `/chat/simple` endpoint (Postman doesn't render SSE streams well)
2. Set Authorization header with Bearer token
3. Set Content-Type to application/json
4. Send POST request with message body
