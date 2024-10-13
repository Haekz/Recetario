import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myapp.example',
  appName: 'MyApps',
  webDir: 'www',
  plugins: {
    SQLite: {
      iosDatabaseLocation: 'Library/Databases'
    }
  }
};

export default config;
