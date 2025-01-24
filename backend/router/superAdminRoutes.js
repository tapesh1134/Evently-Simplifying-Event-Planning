import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
    deleteEvent,
    fetchAllUsers
} from "../controllers/superAdminController.js"

const router = express.Router();

router.delete(
    "/event/delete/:id",
    isAuthenticated,
    isAuthorized("Super Admin"),
    deleteEvent
);

router.get(
    "/users/getall",
    isAuthenticated,
    isAuthorized("Super Admin"),
    fetchAllUsers
);

export default router;