import jwt from 'jsonwebtoken'
import Blog from '../models/BlogModel.js';
import Comment from '../models/CommentModel.js';
import EmailModel from '../models/EmailModel.js';

export const adminLogin = async (req, res)=>{
    try {
        const {email, password} = req.body;

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Invalid Credentials"})
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({success: true, token})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const { company } = req.query; // Get company from query parameter
        let filter = {};
        
        if (company) {
            filter.company = company;
        }
        
        const blogs = await Blog.find(filter).sort({createdAt: -1}).limit(5);
        res.json({success: true, blogs, company: company || 'all'})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getAllComments = async (req, res) =>{
    try {
        const comments = await Comment.find({}).populate("blog").sort({createdAt: -1})
        res.json({success: true, comments})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getDashboard = async (req, res) =>{
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({isPublished: false});

        // Dynamic company blog counts
        const companyCounts = await Blog.aggregate([
          { $group: { _id: "$company", count: { $sum: 1 } } }
        ]);
        const companyBlogCounts = {};
        companyCounts.forEach(item => {
          companyBlogCounts[item._id] = item.count;
        });

        const dashboardData = {
            blogs, comments, drafts, recentBlogs,
            companyBlogCounts
        };
        res.json({success: true, dashboardData});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const deleteCommentById = async (req, res) =>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndDelete(id);
        res.json({success: true, message:"Comment deleted successfully" })
    } catch (error) {
       res.json({success: false, message: error.message}) 
    }
}

export const approveCommentById = async (req, res) =>{
    try {
        const {id} = req.body;
        await Comment.findByIdAndUpdate(id, {isApproved: true});
        res.json({success: true, message:"Comment approved successfully" })
    } catch (error) {
       res.json({success: false, message: error.message}) 
    }
}

export const getAllEmails = async (req, res) => {
    try {
        const emails = await EmailModel.find({}).sort({date: -1});
        res.json({success: true, emails})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const deleteEmailById = async (req, res) => {
    try {
        const {id} = req.query;
        await EmailModel.findByIdAndDelete(id);
        res.json({success: true, msg: "Email deleted successfully" })
    } catch (error) {
       res.json({success: false, message: error.message}) 
    }
}