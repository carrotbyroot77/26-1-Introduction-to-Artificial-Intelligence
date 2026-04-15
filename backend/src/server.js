import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import museumRoutes from "./routes/museumRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || true,
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    demoMode: !process.env.OPENAI_API_KEY,
  });
});

app.use("/api", museumRoutes);

app.use((err, _req, res, _next) => {
  console.error("Unhandled server error:", err?.message ?? "Unknown error");

  res.status(500).json({
    error: "Internal server error.",
  });
});

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`AI Strange Museum backend listening on port ${PORT}`);
  });
}

export default app;
