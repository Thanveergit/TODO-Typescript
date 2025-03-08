import { Router } from "express";
import * as todoController from "../controller/controller";
// import { getModeForResolutionAtIndex } from "typescript";
const router = Router();
router.get("/",todoController.home);
router.post("/add-task",todoController.addTask);
router.delete("/delete-task",todoController.deleteTask);
router.put('/update-task',todoController.updateTask);
router.put('/update-task-status',todoController.completeTask)
export default router