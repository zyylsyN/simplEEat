var Sequelize = require('sequelize'); 
var sequelize =require('./ModelHeader')();

var ShopusersModel = sequelize.define('tables', {
	id: {type:Sequelize.BIGINT,primaryKey: true},
    shopid:Sequelize.BIGINT,
    tablenum:Sequelize.STRING,
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
});

module.exports = ShopusersModel;