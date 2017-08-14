const router = require('koa-router')()
var Users = require('../models/UserModel');
var ShopUser = require('../models/ShopusersModel');

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/login',async function (ctx,next){
	let rs = await new Promise(function(resolve,reject){
		 Users.findOne({where:{email:ctx.request.body.email,pwd:ctx.request.body.pwd}}).then(function(rs){
			if(rs!=null){
				let loginbean=new Object();
				loginbean.id = rs.id;
				loginbean.nicheng = rs.nicheng;
				loginbean.role = rs.role;
				loginbean.msgnum = rs.msgnum;
				ctx.session.loginbean=loginbean;
				ctx.body='登录成功'
				//res.redirect('/');
				resolve(1);
			}else{
				//ctx.body="<script>alert('email/密码错误');location.href='/adminIndex.html';</script>";
				resolve(2);
			}
		});
	})
	if(rs==1){
		ctx.body='登录成功'
	}else{
		ctx.body='密码错误'
	}
	
})
module.exports = router



