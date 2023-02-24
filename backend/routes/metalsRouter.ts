import type { Router } from 'express';
import express from 'express';

import metalsController from '../controllers/metalsController';

const metalsRouter = express.Router() as Router;

/**
 * @desc Get metals data from www.metals-api.com
 * @route POST /api/metals
 * @access Private
 */
metalsRouter.route('/').post(metalsController.getMetals);

export default metalsRouter;
