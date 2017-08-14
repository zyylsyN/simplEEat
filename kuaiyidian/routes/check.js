var router = require('koa-router')();
var sequelize =require('../models/ModelHeader')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  };

  await ctx.render('index', {
  });
})

router.get('/getCheckInfo', async function (ctx, next) {
	let orderid=ctx.query.orderid;
	let sql = 'select od.dishname,od.num,d.price from orderdishes od,dishes d where od.orderid=? and od.dishid=d.id';
	let rs = await sequelize.query(sql,{replacements: [orderid]});
	ctx.body=rs[0];
})
module.exports = router;
