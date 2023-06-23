import { React, useState } from 'react'
import { Text, View, } from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const MyImagePicker = ({ navigation }) => {
    return (
        <>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <FontAwesome onPress={() => {
                        ImageCropPicker.openPicker({ multiple: true })
                            .then(images => {
                                navigation.navigate('MyMomentUploader', {
                                    'datas': images
                                })
                            })
                    }} name="upload" size={100} color="#110" />
                    <Text>UP</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <FontAwesome onPress={() => {
                        navigation.navigate('Calendar')
                    }} name="list-alt" size={100} color="#110" />
                    <Text>轨迹</Text>
                </View>
            </View>
        </>
    )
}
export default MyImagePicker