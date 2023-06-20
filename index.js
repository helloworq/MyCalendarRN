/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import MyCalendar from './src/Calendar.js'
import MyTimelineListView from './src/MyListView'
import MyDynamicListView from './src/MyDynamicListView'
import MyImageListView from './src/MyImageListView'
import MyMomentView from './src/MyMoment'
import ImageShow from './src/ImageShow'
import MyRW from './src/ReadWriteFile';
import TimelineCalendar from './src/TimelineCalendar'
import Rooter from './src/Rooter';
import MyRWMoment from './src/WriteMoment';
import MyImagePicker from './src/ImagePicker';

import Root from './src/router/Root'

AppRegistry.registerComponent(appName, () => MyImagePicker);
