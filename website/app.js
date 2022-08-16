// Define the web site that provides informatios about weather
const baseURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const requestForm = "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}";

//define personal API key
const key = "&appid=036b6ffc6f93a9f7fd34f524747fd8f5&units=imperial";

//define variables
const generate = document.querySelector("#generate");
const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const date = document.getElementById('date');
const city = document.getElementById('city');
// Create a new date dynamically with JS
let d = new Date();
let newDate = d.toDateString();



// event*
//event listener on generate button
generate.addEventListener("click", (event)=>{
    event.preventDefault();
    const madeURL = `${baseURI}${zip.value},${country.value}${key}`;
    //fetch the url and get the data the needs to be sliced
    getData(madeURL).
    then((data)=>{
    //get the info we want from the coming data of the weather
    projectData(data).
    then((info)=>{
    //post the data to a url : "/add" 
    postData("/add", info).
    then((data)=>{
    //retrieve the data sent to the server from "/add" post 
        retrieveData("/all").
        then(data=>{
    //  update the UI
        updateUI(data);
        });
    });
    });
    
    });
});

//postData method to send to the server
const postData = async (url='', data={})=>{
    const response = await fetch(url, {
        method: 'POST',
        credentials:"same-origin",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        return result;
    }catch (err) {
        console.error(error);
    }
};

//api call method
const getData = async (url) =>{
    try {   
           const response = await fetch(url);
            const result = await response.json();
            if(result.cod != 200){
                return result;
                
            }
            return result;
        }catch(e) {
        console.log(e.message);
    }
};

const projectData = async(data)=>{
    try{
        if(data.cod != 200){
            return data;
        }
        
            const info = {
                date: newDate,
                temp: Math.round(data.main.temp),
                content: feelings.value,
                city: data.name,
                weather: data.weather[0].description,
                country: data.sys.country,
             };
             return info;
        
    }catch(e){
        console.log(e);
    }
};

  
const retrieveData = async (url) => {
   const response = await fetch(url);
   try{
       const result = await response.json();
       return result;
   }catch (err) {
       console.error(err);
   }
};

//updating the ui after receving response from the server
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
        // appropriately handle the error
    }
}
 //loading the page smoothly
setTimeout(() =>{
    document.querySelector("body").style.opacity = '1';
  },200);
