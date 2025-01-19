import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle, XCircle } from 'lucide-react';
import fs from 'fs';  // Add this for file system access
import path from 'path';  // Add this for resolving file paths

const AdventOfBackend = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState({});

  // Verify challenge implementation
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

  // Challenge verification checks
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
    // More checks for other days...
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
        readme: `... Your implementation should:
1. Server starts successfully on port 8080 (or configured port)
2. Health check endpoint returns:
json
{
    "status": "ok",
    "version": "1.0.0",
    "timestamp": "2024-01-19T12:00:00Z"
}

3. All requests are logged with timestamp and method

## 📖 Learning Resources
- [Go Documentation - net/http](https://golang.org/pkg/net/http/)
- [Go by Example - HTTP Server](https://gobyexample.com/http-servers)
- [Go Environment Variables](https://golang.org/pkg/os/#Getenv)

## 💡 Tips
- Use http.ListenAndServe for basic server setup
- Consider using gorilla/mux for routing (but not required)
- Test your endpoints using curl or Postman
- Remember to handle errors appropriately

## 🎓 What's Next
After completing this challenge, you'll have a basic Go server running. This will be the foundation for future challenges where we'll add:
- REST API endpoints
- Database integration
- Authentication
- And much more!

Need help? Check the Go documentation or ask in the community forum!...`  // Add this field
      },
      // ... other challenges
    ]);
  }, []);

  return (
<div className="w-full min-h-screen bg-gray-900 text-green-400 font-mono">
    <div className="container mx-auto p-8">
      <header className="flex items-center justify-between mb-12 max-w-full">
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
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border border-green-600 rounded p-6">
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
            </div>

<div className="border border-green-600 rounded p-6">
              <h2 className="text-2xl mb-4">Challenge Instructions</h2>
              <div className="bg-black/50 p-4 rounded prose prose-invert prose-green max-w-none">
                {/* We'll add the README content here */}
                <div dangerouslySetInnerHTML={{ 
                  __html: challenges.find(c => c.day === selectedDay)?.readme || 'Loading...' 
                }} />
              </div>
            </div>
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
        )}
      </div>
    </div>
  );
};
export default AdventOfBackend;