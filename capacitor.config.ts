import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myapp.example',
  appName: 'MyApps',
  webDir: 'www',
  server: {
    androidScheme: 'http', // Permite HTTP en lugar de HTTPS en Android
    cleartext: true, // Permitir contenido en texto claro (sin HTTPS)
    //allowNavigation: ['192.168.100.47'], // IPV Benjamin
    allowNavigation: ['192.168.1.119'] // Añadir la IP del servidor API permitido
  },
  plugins: {
    SQLite: {
      iosDatabaseLocation: 'Library/Databases'
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#ffffffff",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      iosSpinnerStyle: "small",
      spinnerColor: "#999999"
    },
    StatusBar: {
      backgroundColor: "#ffffffff",
      style: "DARK"
    }
  }
};

export default config;
