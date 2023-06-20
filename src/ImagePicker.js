import { React, useState } from 'react'
import { PermissionsAndroid, Platform, Text, View, Button } from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker';
import MyMomentView from './MyMoment'

const MyImagePicker = ({ navigation }) => {
    return (
        <>
            <Button title='打开相册' onPress={() => {
                console.log("尝试开启")

                ImageCropPicker.openPicker({ multiple: true })
                    .then(images => {
                        navigation.navigate('MyMoment', {
                            'datas': images
                        })
                        //console.log(images)
                    })
            }} />
        </>
    )
}
export default MyImagePicker