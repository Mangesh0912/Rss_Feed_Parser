
export async function fetchRssFeedDetails(url: string): Promise<string[]> {
     url = "http://localhost:8000/rssFeedData/" + "?url=" + url;
     console.log("url is:", url);
     
     const response =  await fetch(url, {
         method: 'GET',
         mode: 'cors'
        });
     console.log(response)   
     const status = response.status; 
     const jsonResponse = await response.json(); 
     console.log("Jsonresponse is:", jsonResponse);
     
     if(status != 200) {
           throw jsonResponse.message;
     }
     else {      
        return jsonResponse.message;
     }

   
}