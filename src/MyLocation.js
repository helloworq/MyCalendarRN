// import RNLocation from 'react-native-location';
// import React, { useState, } from 'react';
// import dayjs from 'dayjs';
// import {
//   View,
//   Button,
//   Text,
//   FlatList,
// } from "react-native";

// RNLocation.configure({
//   distanceFilter: 111, // Meters
//   desiredAccuracy: {
//     ios: "best",
//     android: "balancedPowerAccuracy"
//   },
//   // Android only
//   androidProvider: "auto",
//   interval: 5, // Milliseconds
//   fastestInterval: 10000, // Milliseconds
//   maxWaitTime: 5000, // Milliseconds
// })

// const MyLocation = () => {
//   const [data, setData] = useState([])

//   return (
//     <>
//       <FlatList
//         keyExtractor={(item, index) => {
//           return item.path + index
//         }}
//         numColumns={1}
//         horizontal={false}
//         data={data}
//         renderItem={(item) => {
//           return <View
//             style={{
//             }}
//           >
//             <Text style={{ color: 'black', fontSize: 30 }}>经度   {item.item.longitude}</Text>
//             <Text style={{ color: 'black', fontSize: 30 }}>纬度   {item.item.latitude}</Text>
//             <Text style={{ color: 'black', fontSize: 30, borderBottomWidth: 1 }}>时间   {dayjs(item.item.timestamp).format('YYYY-MM-DD HH:MM:ss')}</Text>
//           </View>
//         }}
//       />

//       <Button title='click' onPress={() => {
//         RNLocation.configure({
//           distanceFilter: 111, // Meters
//           desiredAccuracy: {
//             ios: "best",
//             android: "balancedPowerAccuracy"
//           },
//           // Android only
//           androidProvider: "auto",
//           interval: 5, // Milliseconds
//           fastestInterval: 10000, // Milliseconds
//           maxWaitTime: 5000, // Milliseconds
//         })

//         RNLocation.getLatestLocation()
//           .then(latestLocation => {
//             let temp = {}
//             temp['longitude'] = latestLocation.longitude
//             temp['latitude'] = latestLocation.latitude
//             temp['timestamp'] = latestLocation.timestamp

//             let newData = data.concat(temp)
//             setData(JSON.parse(JSON.stringify(newData)))
//           })
//       }} />
//     </>
//   )
// }


// RNLocation.requestPermission({
//   ios: "whenInUse",
//   android: {
//     detail: "coarse"
//   }
// }).then(granted => {
//   if (granted) {
//     this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
//       /* Example location returned
//       {
//         speed: -1,
//         longitude: -0.1337,
//         latitude: 51.50998,
//         accuracy: 5,
//         heading: -1,
//         altitude: 0,
//         altitudeAccuracy: -1
//         floor: 0
//         timestamp: 1446007304457.029,
//         fromMockProvider: false
//       }
//       */
//     })
//   }
// })


// export default MyLocation