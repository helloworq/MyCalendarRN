/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import MyCalendar from './src/Calendar.js'
import MyTimelineListView from './src/utilCodeBlock/MyTimelineListView'
import MyDynamicListView from './src/MyDynamicListView'
import MyImageListView from './src/utilCodeBlock/MyImageListView'
import MyMomentUploader from './src/MyMomentUploader'
import ImageShow from './src/utilCodeBlock/ImageShow'
import Rooter from './src/Rooter';
import MyRWMoment from './src/utilCodeBlock/MyRWMoment';
import MyImagePicker from './src/ImagePicker';
import MyContritutionGraph from './src/MyContributionGraph';
import Layout from './src/utilCodeBlock/layout/Layout'
import MyProgressBar from './src/utilCodeBlock/MyProgressBar';
import MyAddTags from './src/utilCodeBlock/MyAddTags';

import Root from './src/router/Root'

AppRegistry.registerComponent(appName, () => MyAddTags);
