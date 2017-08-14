import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,     //获取屏幕高宽
  Text,
  View,
  Alert,
  TextInput,
  Button
} from 'react-native';
import {getHttp} from '../../common/HttpBean'
import Storage from '../../common/Storage'
import WaiterDeal from './WaiterDeal'

let screenHeight=Dimensions.get('window').height;

export default class OrderList extends Component {
	constructor(){
		super();
		this.state={};
		this.state.tableArr=[];
		this.getTablesArr();
	}
	toOrder(tableid,tablenum){
		Storage.getInstance().getProp('waiterIndex').changeBody(<WaiterDeal tableid={tableid} tablenum={tablenum}/>)
	}
	
	getTablesArr(){
		let self =this;
		function callback(response){
			if(response.ok){
				response.json().then(function(jsonRs){
					let len = jsonRs.length;
					let tableArr=[];
					for(let i=0;i<len;i++){
						let tableid = jsonRs[i].id;
						let tablenum = jsonRs[i].tablenum;
						tableArr.push(<Text style={[Layout.tableBtn]} key={i} onPress={()=>{self.toOrder(tableid,tablenum)}}>{tablenum}</Text>);
					}
					self.setState({tableArr:tableArr});
				})
			}else{
				alert('有错');
			}
		}
		getHttp('shop/getTables',callback);
	}
	render() {
		
	    return (
	    	<View style={[Layout.body]}>
			{this.state.tableArr}
	        </View>
	    )
	}
}

const Layout = StyleSheet.create({
   body:{
	    height:screenHeight-100,
	    backgroundColor:'yellow',
	    flexDirection:'row',
  		alignItems:'flex-start',
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
  	backgroundColor:'#fff',
  	width:'60%',
  	height:36,
  },
  tableBtn:{
  	marginTop:6,
  	marginLeft:3,
  	width:72,
  	height:48,
  	backgroundColor:'green',
  	color:'#fff',
  	textAlign:'center',
  	paddingTop:12
  }
})