import jwt from "jsonwebtoken";
import SuperAdmin from "../models/SuperAdminModel.js";
import Blog from "../models/BlogModel.js";
import Request from "../models/requestModel.js"


export const superAdminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await SuperAdmin.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: "Super admin already exists" });
    }

  
    await SuperAdmin.create({ email, password });

    res.json({ success: true, message: "Super admin registered successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const superAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const superAdmin = await SuperAdmin.findOne({ email });
    if (!superAdmin) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

  
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

// Get Blog Count Company-wise
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

export const getRequests = async(req , resp) => {
 
  try{
       const data = await Request.find();
       
       if(!data) {
           resp.json({message:"error while fetching"});
       }
       else {
        resp.json(data);
       }
  } catch{
          resp.send({error:error.message , message:"nhi ho paya kaam"});
  }
  
}

export const approveRequest = async(req , resp) => {
  try{
    const {id} = req.params;
    const {status} = req.body;

    const request = await Request.findByIdAndUpdate(id , {status} , {new:true});

    resp.json({success:true , message:"Request approved successfully" , request});
  } catch(error){
    resp.json({success:false , message:error.message});
  }
}
  
