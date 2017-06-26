# bart_buddy_mobile

A mobile client to interface with the bart_buddy server.

## Team

- Jonathon Bradshaw 
- Jackson Carter
- Greg Coffeng
- Vaggelis Sotiropoulos

## Usage

Bart-buddy is a new and exciting technology that allows users to see and plan their train routes according to real time data. 

## Requirements

- native-base ^2.1.5
- react 16.0.0-alpha.6
- react-native 0.44.3
- react-native-maps ^0.15.2
- react-native-menu ^0.21.

## Installation 

This project requires several steps to load, you must be running node 6.10.0 or earlier, asnd Xcode 7.8.0 or later.

- Clone the repo down 
- Cd into the route directory 

1.) brew install watchman

2.) npm install 

3.) sudo gem install cocoapods

4.) cd ios 

5.) pod install 

You must then open  bart_buddy_mobile.xcworkspace
6.) open the AppDelegate.h file 
	1.) add @import GoogleMaps; before @implementation AppDelegate

	2.)  In - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions, add [ GMSServices provideAPIKey:@“API_KEY_HERE”];
     -you msut have an API key from google Maps IOS SDK

7.) go into node_modules/react-native/Libraries/NativeAnimation/GET THE CORRECT NAME OF THIS FILE
	-once this file is open change 
8.) react-native run-ios
 
