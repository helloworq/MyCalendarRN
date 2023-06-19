import { Button } from 'react-native'
import RNFS from 'react-native-fs'

var path = RNFS.DocumentDirectoryPath

const MyRW = () => {
    return (
        <>
            <Button onPress={() => { console.log(path) }} title='show default path' />

            <Button onPress={() => {
                RNFS.writeFile(path + '/data.json', 'hello react-native\n')
                    .then((success) => { console.log('已写入\n') })
                    .catch((err => { console.log(err.message) }))
            }} title='write' />

            <Button onPress={() => {
                RNFS.readFile(path + '/data.json')
                    .then((success) => { console.log('读取内容=>\n',success) })
                    .catch((err => { console.log(err.message) }))
            }} title='read' />

            <Button onPress={() => {
                RNFS.appendFile(path + '/data.json', 'bye react-native\n')
                    .then((success) => { console.log('已追加写入\n') })
                    .catch((err => { console.log(err.message) }))
            }} title='append' />
        </>
    )
}

export default MyRW