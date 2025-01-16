import {
    addNewEvent,
    getAllEvents,
    getEventDetails,
    getMyEvent,
    removeFromEvent,
  } from "../controllers/eventController.js";
  import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
  import express from "express";
  
  const router = express.Router();
  
  router.post(
    "/create",
    isAuthenticated,
    addNewEvent
  );
  
  router.get("/allitems", getAllEvents);
  
  router.get("/auction/:id", isAuthenticated, getEventDetails);
  
  router.get(
    "/myevents",
    isAuthenticated,
    getMyEvent
  );
  
  router.delete(
    "/delete/:id",
    isAuthenticated,
    removeFromEvent
  );
  
  export default router;