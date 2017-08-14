import {
  StyleSheet,
  Dimensions,     //获取屏幕高宽
} from 'react-native';

let screenHeight=Dimensions.get('window').height;

export let BodyLayout = StyleSheet.create({
   body:{
	    height:screenHeight-100,
	    backgroundColor:'yellow',
	    flexDirection:'column',
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
	    margin:12,
	  	backgroundColor:'#fff',
	  	width:'80%',
	  	height:36,
	  },
	viewrow:{
		flexDirection:'row',
	},
	textBtn:{
		backgroundColor:'green',
		marginTop:6,
		height:33,
		color:'#fff',
		paddingTop:6,
		fontSize:15
	}
})