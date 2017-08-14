import React, { Component } from 'react'
import Storage from '../../common/Storage'
import {getHttp} from '../../common/HttpBean'

import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image
} from 'react-native';


// let screenHeight=Dimensions.get('window').height;

export default class WaiterCheck extends Component {
  constructor(props, context){
    super(props,context);
    this.state={};
    this.state.sumprice=0;
    this.state.dishList=null;
    this.state.weixin=null;
    this.state.zhifubao=null;
  }
  
  //------获取结账信息---------------
  getCheckInfo(orderid){
    let self = this;
    getHttp('check/getCheckInfo?orderid='+orderid,function(response){
      response.json().then(function(rs){
          let arr=[];
          let sumprice=0;
          let qrcodes = rs.pop();
          for(let key in rs){
            arr.push(<View key={key} style={[Layout.row]}>
              <Text style={[Layout.column,Layout.columnText]}>{rs[key].dishname}</Text>
              <Text style={[Layout.column,Layout.columnText]}>{rs[key].num}</Text>
              <Text style={[Layout.column,Layout.columnText]}>{rs[key].price}</Text>
              </View>);
            sumprice += rs[key].price*rs[key].num;
          }
          self.setState({dishList:arr});
          self.setState({sumprice:sumprice});
          self.setState({weixin:"http://192.168.1.157:3000"+qrcodes[0].weixin});
          self.setState({zhifubao:"http://192.168.1.157:3000"+qrcodes[0].zhifubao});
      })
    })
  }

  componentDidMount(){
    this.getCheckInfo(this.props.orderid);
  }
  finishOrder(orderid){
      let self = this;
    getHttp('check/finishOrder?orderid='+orderid,function(response){
        response.json().then(function(rs){
          alert(rs);
          if(rs==1){
            
          }
      })
    })
  }

  render() {
   
    return (
      <ScrollView alwaysBounceVertical={true}>
          <View style={[Layout.body]}>
          <Text style={[Layout.columnText]}>总价:{this.state.sumprice}</Text>
          <Text style={[Layout.textBtn]} onPress={()=>{this.finishOrder(this.props.orderid);}}>结单</Text>
            {this.state.dishList}
            <Text style={[Layout.columnText]}>微信二维码</Text>
            <Image source={{uri:this.state.weixin}} style={{width:200,height:200}}/>
            <Text style={[Layout.columnText]}>支付宝二维码</Text>
            <Image source={{uri:this.state.zhifubao}} style={{width:200,height:200}}/>
            
           </View>
          </ScrollView>
    );
  }
}
    

let Layout = StyleSheet.create({
  body:{
      backgroundColor:'yellow',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'flex-start',
      flexWrap:'wrap',
    },
  input:{
    borderWidth: 1,
      marginLeft: 5,
      paddingLeft: 5,
      borderColor: '#CCC',
      borderRadius: 4,
      width:'80%',
      margin:6,
      backgroundColor:'#fff',
      height:36,
  },
  textBtn:{
    backgroundColor:'green',
    marginTop:6,
    height:33,
    color:'#fff',
    padding:6,
    fontSize:15
  },
  table:{
    flexDirection:'column'
  },
  row:{
    flexDirection:'row'
  },
  column:{
    margin:3,
  },
  columnText:{
    fontSize:18,
    padding:6
  },
  popWin:{
    position:'absolute',
    marginTop:24,
    backgroundColor:'orange',
    width:300,
    height:400
  }
})