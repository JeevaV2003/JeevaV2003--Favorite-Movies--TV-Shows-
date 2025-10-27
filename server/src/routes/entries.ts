import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { requireAuth } from '../middleware/authMiddleware';
import * as controller from '../controllers/entryController';

const router = Router();

// multer setup (store in /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(process.cwd(), 'uploads')),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.get('/', requireAuth, controller.getEntries);
router.post('/', requireAuth, upload.single('poster'), controller.createEntry);
router.get('/search', requireAuth, controller.searchEntries);
router.get('/:id', requireAuth, controller.getEntry);
router.put('/:id', requireAuth, upload.single('poster'), controller.updateEntry);
router.delete('/:id', requireAuth, controller.deleteEntry);

export default router;
