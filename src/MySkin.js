import React, { useState, useContext } from 'react';
import {
    View,
    ImageBackground,
    TouchableOpacity,
    FlatList,
} from "react-native";
import ImgStroage from "./storage/ImgStroage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import storage from './storage/MhkvStroge';
import { PreferencesContext } from "./MyPreferencesContext";

const MySkin = () => {
    const imgWidth = 190
    const { mode, setMode, theme, bgImg } = useContext(PreferencesContext)
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
                        storage.set('bgImg', current)
                        if (current === null || current === undefined || current === '') {
                            storage.set('theme', 'light')
                        } else {
                            storage.set('theme', 'light-with-image')
                        }
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
                                    padding: 10,
                                    marginRight: 5,
                                    marginLeft: 5,
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
            <View>
                <View style={{ flexDirection: 'column', alignItems: 'center', padding: 5 }}>
                    <FlatList
                        renderItem={renderRow}
                        data={data}
                        keyExtractor={keyExtractor}
                        numColumns={2}
                        horizontal={false}
                    />
                </View>
            </View>
        </>
    )
}

export default MySkin