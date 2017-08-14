import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button
} from 'react-native';
import {getHttp} from '../../common/HttpBean'
import Storage from '../../common/Storage'
import WaiterCheck from '../pay/WaiterCheck'


let thisa;
export default class OrderList extends Component {
	constructor(){
		super();
		this.state={};
		this.state.orderArr=[];
		this.state.radioBtn={backgroundColor:'blue'};
		
		this.aa=33;
		thisa=this;
	}
	getOrderList(tableid){
		this.setState({flag:false});
		let self = this;
		getHttp('dish/getOrderList?tableid='+tableid,function(response){
			response.json().then(function(rs){
				let orderArr=[];
				for(let orderid in rs){
					let dishRs = rs[orderid];	//每个单号对应的菜品数组
					let dishArr = [];
					for(let key in dishRs){
						dishArr.push(
							<View key={key} style={[Layout.row]}>
								<Text  style={[Layout.column,Layout.columnText]}>{dishRs[key].dishname}</Text>
								<Text  style={[Layout.column,Layout.columnText]}>{dishRs[key].num}</Text>

								{self.showState(dishRs[key])}

								<Text  style={[Layout.column,Layout.columnText,Layout.textBtn]} onPress={()=>{self.delDish(dishRs[key].id)}}>删除</Text>
							</View>
						);
					}
					orderArr.push(
						<View  key={orderid} style={[Layout.orderView]}>
							<View style={[Layout.row]}>
							<Text style={[Layout.textBtn,{flex:3}]} onPress={()=>{self.addDish(orderid)}}>加菜</Text>
							<Text style={[Layout.delOrder]} onPress={()=>{self.buyOrder(orderid)}}>结账</Text>
							</View>
							{dishArr}
						</View>
					);
				}

				self.setState({orderArr:orderArr});

			});
		});
	}
	
	componentDidMount(){
		this.getOrderList(this.props.tableid);
	}

	addDish(orderid){
		this.props.popAdd(orderid);
	}
	showState(item){
		if(item.state==0){
			return <Text  style={[Layout.column,Layout.columnText,Layout.textBtn]} onPress={()=>{this.confirmDish(item.id)}}>确定</Text>;
		}else if(item.state==1){
			return <Text  style={[Layout.column,Layout.columnText]}>已确定</Text>;
		}
		
	}
	confirmDish(odid){		//确定dish 
		let self = this;
		getHttp('dish/confirmDish?odid='+odid,function(response){
			response.json().then(function(rs){
				alert(rs);
				if(rs==1){
					self.getOrderList(self.props.tableid);
				}else{
					alert('确定失败,稍后再试');
				}
			});
		})
	}
	delDish(odid){
		//alert(odid);
		this.props.popConfirm('确认删除此菜品吗?',this.delExecute(odid));
	}
	delExecute(odid){	//确认删除后删除订单菜品表中的菜品
		let self = this;
		return function(){
			// alert('真删:'+odid);
			getHttp('dish/delDish?odid='+odid,function(response){
				response.json().then(function(rs){
					if(rs==1){
						self.getOrderList(self.props.tableid);
					}else if(rs==0){
						alert('已经开始做,无法取消');
					}
				});
			})
		}
	}

	//-----------删除整个菜单-----------
	buyOrder(orderid){
		let waiterIndex = Storage.getInstance().getProp('waiterIndex');
	    waiterIndex.changeBody(<WaiterCheck orderid={orderid}/>);
	}

	delOrderExecute(orderid){
		let self = this;
		return function(){
			getHttp('dish/delOrder?oderid='+oderid,function(response){
				response.json().then(function(rs){
					if(rs==1){
						self.getOrderList(self.props.tableid);
					}else if(rs==0){
						alert('已经开始做,无法取消');
					}
				});
			})
		}
	}

	render() {
		
	    return (
	    	<View style={[Layout.table]}>
				{this.state.orderArr}
				
	        </View>
	    )
	}
}

const Layout = StyleSheet.create({
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