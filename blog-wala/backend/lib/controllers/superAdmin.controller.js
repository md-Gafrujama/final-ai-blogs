import jwt from "jsonwebtoken";
import SuperAdmin from "../models/SuperAdminModel.js";
import Blog from "../models/BlogModel.js";

// ✅ Super Admin Signup
export const superAdminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if already exists
    const existing = await SuperAdmin.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "Super admin already exists" });
    }

    // Store plain password (⚠️ not secure, just for demo)
    await SuperAdmin.create({ email, password });

    res.json({ success: true, message: "Super admin registered successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Super Admin Login
export const superAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Compare plain password
    if (password !== superAdmin.password) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { email: superAdmin.email, role: "superadmin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ success: true, token,  role:"super-admin" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get Blog Count Company-wise
export const getCompanyWiseBlogCount = async (req, res) => {
  try {
    const companyCounts = await Blog.aggregate([
      { $group: { _id: "$company", count: { $sum: 1 } } },
    ]);

    const result = {};
    companyCounts.forEach((item) => {
      result[item._id] = item.count;
    });

    res.json({ success: true, companyBlogCounts: result });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
