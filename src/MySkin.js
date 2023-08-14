import React, { useState, useContext } from 'react';
import {
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    FlatList,
} from "react-native";
import ImgStroage from "./storage/ImgStroage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import storage from './storage/MhkvStroge';
import { PreferencesContext } from "./MyPreferencesContext";

const MySkin = () => {
    const screenWidth = Dimensions.get("window").width
    const marginLeft = 5

    const imgWidth = (screenWidth - 10 * 3) / 2
    const { mode, setMode, theme, bgImg, setBgImg } = useContext(PreferencesContext)
    const [data, setData] = useState(Object.keys(ImgStroage))
    const [skin, setSkin] = useState(storage.getString('bgImg'))

    const keyExtractor = (item, index) => {
        return item.path + index
    }

    //未设置背景照片则使用纯黑纯白北京，否则使用纯白透明背景
    function renderRow(rowData) {
        return (
            <>
                <View>
                    <TouchableOpacity onPress={() => {
                        let current = rowData.item === skin ? '' : rowData.item
                        setSkin(current)
                        setBgImg(current)
                        storage.set('bgImg', current)
                    }}>
                        <View>
                            <ImageBackground
                                source={ImgStroage[rowData.item]}
                                borderRadius={10}
                                resizeMode='stretch'
                                elevation={10}
                                style={{
                                    width: imgWidth,
                                    height: 16 / 9 * imgWidth,
                                    marginBottom: 5,
                                    marginTop: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                {rowData.item === skin ? <MaterialCommunityIcons name={'check-bold'} size={100} /> : null}
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    return (
        <>
            <ImageBackground
                source={ImgStroage[bgImg]}
                resizeMode='stretch'
                style={{
                    flex: 1,
                    padding: 10,
                    flexDirection: 'column',
                    backgroundColor: theme.colors.totalOpacityBgColor
                }}>
                <FlatList
                    renderItem={renderRow}
                    data={data}
                    keyExtractor={keyExtractor}
                    numColumns={2}
                    horizontal={false}
                    columnWrapperStyle={{ justifyContent: 'space-around' }}
                />
            </ImageBackground>
        </>
    )
}

export default MySkin