
/* Global Variables */
// Define the web site that provides informations about weather
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
//my personal API Key
const apiKey = '&units=metric&appid=036b6ffc6f93a9f7fd34f524747fd8f5';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
//events
// on generate button ,add event listner
document.getElementById('generate').addEventListener('click', ()=> {

    const userZip = document.getElementById('zip').value;
   
    const feeling = document.getElementById('feelings').value;
   
   //api call
   getWeather(baseURL, userZip, apiKey)
   //chain promises
   .then((data)=>{
       //postWeather method to send to the server
       postWeather('/add', {temp: data, date: newDate, feeling: feeling})
   })
   //calling update UI
   .then(()=>updateUI());
});

//api call method
const getWeather = async (baseURL, userZip, Key) => {
    //call the api with the url and wait response
    const res = await fetch(`${baseURL + userZip}${Key}`)
    try{
        //wait response and convert to 'json'
        const receivedData = await res.json();
        const temp = receivedData.main.temp;
        const name = receivedData.name;
      //  console.log(temp); //test
        return({temp: temp, name: receivedData.name}) //return temp and city name
    }
    //catch errors
    catch(error){
        console.log("error",error);
        // appropriately handle the error
    }
}

//postWeather method to send to the server
const postWeather = async (url = '', data = {})=>{
    const res = await fetch(url, {
        method : 'POST',
        credentials : 'same-origin',
        headers : {
            'Content-Type': 'application/json',
        },
        body : JSON.stringify(data),
    });
    try{
        const returnedData = await res.json();
        console.log("data returned by postWeather"); //test
        console.log(returnedData); //test
        return(returnedData);
    }
    catch(error){
        console.log("error", error);
        // appropriately handle the error
    }
}

//update the ui after getting response from the server
const updateUI = async ()=> {
  // console.log("updateUI"); //test
    // wait response from the server get route
    const req = await fetch('/all');
    try{
        const updatedData = await req.json();
        console.log("data returned from the server"); //test
        console.log(updatedData);
        //update elements with the received data
        document.getElementById('date').textContent = updatedData.date;
        document.getElementById('temp').textContent = updatedData.temp.temp;
        document.getElementById('city').textContent = updatedData.temp.name;
        document.getElementById('content').textContent = updatedData.feeling;
    }
    catch(error){
        console.log("error", error);
        //  handle the error appropriately
    }
}

