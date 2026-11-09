from fastapi import FastAPI

app = FastAPI(title="CommunityCoursesIT API")

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/v1/courses")
def get_courses():
    return {
        "items": [
            {"id": "123", "title": "Curso React Mínimo", "category": "frontend"}
        ],
        "total": 1,
        "limit": 20,
        "offset": 0
    }