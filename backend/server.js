const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello world!",
    timestamp: new Date().toISOString(),
    hostname: require("os").hostname(),
  });
});

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Backend listening on port ${PORT}`);
//   console.log(`Environment: ${process.env.NODE_ENV}`);
// });

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend listening on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server gracefully');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
