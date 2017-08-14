
import React, { Component } from 'react';
import {getHttp} from '../../common/HttpBean'

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button,
  Alert
} from 'react-native';

export default class DishList extends Component {
  constructor(props, context){
    super(props,context);
    this.state={};
    this.state.dishArr=[];
  }
  getDishList(){
    let self = this;
    getHttp('shop/kitchen',function(response){
      response.json().then(function(rs){
          //----------------------------------------
          let key = 1;
          let dishArr=[];
        for(let dish of rs){
            dishArr.push(
              <View key={key} style={[Layout.row]}>
                <Text  style={[Layout.column,Layout.columnText]}>{dish.dishname}</Text>
                <Text  style={[Layout.column,Layout.columnText]}>{dish.num}</Text>
                <Text  style={[Layout.column,Layout.columnText]}>{dish.tablenum}</Text>
                <Text  style={[Layout.column,Layout.columnText]}>{dish.updtime}</Text>
                <Text  style={[Layout.column,Layout.columnText,Layout.textBtn]} onPress={()=>{}}>开做</Text>
              </View>
            );
            key += 1;
          }
          self.setState({dishArr:dishArr})
          //----------------------------------------
      })
    });
  }
  componentDidMount(){
    this.getDishList();
  }
  render() {
    return (   
        <View style={[Layout.table]}>
          {this.state.dishArr}
        </View>
    );
  }
}

const Layout = StyleSheet.create({
   table:{
    backgroundColor:'#ffff00',
    flexDirection:'column',
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
  orderView:{
    borderStyle:'solid',
    borderColor:'#000',
    borderWidth:1,
    margin:3,
  },
  textBtn:{
    backgroundColor:'green',
    height:33,
    color:'#fff',
    padding:3,
    fontSize:18,
    textAlign:'center'
  },
  delOrder:{
    backgroundColor:'red',
    height:33,
    color:'#fff',
    padding:3,
    fontSize:18,
    textAlign:'center'
  }
})