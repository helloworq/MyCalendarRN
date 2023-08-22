import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native"
import storage from "./stroge";

const MyStroge = () => {
    const user = {
        theme: 'dark',
    }
    const tag = {
        tag: 'check',//default tag
        select: false,
        name: 'name',
    }
    const moment = {
        time: "15:56:07",
        date: "2023-06-28",
        datetime: "2023-06-28 15:56:07",
        moment: "1111",
        tags: [
            [
                "#上班打卡",
                "alarm-check",
                true
            ]
        ]
    }

    // 使用key来保存数据（key-only）。这些数据一般是全局独有的，需要谨慎单独处理的数据
    // 批量数据请使用key和id来保存(key-id)，具体请往后看
    // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
    return (
        <>
            <Button title='保存' onPress={() => {
                let data = {
                    from: 'some other site',
                    userid: 'some userid',
                    token: 'some token',
                }
                let datas = []
                for (let index = 0; index < 200000; index++) {
                    datas.push(data)
                }

                storage.save({
                    key: 'loginState', // 注意:请不要在key中使用_下划线符号!
                    data: datas,

                    // 如果不指定过期时间，则会使用defaultExpires参数
                    // 如果设为null，则永不过期
                    expires: 1000 * 3600,
                });

            }} />
            <Button title='读取' onPress={() => {
                // 读取
                storage
                    .load({
                        key: 'loginState',
                    })
                    .then(ret => {
                        console.log(ret.length);
                    })
                    .catch(err => {
                        //如果没有找到数据且没有sync方法，
                        console.warn(err.message);
                    });
            }} />
            <Button title='清除' onPress={() => {
                // 读取
                storage
                    .remove({
                        key: 'loginState',
                    })
            }} />
        </>
    )
}

export default MyStroge