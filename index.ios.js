import React, { Component } from 'react';

import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation';
import Advisories from './components/advisories'
import Main from './main'

const bart_buddy_mobile = StackNavigator({
  Home: { screen: Main },
  Advisories: { screen: Advisories }
});

AppRegistry.registerComponent('bart_buddy_mobile', () => bart_buddy_mobile);