# MusicPlayerEPA

Prototype Repo for the Level 4 EPA Music Player application

## What is this?

This is the application developed for my end point assesment 2022.
The application is written using React Native, Redux, and Redux-Thunk, set up using Expo.

## Why Expo

Expo allows me to set up a react native application with minimal configuration, it also allows people to test the application out if they're unable to run an emulator on their local machine.

This does however come with drawbacks,
e.g. if continuing to use the Expo set up, it restricts what libraries I can use in the project.

## To Run

To first run a react native application, you need to install the following packages:

- [Node.js](https://nodejs.org/en/)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
    ```npm install --global expo-cli```

## Install Node Modules

Once you have installed the required libraries, run the following command within a terminal in the root of the project

```npm install```

This will install the dependencies used within this project, and this may take some time.

This may provide errors regarding node versions, in this instance, you should download and use the required version of node, following the node documentation.

### Once Node Modules are installed

Once you have installed the node modules, enter the following command

```expo start```

This will build the project, and open an EXPO browser window.
From here you can open the project in an Android Emulator using Android Studio, or scan the QR code in the browser/terminal with your android phone.
(This must be done on the same wifi)

If you are using an emulator, please drag some music files onto the emulator to add them to the devices Downloads folder, when selecting music files to add to the application, the app will direct you to the local folder system to select.

## How I tested

I tested this application on an android emulator with a resolution of 1080x2430: 440dpi, and running android 11 (API 30), which I recommend if running this application on your machine.

## IOS

Due to the nature of the expo file selection library, additional set up is required in XCode for this to work on IOS devices, as such this currently doesn't work on IOS, however given time, would be easy to configure at a later point.

## Points for Improvement

- More input validation and security measures around user input: I prioritised functionality over finer details, with more time, input validation and verification would be the first thing I would add.
- Alternative to Redux: Redux added a lot of complexity to the code, I feel with some research I could find something that would simplify this.
- Removal of Drop Down Multiselect, and creation of own UI library: I chose to use another's library for the drop down menu, however, this was a nightmare as     they didn't do exactly what I needed, and caused more problems and time consumption than creating my own. I would also rework the editing song properties component anyway, so a drop down might not be necessary.
- Music player only has 1 volume: loud. Probably less of a problem on a physical device.
- Cloud database and external logic layer would improve security and performance of the app. There is data manipulation and database logic in the front end of this application, which was great for fast development, however in the long run should be changed.
- Inproved UI: UI is simplistic, and not fully optimised for smaller screen sizes.
