import { React, useState } from 'react'
import { PermissionsAndroid, Platform, Text, View, Button } from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker';
import MyMomentUploader from './MyMomentUploader'

const MyImagePicker = ({ navigation }) => {
    return (
        <>
            <Button title='打开相册' onPress={() => {
                console.log("尝试开启")

                ImageCropPicker.openPicker({ multiple: true })
                    .then(images => {
                        navigation.navigate('MyMomentUploader', {
                            'datas': images
                        })
                        //console.log(images)
                    })
            }} />

            <Button title='打开日历' onPress={() => {
                navigation.navigate('Calendar')
            }} />
        </>
    )
}
export default MyImagePicker