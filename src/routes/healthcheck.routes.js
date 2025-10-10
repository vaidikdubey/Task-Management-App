import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controllers.js";

const router = new Router;

router.route("/").get(healthCheck);

export default router;
