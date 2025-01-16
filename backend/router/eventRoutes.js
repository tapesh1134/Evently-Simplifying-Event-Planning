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
    isAuthorized("Auctioneer"),
    addNewEvent
  );
  
  router.get("/allitems", getAllEvents);
  
  router.get("/auction/:id", isAuthenticated, getEventDetails);
  
  router.get(
    "/myitems",
    isAuthenticated,
    isAuthorized("Auctioneer"),
    getMyEvent
  );
  
  router.delete(
    "/delete/:id",
    isAuthenticated,
    isAuthorized("Auctioneer"),
    removeFromEvent
  );
  
  export default router;