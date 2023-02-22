import mongoose from 'mongoose';

export interface ISocial {
  media: string;
  url: string;
  profileName: string;
  accountLink: string;
}

const socialSchema = new mongoose.Schema<ISocial>({
  media: String,
  url: String,
  profileName: String,
  accountLink: String,
});

export default socialSchema;
