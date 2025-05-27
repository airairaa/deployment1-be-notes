// backend/routes/NotesRoute.js
import express from "express";
import { getNotes, createNotes, deleteNotes, updateNotes } from "../controllers/NotesController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get('/notes', getNotes);
router.post('/notes', verifyToken, createNotes);
router.delete('/notes/:id', verifyToken, deleteNotes);
router.put('/notes/:id', verifyToken, updateNotes);

export default router;
