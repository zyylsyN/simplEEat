var router = require('koa-router')();
var sequelize =require('../models/ModelHeader')();
router.prefix('/dish')

router.get('/getDishForKeys', async function (ctx, next) {
  let loginbean = ctx.session.loginbean;
  if(typeof(loginbean.shoprole)!='undefined'){
  	  let dishkey = ctx.query.dishkey;

  	  let sql = 'select d.id,d.dishname,d.price from dishkeys dk,dishes d where dk.dishkey=? and dk.dishid=d.id';
      let dishRs = await sequelize.query(sql,{replacements: [dishkey]});
      ctx.body=dishRs[0];
	  
  }else{
  	ctx.body=[];
  }
})

router.get('/newDishMenu', async function (ctx, next) {
  console.log('dishid='+ctx.query.dishid);
  ctx.body='收到';
})
module.exports = router;
