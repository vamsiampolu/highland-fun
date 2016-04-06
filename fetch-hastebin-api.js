require('isomorphic-fetch');
fetch('http://hastebin.com/documents',{
  headers:{
    'Content-Type':'text/plain',
  },
  method:'POST',
  body:'All is well that ends well'  
}).then(response=> response.json()).then(data => {console.log(data)}).catch(err => {console.error(err)})
