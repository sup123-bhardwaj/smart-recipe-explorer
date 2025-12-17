# Smart Recipe Explorer – MERN + GenAI Integration

This project is a MERN stack application that manages a list of recipes with search and filtering capabilities, and integrates a **free Generative AI API** to enhance user interaction. The AI can:

1. Suggest a recipe based on given ingredients  
2. Simplify / summarize the instructions of an existing recipe  

---

## 1. Objective & Problem Statement

The goal of this assignment is to demonstrate:

- Understanding of MERN stack development  
- Ability to integrate **free GenAI APIs**  
- Good code structure, naming, and documentation  
- Problem-solving and architectural reasoning  
- Minimum test coverage  

**Feature Summary:**

- Users can browse and filter recipe records  
- Search by cuisine, vegetarian type, time, tags, or ingredients  
- View detailed instructions and ingredients  
- Use built-in AI to:
  - Suggest new recipes from ingredients  
  - Summarize existing recipe instructions  

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB (local instance) |
| AI Provider | Hugging Face Inference API (free) |
| Testing | Jest + Supertest |
| Dev Tools | Nodemon, dotenv |

---

## 3. Project Structure

```

smart-recipe-explorer/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── data/
│   │   ├── tests/
│   │   ├── app.js
│   │   └── index.js
│   ├── package.json
│   ├── .env (ignored, not committed)
│   └── .env.example
│
└── frontend/
├── src/
├── index.html
├── vite.config.js
├── package.json

````

---

## 4. How to Run the Backend (Node + Express)

### Step 1: Install dependencies

```bash
cd backend
npm install
````

### Step 2: Create `.env` file

Create `backend/.env`:

```
PORT=5001
MONGO_URI=mongodb://localhost:27017/smart_recipe_explorer
HF_API_KEY=your_huggingface_api_key_here
HF_MODEL_ID=google/flan-t5-base
```

> Important: DO NOT commit `.env`.
> A template `.env.example` is provided.

### Step 3: Start MongoDB locally

Ensure MongoDB is running on your system:

```
mongodb://localhost:27017
```

### Step 4: Start backend server

```bash
npm run dev
```

Expected output:

```
MongoDB connected
Server running on port 5001
```

### Step 5: Seed sample data

```bash
curl -X POST http://localhost:5001/api/recipes/seed
```

---

## 5. How to Run the Frontend (React + Vite)

### Step 1: Install dependencies

```bash
cd frontend
npm install
```

### Step 2: Start dev server

```bash
npm run dev
```

Visit:

```
http://localhost:5173
```

---

## 6. AI API Integration (Hugging Face)

### Step 1: Create a Hugging Face token

1. Go to: [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Create a **Fine-grained** token
3. Enable **Inference → Make calls to Inference Providers**
4. Copy the token into `.env`

### Step 2: AI Endpoints

```
POST /api/ai/summarize
POST /api/ai/suggest
```

The backend builds a prompt and sends it to Hugging Face:

```
https://api-inference.huggingface.co/models/gpt2
```

---

## 7. API Documentation (Postman Usage)

### Get all recipes

```
GET /api/recipes
```

### Query parameters

```
?cuisine=Indian
?isVegetarian=true
?maxPrepTime=30
?ingredient=paneer
?tags=dinner,party
?search=rice
```

### Get recipe by ID

```
GET /api/recipes/:id
```

### AI: Summarize recipe instructions

```
POST /api/ai/summarize
Body:
{
  "name": "Paneer Butter Masala",
  "instructions": "Step 1... Step 2..."
}
```

### AI: Suggest recipe from ingredients

```
POST /api/ai/suggest
Body:
{
  "ingredients": ["paneer", "tomato", "cream"]
}
```

---

## 8. Testing (Backend)

Run tests:

```bash
cd backend
npm test
```

Test coverage includes:

* Recipe filtering
* Vegetarian + max prep time filtering
* AI route validation
* MongoDB connection
* Basic Express endpoint verification

Expected:

```
Test Suites: 2 passed
Tests: 4 passed
```

---

## 9. Architectural Thought Process

### Backend

* **Express** provides clean routing & middleware support
* **MongoDB + Mongoose** gives flexible schema for recipes
* **Controllers** keep logic isolated from routes
* Error handling is centralized

### Search Logic

Implemented using advanced MongoDB queries:

* Regex for matching ingredients, cuisine, text search
* `$lte` for preparation time
* `$all` for tags

### AI Integration Strategy

The Hugging Face API was selected because:

* 100% free
* No credit card required
* Easy REST interface
* Works well for summarization and simple generation tasks

### Frontend

* Component-based structure (`RecipeList`, `RecipeDetail`, `Filters`, `AiAssistantPanel`)
* React hooks for state management
* Vite for faster dev experience
* API client layer for clean request handling

### Tests

Minimal but meaningful tests added for:

* Recipe retrieval & filtering
* AI API validation

---

## 10. Additional Notes & Improvements

Future enhancements could include:

* User authentication
* Pagination or infinite scroll
* Nutrition-based suggestions
* Image-based recipe detection
* Dockerizing the entire stack

---

## 11. Conclusion

This project demonstrates complete end-to-end MERN integration, AI-powered features, proper backend architecture, frontend usability, and clean documentation. It aligns fully with the assignment requirements and showcases readiness for real-world MERN development tasks.

```
