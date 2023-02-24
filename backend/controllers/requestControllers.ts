import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import Settings from '../models/settingsModel';
import messages from '../utils/messages';

const requestControllers = {
  getItems: asyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
      const collectionResults = await Settings.find();
      try {
        if (collectionResults) {
          res.status(200).json(collectionResults);
        } else {
          res.status(204).json({ message: messages.noContent });
        }
      } catch (err: any) {
        res.status(401).send({
          message: err?.message || messages.unauthorized,
        });
      }
    }
  ),
};

export default requestControllers;
