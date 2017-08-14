var Sequelize = require('sequelize'); 
var sequelize =require('./ModelHeader')();

var ShopusersModel = sequelize.define('shopusers', {
	id: {type:Sequelize.BIGINT,primaryKey: true},
    email: Sequelize.STRING,
    pwd: Sequelize.STRING,
    nicheng: Sequelize.STRING,
    createtime:Sequelize.DATE,
    role:Sequelize.INTEGER,
    shopid:Sequelize.BIGINT,
},{
		timestamps: false,
		//paranoid: true  //获取不到id的返回值
});

module.exports = ShopusersModel;