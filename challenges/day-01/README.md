# Day 1: Your First Go Backend Server

## 🎯 Overview
Welcome to your first challenge! Today you'll build a foundational HTTP server in Go that will serve as the backbone for all future challenges. You'll learn core Go concepts while creating a production-ready server structure.

## 📚 Concepts You'll Learn
- Go project structure and modules
- Basic Go syntax and packages
- HTTP server implementation
- Environment variable configuration
- Basic error handling
- Logging middleware

## 🔧 Technical Requirements
- Go 1.21 or higher
- Any code editor (VSCode recommended)
- Terminal access

## 📋 Tasks

### 1. Project Setup
```bash
# Create your project directory
mkdir -p backend/cmd/server
cd backend
go mod init advent-backend
```

### 2. Basic Server Implementation
Create `cmd/server/main.go` with these requirements:
- [ ] Initialize a basic HTTP server
- [ ] Configure port via environment variables
- [ ] Implement graceful shutdown
- [ ] Add basic request logging

### 3. Health Check Endpoint
Implement `/health` endpoint that:
- [ ] Returns 200 OK status
- [ ] Includes basic server information
- [ ] Responds with JSON format

## 🧑‍💻 Code Template
```go
package main

import (
    "log"
    "net/http"
    "os"
    // Add more imports as needed
)

func main() {
    // TODO: Configure server port
    
    // TODO: Initialize router/mux
    
    // TODO: Add health check endpoint
    
    // TODO: Start server
}

// TODO: Implement health check handler

// TODO: Implement logging middleware
```

## ✅ Verification Criteria
Your implementation should:
1. Server starts successfully on port 8080 (or configured port)
2. Health check endpoint returns:
```json
{
    "status": "ok",
    "version": "1.0.0",
    "timestamp": "2024-01-19T12:00:00Z"
}
```
3. All requests are logged with timestamp and method

## 📖 Learning Resources
- [Go Documentation - net/http](https://golang.org/pkg/net/http/)
- [Go by Example - HTTP Server](https://gobyexample.com/http-servers)
- [Go Environment Variables](https://golang.org/pkg/os/#Getenv)

## 💡 Tips
- Use `http.ListenAndServe` for basic server setup
- Consider using `gorilla/mux` for routing (but not required)
- Test your endpoints using `curl` or Postman
- Remember to handle errors appropriately

## 🎓 What's Next
After completing this challenge, you'll have a basic Go server running. This will be the foundation for future challenges where we'll add:
- REST API endpoints
- Database integration
- Authentication
- And much more!

Need help? Check the Go documentation or ask in the community forum!