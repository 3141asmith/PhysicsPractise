# Physics Forge Mobile

Capacitor 8 projects for Android and iOS, bundling the existing public website for offline study. App ID: `uk.co.physicsforge.app`.

## What Is Included

Public A Level and GCSE content, notes, diagrams, local progress, challenges, themes and pets. The app uses a separate on-device storage area from the website. Existing website progress is not imported. Clearing app storage or uninstalling can remove progress. Remote links and email require connectivity and suitable apps.

This build does not include a Node server, school accounts, Microsoft sign-in, teacher gradebook or cross-device syncing. Those require a separately hosted backend and native authentication integration. No student database, secrets or server files are bundled.

## Android

Use Node 24, JDK 21, Android SDK platform 36 and the build tools requested by Gradle. Install dependencies with `npm ci` at the repository root, then run `npm run mobile:sync`.

Set `JAVA_HOME` to the JDK and `ANDROID_HOME` to your SDK. From `mobile/android`, run `./gradlew assembleDebug` (Windows: `./gradlew.bat assembleDebug`). The signed test APK is `app/build/outputs/apk/debug/app-debug.apk`.

The delivered copy is `artifacts/mobile/Physics-Forge-debug.apk`. Transfer it to Android and open it; Android may ask you to allow installation from the particular browser or file manager. This is a debug-signed sideload build, not a Play Store release. Verify on real devices before classroom rollout. Android 7/API 24 or newer is the generated minimum; a current Android System WebView is recommended.

For Play Store distribution, use a school-owned release signing key, keep it outside Git, configure release signing, increment versionCode and build an Android App Bundle (`bundleRelease`). Do not distribute a debug build as a production release.

## iPhone And iPad

The iOS project is in `mobile/ios/App/App.xcodeproj`. On a Mac with a compatible Xcode, run `npm ci`, `npm run mobile:sync`, then `npm run mobile:ios`. Resolve Swift packages, select your Apple development team and configure signing. Test on an iPhone/iPad before archiving for TestFlight or App Store submission. Windows cannot compile or sign the iOS app. An APK cannot be installed on an iPhone.

## Maintenance

After changing website content run `npm run mobile:sync` and rebuild. Updating the website alone does not update an already installed app. Native projects and icons are checked in; copied web assets and build products are ignored. Do not change the app ID or local origin after release without a progress migration plan.

`node tests/mobile-browser-tests.cjs` checks the bundle using the workspace Playwright/Edge setup. It is a web-content test, not a substitute for native device testing. `tools/mobile-icons.cjs` reproduces the existing PF logo using the workspace canvas tooling; running it is optional because generated icons are included.

GitHub Pages now publishes an explicit public-file bundle from `tools/build-mobile.cjs --web`, excluding native projects and private files.
