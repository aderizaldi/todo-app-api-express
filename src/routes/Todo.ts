import { Router } from "express";
import * as TodoController from "$controllers/rest/TodoController";

const TodoRoutes = Router({ mergeParams: true }); // mergeParams = true -> to enable parsing query params

TodoRoutes.get("/", TodoController.getAll);
TodoRoutes.post("/", TodoController.create);
TodoRoutes.put("/:id", TodoController.update);
TodoRoutes.delete("/:id", TodoController.remove);
TodoRoutes.get("/:id", TodoController.getById);

export default TodoRoutes;
