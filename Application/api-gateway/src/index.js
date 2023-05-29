const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Authentication Service Layer
const authProxy = createProxyMiddleware({
  target: 'http://localhost:3002',
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
  target: 'http://localhost:3001',
  changeOrigin: true,
});
// Front-End Layer
const frontEndProxy = createProxyMiddleware({
  target: 'http://localhost:3003',
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