import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { createEntrySchema, updateEntrySchema } from '../validators/entryValidator';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export async function createEntry(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const parsed = createEntrySchema.parse(req.body);
    const posterUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const entry = await prisma.entry.create({ data: { ...parsed, posterUrl, userId: req.userId! } });
    res.status(201).json(entry);
  } catch (err) { next(err); }
}

export async function getEntries(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const limit = Math.min(Number(req.query.limit || 20), 100);
    const cursor = req.query.cursor ? { id: Number(req.query.cursor) } : undefined;
    const entries = await prisma.entry.findMany({
      where: { userId: req.userId },
      take: limit,
      ...(cursor ? { cursor, skip: 1 } : {}),
      orderBy: { id: 'desc' }
    });
    const nextCursor = entries.length ? entries[entries.length - 1].id : null;
    res.json({ data: entries, nextCursor });
  } catch (err) { next(err); }
}

export async function getEntry(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const entry = await prisma.entry.findUnique({ where: { id } });
    if (!entry) return res.status(404).json({ message: 'Not found' });
    if (entry.userId !== req.userId) return res.status(403).json({ message: 'Forbidden' });
    res.json(entry);
  } catch (err) { next(err); }
}

export async function updateEntry(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const parsed = updateEntrySchema.parse(req.body);
    const existing = await prisma.entry.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Not found' });
    if (existing.userId !== req.userId) return res.status(403).json({ message: 'Forbidden' });
    const posterUrl = req.file ? `/uploads/${req.file.filename}` : existing.posterUrl;
    const updated = await prisma.entry.update({ where: { id }, data: { ...parsed, posterUrl } });
    res.json(updated);
  } catch (err) { next(err); }
}

export async function deleteEntry(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const existing = await prisma.entry.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ message: 'Not found' });
    if (existing.userId !== req.userId) return res.status(403).json({ message: 'Forbidden' });
    await prisma.entry.delete({ where: { id } });
    res.status(204).send();
  } catch (err) { next(err); }
}

export async function searchEntries(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const q = String(req.query.q || '').trim();
    const type = String(req.query.type || '').toUpperCase();
    const where: any = { userId: req.userId };
    if (q) {
            where.OR = [
        { title: { contains: q } },
        { director: { contains: q } },
        { location: { contains: q } },
        { notes: { contains: q } },
      ];
    }
    if (type === 'MOVIE' || type === 'TV_SHOW') where.type = type;
    const entries = await prisma.entry.findMany({ where, orderBy: { id: 'desc' }, take: 100 });
    res.json({ data: entries });
  } catch (err) { next(err); }
}
