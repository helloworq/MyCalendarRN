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
//import BestGameEver from './src/MyGame/MyGame';
import MyLogin from './src/login/MyLogin';
import BestGameEver from './src/utilCodeBlock/game/gameEngine/indexs'
//import GamePadController from './src/utilCodeBlock/game/gameEngine/GamePadController';
import MyShadow from './src/utilCodeBlock/MyShadow';
import MySkin from './src/MySkin';
import MyProfile from './src/MyProfile';
//import MyLocation from './src/MyLocation';
import MyMomentDetail from './src/MyMomentDetail';
import MyAnimation from './src/utilCodeBlock/animation/MyAnimation';
import MyVideo from './src/MyVideo';
import MyTab from './src/MyTab';
import MyFindOtherAppData from './src/MyFindOtherAppData';
import MyListView from './src/utilCodeBlock/MyListView'
import MyChart from './src/MyChart'
import MyDone from './src/MyDone'
import MyBing from './src/MyBing'
import MyAnimatedModal from './src/utilCodeBlock/animation/MyAnimatedModal';
import MyAnimatedMenu from './src/compoment/MyAnimatedMenu'
import MyPullDownCompoment from './src/compoment/MyPullDownCompoment';
import MyPullDownNative from './src/compoment/MyPullDownNative'
import MySqlite from './src/utilCodeBlock/MySqlite'
import MyProfileDetail from './src/MyProfileDetail'
import MySvg from './src/utilCodeBlock/svg/MySvg'
import MySvgChina from './src/utilCodeBlock/svg/MySvgChina'
import MySvgMap from './src/utilCodeBlock/svg/MySvgMap'
import MySvgChart from './src/utilCodeBlock/chart/MySvgChart';
import MySkiaChart from './src/utilCodeBlock/chart/MySkiaChart';

AppRegistry.registerComponent(appName, () => MySkiaChart);
