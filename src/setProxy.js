// A simple CORS proxy server for development
// Save this file as cors-proxy-server.js and run with Node.js

const express = require("express")
const cors = require("cors")
const { createProxyMiddleware } = require("http-proxy-middleware")
const morgan = require("morgan") // For logging requests

const app = express()

// Enable request logging
app.use(morgan("dev"))

// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
)

// Add a test route to verify the server is running
app.get("/test", (req, res) => {
  res.json({ message: "CORS proxy server is running correctly" })
})

// Proxy all requests to the target API
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://kimelia-api.onrender.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/api", // No path rewriting needed in this case
    },
    onProxyReq: (proxyReq, req, res) => {
      // Log the outgoing request
      console.log(`Proxying ${req.method} request to: ${proxyReq.path}`)

      // If it's a POST request with a body, log it
      if (req.method === "POST" && req.body) {
        console.log("Request body:", req.body)
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      // Add CORS headers to the proxied response
      proxyRes.headers["Access-Control-Allow-Origin"] = "*"
      proxyRes.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
      proxyRes.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization, X-Requested-With"

      // Log the response status
      console.log(`Received ${proxyRes.statusCode} response from API`)
    },
    // Handle proxy errors
    onError: (err, req, res) => {
      console.error("Proxy error:", err)
      res.status(500).json({ error: "Proxy error", message: err.message })
    },
  }),
)

// Parse JSON and URL-encoded bodies for the proxy
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Start the server
const PORT =  3000
app.listen(PORT, () => {
  console.log(`CORS Proxy server running on port ${PORT}`)
  console.log(`Use http://localhost:${PORT}/api/... to access the API`)
  console.log(`Test the server at: http://localhost:${PORT}/test`)
})

