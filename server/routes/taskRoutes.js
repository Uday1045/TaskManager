import express from "express";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks of the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized (if JWT is missing or invalid)
 */
router.get("/", getTasks);

router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
