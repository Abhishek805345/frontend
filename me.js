const express=require('express');
const home=express();
const path=require('path');
//local module
const services=require('./services/backendservice');
const { error } = require('console');

home.use(express.json());
home.use(express.urlencoded({extended:true}));

home.set('view engine','ejs');
home.set('views','views');
//home
home.get('/',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'public', 'Index.html'));
})
//login
home.get('/login',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'public','login.html'));
})
//post login
let userdetail;
home.post('/post/login',async (req,res,next)=>{
  const data=req.body;
  const result=await services.logincheck(data);
  console.log(result);
  userdetail=result;
  if (result.login==true){
    res.render('addtask',{data:result});
  }else if (result.login==false){
    res.send('Something went wrong,Please check your details');
  }
})
//register
home.get('/register',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'public','register.html'));
})
//post register
home.post('/post/register',async (req,res,next)=>{
  const data=req.body;
  console.log(data);
  const result=await services.saveregisterdata(data);
  console.log('results are',result);
  res.redirect('/login');
})


home.post('/data',async (req,res,next)=>{
  console.log(req.body);
    try{
      await services.connectme(req.body);
      res.redirect('/getdata');
    }catch(err){
      console.log(err);
    }
})
//fetching data from db
home.get('/getdata',async (req,res,next)=>{
  const data=await services.getdata(userdetail.id);
  console.log('fetched data is ',data);
  res.render('new',{data:data});
})

//get data to edit
home.get('/edit/:id',async (req,res,next)=>{
  const id=req.params.id;
  const data=await services.getbyid(id);
  res.render('editdata',{data:data});
})
//updating data
home.post('/accept/data/:id',async (req,res,next)=>{
  const id=req.params.id;
  const data=req.body;
  await services.updatedata(data,id);
  res.redirect('/getdata');
})
//deleting task
home.get('/task/delete/:id',async (req,res,next)=>{
  const id=req.params.id;
  console.log('fetched id is ',id);
  await services.delinfoservice(id).then(()=>{
    res.redirect('/getdata');
  });

})
home.get('/addone',(req,res,next)=>{
  res.render('addtask',{data:userdetail});
})

//forgot pass email enter
home.get('/forgot-password',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'public','email.html'));
})
//forgot otp send
home.post('/send-otp',async (req,res,next)=>{
  const data=req.body;
  console.log('user email is ',data);
  const result=await services.sendotp(data);
  if (result.status==true){
    res.render('otpenter',{id:result.id});
  }else if(result.status==false) {
    res.sendFile(path.join(__dirname,'public','exists.html'));
  }
})
//verify otp
home.post('/verify-otp/:id',async (req,res,next)=>{
  const id=req.params.id;
  const data=req.body;
  const result =await services.verifyotp(data,id);
  if (result.verify==true){
    res.render('newpas',{id:result.userid});
  }else{
    res.sendFile(path.join(__dirname,'public','wrongotp.html'));
  }
})
//reset password
home.post('/reset-password/:id',async (req,res,next)=>{
  const id=req.params.id;
  const data=req.body;
  const result=await services.resetpas(data,id);
  res.redirect('/');
})


port=3001;
 
home.listen(port,()=>{
  console.log(`Your server is running on port http://localhost:${port}`);
})