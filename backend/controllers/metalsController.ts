import axios from 'axios';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';

dotenv.config();

const API_KEY = process.env.METALS_API;

const metalsController = {
  getMetals: asyncHandler(async (req, res) => {
    const reqBody = await req.body;
    const metals = await reqBody.selSymbols;

    try {
      const response = await axios({
        method: 'get',
        url: `https://www.metals-api.com/api/latest?access_key=${API_KEY}&base=USD&symbols=${metals}`,
      });
      res.status(200).json(response.data);
    } catch (err) {
      res.status(500).send({ message: err });
    }
  }),
};

export default metalsController;
