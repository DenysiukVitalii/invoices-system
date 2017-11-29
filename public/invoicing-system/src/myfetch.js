const url = 'http://localhost:8000/api/';
const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json'};

const myfetch = (req, method, body) => {
   if (!method) {
        return fetch(url + req).then(response => {
            return response.json();
        });
   }

   if (method && body) {
        return fetch(url + req, {  
            method: method,  
            headers: headers,  
            body: JSON.stringify(body)  
        })
        .catch(error => {console.log('Error!', error);})
        .then(response => {
            return response.json();
        });
   }
}  
 
export default myfetch;