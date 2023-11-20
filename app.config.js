// そもそも, app.config.jsとeas.jsonが似てて、、、違いがわからねーーんだよな。

// こうやって考えてみると、多分もうexpoを使うメリットはないのかもなー。自分のappがeject状態なのってもう知らなかったし、環境別にbuildを分けるとなると、もうexpoでできる枠を超えているよね、多分。。。
// だって、native codeがあるとそれを使っちゃうんだもん。。。bundleIdentifierなりなんなり。。。
import dotenv from 'dotenv';
// RNAPP_ENV ... staging, productionのみ、基本build時のみだからnnn
// 実際は、RNAPP_ENV=stagingとかRNAPP_ENV_VARIANT=productionみたいに実行していく。

// ここでdev用の環境変数を読み込んでいる。API_ENDPOINをここで読み込んでいる。
dotenv.config({
  path: `env/.env.${process.env.APP_VARIANT}`, // 基本は、APP_VARIANTを指定してstartする。
}); // RNAPP_ENV: dev, staging, production

const appEnvironment = process.env.APP_VARIANT; // dev, staging, production

const appName =
  appEnvironment === 'production' ? 'mekka' : appEnvironment === 'development' ? 'mekka_development' : 'mekka_staging';

const appId =
  appEnvironment === 'production'
    ? 'com.mekka.mekka'
    : appEnvironment === 'development'
    ? 'com.mekka.mekka.development'
    : 'com.mekka.mekka.staging';

const appIcon =
  appEnvironment === 'production'
    ? './assets/appLogos/mekka-logo.png'
    : appEnvironment === 'development'
    ? './assets/appLogos/mekka-logo-development.png'
    : './assets/appLogos/mekka-logo-staging.png';

const appApiEndpoint =
  appEnvironment === 'production'
    ? ''
    : appEnvironment === 'development'
    ? 'http://192.168.11.4:3500/api'
    : 'https://mekka-backend-staging.onrender.com';

const expoProjectId =
  appEnvironment === 'production'
    ? '4621db05-d60f-44b6-9cb7-fbdddd803e73'
    : appEnvironment === 'development'
    ? ''
    : '0fb796ba-f9ef-49a1-becd-02843817e0eb';

const appSplash =
  appEnvironment === 'production'
    ? {
        image: './assets/appLogos/mekka-logo.png',
        resizeMode: 'contain',
        backgroundColor: '#000000',
      }
    : appEnvironment === 'development'
    ? {
        image: './assets/appLogos/mekka-logo-development.png',
        resizeMode: 'contain',
        backgroundColor: '#FF0000',
      }
    : {
        image: './assets/appLogos/mekka-logo-development.png',
        resizeMode: 'contain',
        backgroundColor: '#FFFFFF',
      };

// localでのdev-clientでのbuildはこれを使う必要ないかね。。。
export default {
  name: appName,
  version: '1.0.0',
  orientation: 'portrait',
  icon: appIcon,
  userInterfaceStyle: 'automatic',
  splash: appSplash,
  ios: {
    bundleIdentifier: appId,
  },
  android: {
    package: appId,
  },
  extra: {
    eas: {
      projectId: expoProjectId,
    },
    apiEndpoint: appApiEndpoint,
  },
};

// APP_VARIANT=staging npx expo configで、それぞれの環境にかんする設定を見ることができる。

// build時はprofileを指定して
// npx eas build --platform ios --profile staging
// npx eas build --platform android --profile production
