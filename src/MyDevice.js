import React from 'react';
import {
    View,
    Text,
} from "react-native";
import DeviceInfo from 'react-native-device-info';

const MyDevice = () => {
    return (
        <>
            <View style={{ alignItems: 'center' }}>
                <Text>手机信息</Text>
                <Text>getApplicationName   {DeviceInfo.getApplicationName()}</Text>
                <Text>getSystemName   {DeviceInfo.getSystemName()}</Text>
                <Text>getSystemVersion   {DeviceInfo.getSystemVersion()}</Text>
                <Text>getBrand   {DeviceInfo.getBrand()}</Text>
                <Text>getBundleId   {DeviceInfo.getBundleId()}</Text>
                <Text>getDeviceId   {DeviceInfo.getDeviceId()}</Text>
                <Text>getDeviceType   {DeviceInfo.getDeviceType()}</Text>
                <Text>getModel    {DeviceInfo.getModel()}</Text>
                <Text>getReadableVersion    {DeviceInfo.getReadableVersion()}</Text>
                <Text>getIpAddressSync    {DeviceInfo.getIpAddressSync()}</Text>
                <Text>getHardwareSync   {DeviceInfo.getHardwareSync()}</Text>
                <Text>getDisplaySync  {DeviceInfo.getDisplaySync()}</Text>
                <Text>getDeviceSync   {DeviceInfo.getDeviceSync()}</Text>
                <Text>getDeviceNameSync   {DeviceInfo.getDeviceNameSync()}</Text>
                <Text>getCarrierSync    {DeviceInfo.getCarrierSync()}</Text>
                <Text>getBuildIdSync     {DeviceInfo.getBuildIdSync()}</Text>
                <Text>getManufacturerSync    {DeviceInfo.getManufacturerSync()}</Text>
                <Text>getPreviewSdkIntSync    {DeviceInfo.getPreviewSdkIntSync()}</Text>
            </View>
        </>
    )
}

export default MyDevice