/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import MyCalendar from './src/Calendar.js'
import MyTimelineListView from './src/utilCodeBlock/MyTimelineListView'
import MyImageListView from './src/utilCodeBlock/MyImageListView'
import MyMomentUploader from './src/MyMomentUploader'
import ImageShow from './src/utilCodeBlock/ImageShow'
import Rooter from './src/Rooter';
import MyRWMoment from './src/utilCodeBlock/MyRWMoment';
import Layout from './src/utilCodeBlock/layout/Layout'
import MyAddTags from './src/MyAddTags';
import LayoutScrollHome from './src/utilCodeBlock/layout/LayoutScrollHome';
import MyTheme from './src/utilCodeBlock/themes/MyTheme'
import MyHomePage from './src/MyHomePage';
import MyStroge from './src/utilCodeBlock/stroge/MyStroge';
import Root from './src/router/Root'
import BestGameEver from './src/MyGame/MyGame';
import MyLogin from './src/login/MyLogin';

AppRegistry.registerComponent(appName, () => Rooter);
