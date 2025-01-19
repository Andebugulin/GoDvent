import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AdventOfBackend = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState({});

  const verifyChallenge = async (day) => {
    try {
      const checks = challengeChecks[day] || [];
      const results = await Promise.all(checks.map(check => check()));
      const passed = results.every(result => result);
      setVerificationStatus(prev => ({
        ...prev,
        [day]: { passed, timestamp: new Date().toISOString() }
      }));
      if (passed) {
        setChallenges(prev => 
          prev.map(c => c.day === day ? { ...c, completed: true } : c)
        );
      }
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  const challengeChecks = {
    1: [
      async () => {
        try {
          const res = await fetch('http://localhost:8080/health');
          return res.status === 200;
        } catch (error) {
          return false;
        }
      }
    ],
    2: [
      async () => {
        try {
          const res = await fetch('http://localhost:8080/api/users');
          return res.status === 200;
        } catch (error) {
          return false;
        }
      }
    ]
  };

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="relative">
          <SyntaxHighlighter
            style={coldarkDark}
            language={match[1]}
            PreTag="div"
            className="rounded !bg-gray-900/50 !my-4 !p-4"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className="bg-gray-800 rounded px-1" {...props}>
          {children}
        </code>
      );
    },
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mb-6 mt-8 text-green-400 border-b border-green-600 pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mb-4 mt-6 text-green-400">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mb-3 mt-5 text-green-400">
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="ml-4">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-green-500 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  };

  useEffect(() => {
    setChallenges([
      {
        day: 1,
        title: "Go Server Setup",
        description: "Create a basic Go HTTP server with health check endpoint",
        completed: false,
        tasks: [
          "Set up Go environment",
          "Create basic HTTP server",
          "Implement health check endpoint"
        ],
        readme: `# Day 1: Your First Go Backend Server

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
\`\`\`bash
# Create your project directory
mkdir -p backend/cmd/server
cd backend
go mod init advent-backend
\`\`\`

### 2. Basic Server Implementation
Create \`cmd/server/main.go\` with these requirements:
- Initialize a basic HTTP server
- Configure port via environment variables
- Implement graceful shutdown
- Add basic request logging

### 3. Health Check Endpoint
Implement \`/health\` endpoint that:
- Returns 200 OK status
- Includes basic server information
- Responds with JSON format

## 🧑‍💻 Code Template
\`\`\`go
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
\`\`\`

## ✅ Verification Criteria
Your implementation should:
1. Server starts successfully on port 8080 (or configured port)
2. Health check endpoint returns:
\`\`\`json
{
    "status": "ok",
    "version": "1.0.0",
    "timestamp": "2024-01-19T12:00:00Z"
}
\`\`\`
3. All requests are logged with timestamp and method

## 📖 Learning Resources
- [Go Documentation - net/http](https://golang.org/pkg/net/http/)
- [Go by Example - HTTP Server](https://gobyexample.com/http-servers)
- [Go Environment Variables](https://golang.org/pkg/os/#Getenv)

## 💡 Tips
- Use \`http.ListenAndServe\` for basic server setup
- Consider using \`gorilla/mux\` for routing (but not required)
- Test your endpoints using \`curl\` or Postman
- Remember to handle errors appropriately

## 🎓 What's Next
After completing this challenge, you'll have a basic Go server running. This will be the foundation for future challenges where we'll add:
- REST API endpoints
- Database integration
- Authentication
- And much more!

Need help? Check the Go documentation or ask in the community forum!`
      },
    ]);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-900 text-green-400 font-mono">
      <div className="container mx-auto p-8">
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Terminal size={32} />
            <h1 className="text-3xl font-bold">Advent of Backend</h1>
          </div>
          <div className="text-sm">
            Progress: {challenges.filter(c => c.completed).length}/{challenges.length} ⭐
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {challenges.map((challenge) => (
            <button
              key={challenge.day}
              onClick={() => setSelectedDay(challenge.day)}
              className={`p-4 border border-green-600 hover:bg-green-900/30 rounded transition-colors ${
                challenge.completed ? 'bg-green-900/20' : ''
              }`}
            >
              <div className="text-xl font-bold">Day {challenge.day}</div>
              <div className="text-sm mt-2 text-green-300">{challenge.title}</div>
              <div className="mt-2">
                {challenge.completed ? (
                  <CheckCircle className="text-green-400" />
                ) : (
                  <span>☆</span>
                )}
              </div>
            </button>
          ))}
        </div>

        {selectedDay && (
          <div className="mt-8">
            <div className="border border-green-600 rounded p-6 mb-8">
              <h2 className="text-2xl mb-4">Day {selectedDay} Challenge</h2>
              <div className="bg-black/50 p-4 rounded mb-4">
                <h3 className="text-xl mb-2">
                  {challenges.find(c => c.day === selectedDay)?.title}
                </h3>
                <p className="mb-4 text-green-300">
                  {challenges.find(c => c.day === selectedDay)?.description}
                </p>
                <div className="space-y-2">
                  {challenges.find(c => c.day === selectedDay)?.tasks.map((task, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span>•</span>
                      <span>{task}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => verifyChallenge(selectedDay)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white transition-colors"
              >
                Verify Implementation
              </button>

              {verificationStatus[selectedDay] && (
                <div className="mt-4 flex items-center gap-2">
                  {verificationStatus[selectedDay].passed ? (
                    <>
                      <CheckCircle className="text-green-400" />
                      <span>Challenge completed successfully!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-red-400" />
                      <span>Verification failed. Check your implementation.</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="border border-green-600 rounded p-6">
              <h2 className="text-2xl mb-4">Challenge Instructions</h2>
              <div className="prose prose-invert prose-green max-w-none">
                <ReactMarkdown components={components}>
                  {challenges.find(c => c.day === selectedDay)?.readme || 'Loading...'}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdventOfBackend;