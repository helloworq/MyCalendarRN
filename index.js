/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MyCalendar from './src/Calendar.js'
import MyTimelineListView from './src/MyListView'
import MyDynamicListView from './src/MyDynamicListView'

AppRegistry.registerComponent(appName, () => MyDynamicListView);
