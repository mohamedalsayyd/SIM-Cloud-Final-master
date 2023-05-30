require("dotenv").config()
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();


const ACCOUNTS_SERVICE_URL = process.env.ACCOUNTS_SERVICE_URL || "http://accounts-service:3002"
const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL || "http://inventory-service:3001"
const FRONTEND_URL = process.env.FRONTEND_URL || "http://front-end:3003"


// Authentication Service Layer
const authProxy = createProxyMiddleware({
  target: ACCOUNTS_SERVICE_URL,
  selfHandleResponse: true,
  onProxyRes(proxyRes, req, res) {
    // Relay response headers
    Object.keys(proxyRes.headers).forEach(key => {
      res.append(key, proxyRes.headers[key]);
    });

    // Forward request and check response headers
    if (proxyRes.statusCode === 200) {
      const next = req.next;
      return next();
    }
    else if (proxyRes.statusCode === 302) {
      res.redirect(proxyRes.headers.location);
    }
    else {
      proxyRes.pipe(res);
    }
  },
  onProxyReq(proxyReq, req) {
    // Relay request headers
    Object.keys(req.headers).forEach(key => {
      proxyReq.setHeader(key, req.headers[key]);
    });
  },
});

// Product-Inventory Service Layer
const inventoryProxy = createProxyMiddleware({
  target: INVENTORY_SERVICE_URL,
  changeOrigin: true,
});

// Front-End Layer
const frontEndProxy = createProxyMiddleware({
  target: FRONTEND_URL,
  changeOrigin: true,
});

// Middleware
app.use(cors());
app.use(authProxy);
app.use('/api/inventory', inventoryProxy);
app.use(frontEndProxy);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`API Gateway On: ${PORT}`);
});