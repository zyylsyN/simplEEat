import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,  // RN提供的组件
    View,
    BackAndroid
} from 'react-native';

//let Dimensions = require('Dimensions');
let totalWidth = Dimensions.get('window').width;//宽
let totalHeight = Dimensions.get('window').height;//高

// 直接导出组件,不用写 module.exports=ConfirmDialog;了
export default class ConfirmDialog extends Component {
    render() {
        // onPress事件直接与父组件传递进来的属性挂接
        //numberOfLines 可显示3行
        // {'\r\n'}确 定 回车换行后跟着确定,为了克服Text组件不能垂直居中显示
        return (
            <View style={styles.confirmCont}>
                <View style={styles.dialogStyle}>
                    <Text style={styles.textPrompt}>
                        {this.props.promptToUser}
                    </Text>
                    <Text style={styles.yesButton}
                          onPress={this.props.userConfirmed}
                          numberOfLines={3}>
                        {'\r\n'}确 定
                    </Text>
                    <Text style={styles.cancelButton}
                          onPress={this.props.userCanceled}
                          numberOfLines={3}>
                        {'\r\n'}取 消
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    confirmCont: {  //全屏显示 半透明 可以看到之前的控件但是不能操作了
        position:'absolute',  //声明绝对定位
        top:0,
        width:totalWidth,
        height:totalHeight,
        backgroundColor:'rgba(52,52,52,0.5)'  //rgba  a0-1  其余都是十进制数
    },
    dialogStyle: {
        position:'absolute',
        left:totalWidth/10, // 定义Dilaog起点位置
        top:totalHeight*0.4,
        width:totalWidth*0.8,
        height:totalHeight*0.3,
        backgroundColor:'white'
    },
    textPrompt: {
        position:'absolute',
        top:10,
        left:10,
        fontSize:20,
        color:'black'
    },
    yesButton: {
        position:'absolute',
        bottom:10,
        left:10,
        width:totalWidth*0.35,
        height:totalHeight*0.12,
        backgroundColor:'grey',
        fontSize:20,
        color:'white',
        textAlign:'center'
    },
    cancelButton: {
        position:'absolute',
        bottom:10,
        right:10,
        width:totalWidth*0.35,
        height:totalHeight*0.12,
        backgroundColor:'grey',
        fontSize:20,
        color:'white',
        textAlign:'center'
    }
});