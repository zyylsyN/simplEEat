import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {getHttp} from '../../common/HttpBean'
// import Storage from '../../common/Storage'
// import RadioModal from 'react-native-radio-master'

let thisa;
export default class SearchDish extends Component {
	constructor(){
		super();
		this.state={};
		this.state.dishArr=[];
		this.state.num=1;
	}
	findDish(){
		let self =this;
		getHttp('dish/getDishForKeys?dishkey='+this.state.dishkey,function(response){
			 response.json().then(function(rs){
			 	let dishArr=[];
			 	let len = rs.length;
			 	if(len>0){
			 		//alert(rs[0].dishname);
			 		for(let i=0;i<len;i++){
			 			dishArr.push(
			 				<View key={i} style={[Layout.row]}>
			 					<Text style={[Layout.column,Layout.columnText]}>{rs[i].dishname}</Text>
			 					<TextInput  style={[Layout.input,{width:48}]}
		          				onChangeText={(num) => self.setState({num})} defaultValue='1'
		          				keyboardType="number-pad"
		          				/>
		          				<Text style={[Layout.column,Layout.columnText]}>份</Text>
			 					
			 					<Text onPress={()=>{self.addDish(rs[i]);}} style={[Layout.column,Layout.textBtn]}>
			 						添加
			 					</Text>
			 				</View>
			 			);
			 			dishArr.push(
			 				<View key={i+'_a'} style={[Layout.row]}>
			 				<TextInput  style={[Layout.input]} placeholder='点菜备注说明'
		          				onChangeText={(remark) => self.setState({remark})}
		          				/>
			 				</View>
			 			);
			 		}
			 		self.setState({dishArr:dishArr});
			 	}else{
			 		//alert('无此关键词');
			 		self.setState({dishArr:[]});
			 	}
			 })
		});
	}
	createNew(item){
		let self = this;
		getHttp('dish/newDishMenu?dishid='+item.id+'&tableid='+this.props.tableid+'&dishname='+item.dishname+'&remark='+this.state.remark+'&num='+this.state.num+'&price='+item.price,function(response){
			response.text().then(function(rs){
				if(rs==1){
					self.props.refreshOrderList();
					self.props.closeWin();
				}
			});
		});
	}
	appendDish(item){
		let orderid=this.props.orderid;
		let self = this;
		getHttp('dish/appendDish?orderid='+orderid+'&dishid='+item.id+'&tableid='+this.props.tableid+'&dishname='+item.dishname+'&remark='+this.state.remark+'&num='+this.state.num+'&price='+item.price,function(response){
			response.text().then(function(rs){
				if(rs==1){
					self.props.refreshOrderList();
					self.props.closeWin();
				}
			});
		});
	}
	addDish(item){
		if(this.props.dishFlag==0){
			this.createNew(item);
		}else{
			this.appendDish(item);
		}
		
	}
	render() {
	    return (
	    	<View style={{flexDirection:'column'}}>
		    	<View style={{flexDirection:'row',justifyContent:'center',}}>
					<TextInput style={[Layout.input,{width:'60%'}]} placeholder='请输入菜品速查关键词'
		          				onChangeText={(dishkey) => this.setState({dishkey})}
		          			/>
		            <Text style={[Layout.textBtn]} onPress={()=>{this.findDish()}}> 搜菜 </Text>
		         </View>
		         <View style={[Layout.table]}>
			         	{this.state.dishArr}
			     </View>
		     </View>
	    )
	}
}

let Layout = StyleSheet.create({
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
		flexDirection:'row',
		justifyContent:'center',
	},
	column:{
		margin:3,
	},
	columnText:{
		fontSize:18,
		padding:6
	}
})