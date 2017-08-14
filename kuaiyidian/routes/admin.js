const router = require('koa-router')()
var Users = require('../models/UserModel');
var ShopModel = require('../models/ShopModel');
var formidable = require('formidable'); 
var ShopUser = require('../models/ShopusersModel');
var sequelize =require('../models/ModelHeader')();
router.prefix('/admin')

//router.get('/', async function (ctx, next) {
//	let loginbean = ctx.session.loginbean;
//	if(loginbean){
//		await ctx.render('admin/adminIndex',{})
//	}else{
//		await ctx.redirect('adminIndex.html')
//	}
//
//})
//
//router.post('/login',async function (ctx,next){
//	let rs = await new Promise(function(resolve,reject){
//		 Users.findOne({where:{email:ctx.request.body.email,pwd:ctx.request.body.pwd}}).then(function(rs){
//			if(rs!=null){
//				let loginbean=new Object();
//				loginbean.id = rs.id;
//				loginbean.nicheng = rs.nicheng;
//				loginbean.role = rs.role;
//				loginbean.msgnum = rs.msgnum;
//				ctx.session.loginbean=loginbean;
//				ctx.body='登录成功'
//				//res.redirect('/');
//				resolve(1);
//			}else{
//				//ctx.body="<script>alert('email/密码错误');location.href='/adminIndex.html';</script>";
//				resolve(2);
//			}
//		});
//	})
//	if(rs==1){
//		ctx.redirect('/admin/shop')
//	}else{
//		ctx.body='密码错误'
//	}
//	
//})
//
//
//
//router.post('/pushop',async function (ctx,next){
//  let rs = await new Promise(function(resolve,reject){
//  	
//  	var form = new formidable.IncomingForm();   //创建上传表单 
//	    form.encoding = 'utf-8';        //设置编辑 
//	    form.uploadDir = './public/images/';     //设置上传目录 文件会自动保存在这里 
//	    form.keepExtensions = true;     //保留后缀 
//	    form.maxFieldsSize = 5 * 1024 * 1024 ;   //文件大小5M 
//	    form.parse(ctx.req, function (err, fields, files) { 
//	        if(err){ 
//	            console.log(err); 
//	            return;
//	    } 
//	    let loginbean = ctx.session.loginbean;
//	    fields.photourl=files.photourl.path.replace('public',''); 
//	     //------------启动事物----------------------------------
//     sequelize.transaction().then(function (t) {
//         return ShopModel.create(fields).then(function(rs){
//     	        console.log(rs)
//              fields.shopid = rs.null;
//              console.log(rs.null);
//			   	fields.nicheng = fields.shopname;
//		        return ShopUser.create(fields).then(function(rsa){
//					if(rsa!=null){
//							resolve(1);
//					}else{
//	       		            resolve(2); 
//					}
//				});
//        }).then(t.commit.bind(t)).catch(function(err){
//          t.rollback.bind(t);
//          console.log(err);
//          ctx.body='店铺发布失败，请重新发布';
//       	})
//			});
//			//-------------结束------------
//		  }) 
//   })
//  if(rs==1){
//			ctx.redirect('admin/shop');
//		}else{
//		    ctx.body='添加失败'
//		}
//})
//
//
//router.get('/shop',async function (ctx,next){
//	let a = null;
//	let rs = await new Promise(function(resolve,reject){
//	let loginbean = ctx.session.loginbean;
//	if(!loginbean){
//		ctx.body='0';
//		return;
//	}
//	let sql = 'select * from shopusers';
//	sequelize.query(sql,{}).then(function(rsa){
//	console.log(rsa);
//	a = rsa;
//	if(a!=null){
//		resolve(1);
//	}else{
//		resolve(2);
//	}
//})
//	})
//	if(rs==1){
//			await ctx.render('admin/adminIndex',{rs:a[0]});
//		}else{
//		    ctx.body='查询失败'
//		}
//	
//})
router.get('/', async function (ctx, next) {
 let loginbean = ctx.session.loginbean;
 if(loginbean){
 	await ctx.render('admin/adminIndex',{});
 }else{
 	ctx.redirect('/adminLogin.html')
 }
})

router.get('/findshop',async function (ctx, next) {
	let a=null;
   let rs = await new Promise(function(resolve,reject){
   let loginbean = ctx.session.loginbean;
			   if(!loginbean){
			  	ctx.body='0';
			  	return;
			  }
   let sql='select * from shops' ;
   sequelize.query(sql,{}).then(function(rsa){
   	   a=rsa;
          if(rsa!=null){
				 resolve(1);
				
			}else{
                 resolve(2); 
			}
			})
	})
 
        if(rs==1){
   	     console.log(a)
		 await ctx.render('admin/adminIndex',{rs:a[0]});
			//ctx.body='正确'
		}else{
		  ctx.body='错误'
		}
 })


router.post('/login',async function (ctx,next){
let rs =	await new Promise(function(resolve,reject){
	Users.findOne({where:{email:ctx.request.body.email,pwd:ctx.request.body.pwd}}).then(function(rs){
			if(rs!=null){
			  let loginbean=new Object();
				loginbean.id = rs.id;
				loginbean.nicheng = rs.nicheng;
				loginbean.role = rs.role;
				loginbean.msgnum = rs.msgnum;
				ctx.session.loginbean=loginbean;
				//res.redirect('/');
				resolve(1);
				
			}else{
                 resolve(2); 
			}
		});
		}) 
		if(rs==1){
			ctx.redirect('/admin/findshop');
			//ctx.body='正确'
		}else{
		  ctx.body='错误'
		}
 
})

router.post('/pushop',async function (ctx,next){
    let rs = await new Promise(function(resolve,reject){
    	
    	var form = new formidable.IncomingForm();   //创建上传表单 
	    form.encoding = 'utf-8';        //设置编辑 
	    form.uploadDir = './public/images/';     //设置上传目录 文件会自动保存在这里 
	    form.keepExtensions = true;     //保留后缀 
	    form.maxFieldsSize = 5 * 1024 * 1024 ;   //文件大小5M 
	    form.parse(ctx.req, function (err, fields, files) { 
	        if(err){ 
	            console.log(err); 
	            return;
	        } 
	    let loginbean = ctx.session.loginbean;
	    fields.photourl=files.photourl.path.replace('public',''); 
	     //------------启动事物----------------------------------
       sequelize.transaction().then(function (t) {
           return ShopModel.create(fields,{transaction:t}).then(function(rs){
       	        console.log(rs)
                fields.shopid = rs.null;
                console.log(rs.null);
			   	fields.nicheng = fields.shopname;
			   	fields.createtime = new Date();
		        return ShopUser.create(fields,{transaction:t}).then(function(rsa){
					if(rsa!=null){
							resolve(1);
					}else{
	       		            resolve(2); 
					}
				});
          }).then(t.commit.bind(t)).catch(function(err){
            t.rollback.bind(t);
		            console.log(err);
		            if(err.errors[0].path=='emailuniq'){
		            	resolve(3);
         		   }
                })
			});
			//-------------结束------------
		  }) 
     })
    if(rs==1){
			ctx.redirect('/admin/findshop');
		}else if(rs==3){
		    ctx.body='email重复'
		}else{
			ctx.body='添加失败'
		}
})







module.exports = router
