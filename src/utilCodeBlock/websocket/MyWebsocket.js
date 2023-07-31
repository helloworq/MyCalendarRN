import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
//import { WebSocket } from 'react-native';

const MyWebsocket = () => {
    useEffect(() => {
        const ws = new WebSocket('ws://127.0.0.1:8888');

        ws.onopen = () => {
            console.log('WebSocket连接已建立');
            // 在这里可以发送初始化消息或执行其他操作
        };

        ws.onmessage = (event) => {
            console.log('收到消息:', event.data);
            // 处理收到的消息
        };

        ws.onerror = (error) => {
            console.error('WebSocket错误:', error);
            // 处理错误
        };

        ws.onclose = (event) => {
            console.log('WebSocket连接已关闭:', event.code, event.reason);
            // 处理连接关闭事件
        };
 
        // 当组件卸载时关闭WebSocket连接
        return () => {
            ws.close();
        };
    }, []);

    return (
        
        <View>
            <Text>qqqq</Text>
        </View>
    )
};

export default MyWebsocket;