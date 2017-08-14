import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ScrollView
} from 'react-native';
import {BodyLayout} from '../public/Style'
import SearchDish from './SearchDish'
import OrderList from './OrderList'
import ConfirmDialog from '../public/ConfirmDialog'


export default class WaiterDeal extends Component {
	constructor(){
		super();
		this.state={};
		this.state.remark='';
		this.state.popWin=false;
		this.state.popTitle='';
		this.state.orderid=0;
		this.state.confirmFlag=false;
		this.state.confirmCallback=null;
		this.state.confirmTitle='';
	}
	render() {
		let confirm=null;
		if(this.state.confirmFlag){
			confirm=<ConfirmDialog  userConfirmed={()=>{this.userCanceled();this.state.confirmCallback();}}
                	userCanceled={this.userCanceled.bind(this)}
                	promptToUser={this.state.confirmTitle}/>;
		}
	    return (
	    	<ScrollView alwaysBounceVertical={true}>
	    		<View style={[Layout.body]}>
					<Text>桌号:{this.props.tablenum}</Text>
					<Text style={[Layout.textBtn]} onPress={this.popNew.bind(this)}>创建新单</Text>
			         <OrderList ref='orderList' tableid={this.props.tableid} popAdd={this.popAdd.bind(this)} popConfirm={this.popConfirm.bind(this)}/>
			         {this.popWin()}
			         <View style={{height:550}}>
			         </View>
			     </View>
			     {confirm}
	        </ScrollView>
	    )
	}
	popConfirm(confirmTitle,callback){
		this.setState({confirmTitle:confirmTitle})
		this.setState({confirmCallback:callback});
		this.setState({confirmFlag:true});
	}
	userCanceled(){
		this.setState({confirmFlag:false});
	}
	refreshOrderList(){
		let tableid = this.props.tableid;
		this.refs.orderList.getOrderList(tableid);
	}
	popNew(){
		this.setState({dishFlag:0});
		this.setState({popTitle:'创建新单'});
		this.setState({popWin:true});
	}
	popAdd(orderid){
		this.setState({dishFlag:1});
		this.setState({popTitle:'添菜'});
		this.setState({orderid:orderid});
		this.setState({popWin:true});
	}
	popWin(){
		if(this.state.popWin){
			return <View ref='popWin' style={[Layout.popWin]}>
				<View style={{alignItems:'flex-end'}}>
					<Text style={{width:30,fontSize:24,backgroundColor:'green',textAlign:'center'}} onPress={this.closeWin.bind(this)}>X</Text>
				</View>
				<View style={{alignItems:'center'}}>
					<Text style={{fontSize:24}}>{this.state.popTitle}</Text>
				</View>
				<SearchDish dishFlag={this.state.dishFlag} closeWin={this.closeWin.bind(this)} tableid={this.props.tableid} refreshOrderList={this.refreshOrderList.bind(this)} orderid={this.state.orderid}/>
			</View>
		}
	}

	closeWin(){
		this.setState({popWin:false});
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