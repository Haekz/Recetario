import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myapp.example',
  appName: 'MyApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SQLite: {
      iosDatabaseLocation: 'Library/Databases'
    }
  }
};

export default config;
