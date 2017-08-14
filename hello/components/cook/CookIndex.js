import React, { Component } from 'react';
import Head from '../public/Head'
import Footer from './Footer'
import Storage from '../../common/Storage'
import DishList from './DishList'

import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  ScrollView
} from 'react-native';


let screenHeight=Dimensions.get('window').height;

export default class CookIndex extends Component {
  constructor(props, context){
    super(props,context);
    let shoprole = this.props.shoprole;
    this.state={};
    this.state.body=<DishList/>;
    //this.changeBody.bind(this);
  }
  
  changeBody(tag){
      this.setState({body:tag});
  }
  // static navigationOptions = ({ navigation }) => ({
  //       title: `餐厅App`,
  //     });
  render() {

    return (
      <View style={[Layout.outer]}>
        <Head shopname={this.props.shopname} shoprole={this.props.shoprole}/>
        <ScrollView vertical={true} showsHorizontalScrollIndicator={true}>
        {this.state.body}
        </ScrollView>
        <Footer helloFun={this.helloFun} changeBody={this.changeBody.bind(this)}/>
      </View>
    );
  }
}

const Layout = StyleSheet.create({
  outer:{
    height:screenHeight-25,
    flexDirection:'column',
    justifyContent:'space-between'
  }
})