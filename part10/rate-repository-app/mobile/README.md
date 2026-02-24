# RateRepository App

## Local development on Linux in Android device

1. You will need a locally running Android device emulator.
   Follow the `Linux` steps [here](https://docs.expo.dev/workflow/android-studio-emulator/).

---

Some notes:

- No need to install a JDK if you already have one installed. Check with `update-alternatives --list java`.
- Set up an emulated device with API version 34. Seems like version 35 `VanillaIceCream` does not work with Expo. See this [thread](https://stackoverflow.com/questions/78356263/error-exception-in-hostobjectget-for-prop-nativeunimoduleproxy-android).

---

2. Run `npm install` to install the dependencies
3. Run `npm start` to start the Expo server and press `a` to load the app onto the emulated Android device
