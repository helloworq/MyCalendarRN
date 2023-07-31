import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native"
import { MMKV } from 'react-native-mmkv'
import RNFS from 'react-native-fs'
const PATH = RNFS.ExternalDirectoryPath + '/MHKV/'

const storage = new MMKV({
  id: `user-own-storage`,
  path: `${PATH}/storage`,
})


export default storage