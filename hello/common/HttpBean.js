export async function postHttp(url,formBody=null){
	var fetchOptions = {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/x-www-form-urlencoded'
			},
			body:formBody
	     };
	  let response = await fetch('http://192.168.1.157:3000/'+url,fetchOptions);
	  let text = await response.text();
	  return text;
}

export function getHttp(url,callback){
	fetch('http://192.168.1.157:3000/'+url).then(function(response){
		callback(response);
	});
}