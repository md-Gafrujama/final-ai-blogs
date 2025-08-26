import express from "express";
import {
  superAdminSignup,
  superAdminLogin,
  getCompanyWiseBlogCount,
} from "../controllers/superAdmin.controller.js";

const router = express.Router();

router.post("/signup", superAdminSignup);
router.post("/login", superAdminLogin);
router.get("/company-blogs", getCompanyWiseBlogCount);

export default router;
