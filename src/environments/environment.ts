// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: 'v1.0.0',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  apiUrl: 'api',
  appThemeName: 'Niku',
  appPurchaseUrl: 'https://niku.co',
  appHTMLIntegration: 'https://niku.co',
  appPreviewUrl: 'https://niku.co',

  appPreviewAngularUrl: 'https://niku.co',
  appPreviewDocsUrl: 'https://niku.co',
  appPreviewChangelogUrl: 'guide',
  appDemos: {
    demo1: {
      title: 'Niku',
      description: 'Niku Dashboard',
      published: true,
      thumbnail: '../assets/media/logos/favicon.ico',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
