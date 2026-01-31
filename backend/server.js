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

app.get("/api/config", async (req, res) => {
  try {
    // Appel HTTP vers le web-server (communication inter-container)
    const response = await fetch("http://web-server:8080/config.json");
    const config = await response.json();
    
    res.json({
      message: "Configuration récupérée depuis le web-server",
      config: config,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erreur lors de l'appel au web-server:", error);
    res.status(500).json({
      error: "Impossible de contacter le web-server",
      details: error.message,
    });
  }
});

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
