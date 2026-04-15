import express from "express";
import { generateMuseumExhibition } from "../services/openaiService.js";
import { validateMuseumInput } from "../utils/validateInput.js";

const router = express.Router();

router.post("/generate-museum", async (req, res) => {
  const validation = validateMuseumInput(req.body);

  if (!validation.valid) {
    return res.status(validation.status).json({
      error: validation.message,
    });
  }

  try {
    const result = await generateMuseumExhibition(validation.data);
    return res.json(result);
  } catch (error) {
    return res.status(502).json({
      error:
        error instanceof Error
          ? error.message
          : "The AI museum service returned an unexpected error.",
    });
  }
});

export default router;
