import 'dotenv/config';

export default {
  expo: {
    name: 'Growlytics',
    slug: 'Growlytics',
    version: '1.0.0',
    orientation: 'portrait',
    newArchEnabled: true,
    userInterfaceStyle: 'light',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    android: {
        package: "com.amlan101.growlytics" 
      },
    extra: {
      "eas": {
        "projectId": "ac943fc9-44c9-49f9-917c-47983e351482"
      },
      ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY,
    },
  },
};
