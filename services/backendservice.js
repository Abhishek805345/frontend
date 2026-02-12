exports.connectme=async (data)=>{
  const responce= await fetch("http://localhost:3000/api/todo/login",{
    method:"POST",
        headers: {
      "Content-Type": "application/json"
    },
    body:JSON.stringify(data),
  });
  if (!responce.ok){
    throw new console.error('error failed');
    
  }
  const item=await responce.json();
  return item;
}

exports.getdata=async (id)=>{
  const responce=await fetch(`http://localhost:3000/api/mydata/${id}`);
  const result=await responce.json();
  return result;
}
exports.getbyid=async (id)=>{
  console.log('received id in services',id);
  const responce=await fetch(`http://localhost:3000/api/edit/${id}`);
   const result= await responce.json();
   return result;
}
exports.updatedata=async (data,id)=>{
  const responce=await fetch(`http://localhost:3000/api/accept/data/${id}`,{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=responce.json();
  return result;
}
exports.delinfoservice=async (id)=>{
  const responce=await fetch(`http://localhost:3000/api/info/delete/${id}`,{
    method:'DELETE'
    })  
}
//register authentication service
exports.saveregisterdata=async (data)=>{
  const responce=await fetch('http://localhost:3000/api/post/register',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await responce.json();
  return result;
}
//login authenticaion service
exports.logincheck=async (data)=>{
  const responce=await fetch('http://localhost:3000/api/post/login',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await responce.json();
  return result;
}

//otp api
exports.sendotp=async (data)=>{
  const responce= await fetch("http://localhost:3000/api/send/otp",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  });
  const result=await responce.json();
  return result;
}
//verify otp
exports.verifyotp=async (data,id)=>{
  const responce=await fetch(`http://localhost:3000/api/verify/otp/${id}`,{
    method:'post',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  });
  const result=await responce.json();
  return result;
}
//reset password
exports.resetpas=async (data,id)=>{
  const responce=await fetch(`http://localhost:3000/api/reset/password/${id}`,{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  });
  const result=await responce.json();
  return result;
}






