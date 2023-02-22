import mongoose from 'mongoose';

import type { ISocial } from './socialModel';
import socialSchema from './socialModel';

type TCopyRight = {
  link: string;
  label: string;
};

type TSiteBranding = {
  brand: string;
  mark: 'registered' | 'trademark';
  logo: string;
};

type TDeveloper = {
  name: string;
  subName: string;
  url: string;
};

interface ISettings {
  siteName: string;
  copyRight: TCopyRight;
  siteBranding: TSiteBranding;
  social: Array<ISocial>;
  developer: TDeveloper;
  siteData: Record<string, unknown>;
}

const settingsSchema = new mongoose.Schema<ISettings>(
  {
    siteName: String,
    copyRight: {
      link: {
        type: String,
        set: (val: string) => val.toLowerCase(),
      },
      label: String,
    },
    siteBranding: {
      brand: String,
      mark: {
        type: String,
        enum: ['registered', 'trademark'],
      },
      logo: String,
    },
    social: [socialSchema],
    developer: {
      name: String,
      subName: String,
      url: {
        type: String,
        set: (val: string) => val.toLowerCase(),
      },
    },
    siteData: Object,
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Setting', settingsSchema, 'app-settings');

export default Settings;
