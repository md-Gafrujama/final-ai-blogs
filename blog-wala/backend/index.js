// import express from 'express';
// import cors from 'cors';
// import blogRouter from './lib/routes/blogRoute.js';
// import adminRouter from './lib/routes/adminRoute.js';
// import emailRouter from './lib/routes/emailRoute.js';
// import { ConnectDB } from './lib/config/db.js';

// const app = express();
// await ConnectDB();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api/blog', blogRouter);
// app.use('/api/admin', adminRouter);
// app.use('/api/email', emailRouter);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



import express from 'express';
import cors from 'cors';
import blogRouter from './lib/routes/blogRoute.js';
import adminRouter from './lib/routes/adminRoute.js';
import emailRouter from './lib/routes/emailRoute.js';
import { ConnectDB } from './lib/config/db.js';

const app = express();
await ConnectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add welcome route for the root path
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to AI Blogs API', 
    version: '1.0.0',
    endpoints: {
      blogs: '/api/blog',
      admin: '/api/admin', 
      email: '/api/email'
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/blog', blogRouter);
app.use('/api/admin', adminRouter);
app.use('/api/email', emailRouter);

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableRoutes: ['/api/blog', '/api/admin', '/api/email']
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});