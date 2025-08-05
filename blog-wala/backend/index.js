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

app.use('/api/blog', blogRouter);
app.use('/api/admin', adminRouter);
app.use('/api/email', emailRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});