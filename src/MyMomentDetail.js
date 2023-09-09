//import RNLocation from 'react-native-location';
import React, { useState, useEffect, useContext, useRef } from 'react';
import dayjs from 'dayjs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {
    View,
    Button,
    ImageBackground,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ScrollView,
    StyleSheet,
} from "react-native";
import Carousel, { Pagination } from 'react-native-snap-carousel';

const MyMomentDetail = () => {
    const rate = 16 / 9
    const screenWidth = Dimensions.get("window").width
    const imgWidth = (screenWidth - 10 * 3) / 2
    const width = 200
    const refs = useRef(null);

    const [activeIndex, setActiveIndex] = useState(1)
    const [data, setData] = useState([
        { "title": "aaa", "img": require('../img/a.jpg') },
        { "title": "aaa", "img": require('../img/b.jpg') },
        { "title": "aaa", "img": require('../img/c.jpg') },
    ])

    function _renderItem(item, index) {
        return (
            <View style={{ alignItems: 'center', justifyContent: "center", marginTop: 10 }}>
                <Image resizeMode='stretch' source={item.item.img} style={{ width: screenWidth - 50, height: width, borderRadius: 20 }} />
                <Text>{item.title}</Text>
            </View>
        );
    }

    return (
        <>
            <View style={{ alignItems: 'center', justifyContent: "center", marginTop: 10 }} >
                <Carousel
                    ref={refs}
                    data={data}
                    renderItem={_renderItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                    hasParallaxImages={true}
                    inactiveSlideOpacity={0.7}
                    loop={false}
                    onSnapToItem={(index) => setActiveIndex(index)}
                />
                <Pagination
                    dotsLength={data.length}
                    activeDotIndex={activeIndex}
                    dotColor={'red'}
                    inactiveDotColor={'green'}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                    carouselRef={refs}
                    tappableDots={!!refs}
                />

            </View>
        </>
    )
}

export default MyMomentDetail