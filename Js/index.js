//An object containing elements to be manipulated.
let DOMstring = {
    info: document.querySelector('.get_info'),
    searchBox: document.querySelector('.search_box'),
    city: document.querySelector('.location .city'),
    temp: document.querySelector('.current .temp'),
    weatherCondition: document.querySelector('.current .weather'),
    weatherIcon: document.querySelector('.current .img'),
    now: new Date(),
    date:  document.querySelector('.location .date')
    // init:function(){
    //     DOMstring.searchBox.value = '';
    // }
    
};
 //An obeject with api key and url for fetching from the weather api. Please you should use your own api key.
const api ={
    url: 'http://api.weatherapi.com/v1/current.json?key',
    key: ''
};


//This function is called once the search button is clicked on and it calls another function in.
const get_Info = (e) =>{
    getResults(DOMstring.searchBox.value);
    init();
};
DOMstring.info.addEventListener('click', get_Info);

 
//A function that sets the search space to empty once an enter key or a search button is hit.
 const init = e =>{
     DOMstring.searchBox.value = '';
 }
 
//This function is called once the search button is clicked on.
 const  getInfo = (e) => {
     if(e.keyCode===13){
         getResults(DOMstring.searchBox.value);
        init();
     }
    }

    DOMstring.searchBox.addEventListener('keypress', getInfo);
 //A function to fetch weather data from the api.
 const getResults = (query) =>{
    fetch(`${api.url}=${api.key}&q=${query}`)
     .then(weather =>{
         return weather.json()
     }).then(displayResults)
     .catch((err)=>{
         console.log(err)
         
     })
     
 };
 //This function renders information fetched to the DOM 

 const displayResults =(weather)=>{
     DOMstring.city.innerText = `${weather.location.name },  ${weather.location.country} `;
     DOMstring.temp.innerHTML = `${Math.round(weather.current.temp_c)} <sup>&deg;c</sup>`
     DOMstring.weatherCondition.innerText = `${weather.current.condition.text}`
     DOMstring.weatherIcon.src = `https://${weather.current.condition.icon}`;
     DOMstring.weatherIcon.alt = ` The weather is ${weather.current.condition.text}` 
     DOMstring.weatherIcon.title = ` An image of a ${weather.current.condition.text} weather!`;
    
     DOMstring.date.innerText = dateBuilder(DOMstring.now);


 };
//This function returns date in the this format Friday 08 June 2020
    const dateBuilder = (daysAndMonths)=>{
        let months = ['January', 'February', 'March', 'April', 
                    'May', 'June' ,'July', 'August', 'September', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[daysAndMonths.getDay()];
        let date = daysAndMonths.getDate();
        let month = months[daysAndMonths.getMonth()];
        let year = daysAndMonths.getFullYear();
    
        return `${day} ${date} ${month} ${year}`
    };
