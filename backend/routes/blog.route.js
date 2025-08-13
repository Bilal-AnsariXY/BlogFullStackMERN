import express from 'express';
import { createBlog, deleteBlog, getAllBlog, getSingleBlog, myBlogs, updateBlog } from '../controller/blog.controller.js';
import { isAdmin, isAuthnticated } from '../middleware/authUser.js';
const router = express.Router();

router.post('/create',isAuthnticated,isAdmin('admin'),createBlog);
router.delete('/delete/:id',isAuthnticated,isAdmin('admin'),deleteBlog);
router.get('/all-blogs',getAllBlog);
router.get('/single-blog/:id',isAuthnticated,getSingleBlog);
router.get('/myBlogs',isAuthnticated,isAdmin('admin'),myBlogs);
router.put('/update/:id',isAuthnticated,isAdmin('admin'),updateBlog);

export default router;