const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Middleware
app.use(cors())
app.get("/", (req, res, next) => {
  res.send("api default route")
})

// Authentication Service Layer -------------------------------------------
// app.use(proxyWithFallthrough("http://localhost:3002"));
// function proxyWithFallthrough(address) {
//   const reqNextMap = new WeakMap();
  
//   const proxyHandle = createProxyMiddleware({
//     target: address,
//     selfHandleResponse: true,
//     onProxyRes(proxyRes, req, res) {
//       // relay response headers
//       Object.keys(proxyRes.headers).forEach(function (key) {
//         res.append(key, proxyRes.headers[key]);
//       });

//       // forward request
//       if (proxyRes.statusCode === 200) {
//         console.log(proxyRes.statusCode, "user authenticated");
//         const next = reqNextMap.get(req);
//         return next();
//       }
//       else {
//         proxyRes.pipe(res);
//       }
//     },
//       onProxyReq: function (proxyReq, req, res) {
//         // relay request headers
//         Object.keys(req.headers).forEach(function (key) {
//           proxyReq.setHeader(key, req.headers[key]);
//         });
//       }
//   });
  
//   return function handle(req, res, next) {
//     reqNextMap.set(req, next);
//     return proxyHandle(req, res, next);
//   };
// }

// Product-Inventory Service Layer -----------------------------------------
const inventoryProxy = createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true });
app.get('/api/inventory', inventoryProxy);
app.use('/api/inventory/products', inventoryProxy);
app.use('/api/inventory/products/:productId', inventoryProxy);


// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`api gateway port: ${PORT}`))
