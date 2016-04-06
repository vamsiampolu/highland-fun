require('isomorphic-fetch');
const highland = require('highland');
const getRepos =  user => fetch(`https://api.github.com/users/${user}/repos`).then(response => response.json()); 
const logAllRepos = user => {
   highland(getRepos(user))
	   .series()
	   .map(data => { 
             const { 
		name, 
		id, 
		url, 
		html_url:htmlUrl, 
		fork, 
		language, 
		owner:{
		  login:ownerLogin, 
		  avatar:ownerAvatar,
		  type:ownerType,
		  id:ownerId
		 } 
	       } = data   
	      var res = {
	       name,
	       url,
	       htmlUrl,
	       fork,
	       language,
	       ownerLogin,
	       ownerAvatar,
	       ownerType,
	       ownerId
	      };
	      return res;
	   })
           .errors(err => { 
	       console.error(err.message,'\n',err.stackTrace)
	   })
           .each(highland.log);

};
module.exports = logAllRepos; 
