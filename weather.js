gtconst searchbar = document.querySelector(".search");
const card = document.getElementById("city");
const cont = document.getElementById("cont");
const fcont =document.getElementById("fcont");
const btn = document.getElementById("btn");

    async function fetchApi(endpoint) {
        const API_URL="http://api.weatherapi.com/v1/forecast.json";
        const API_KEY="f4af6b3e11f045ae80b95023251201";
        const message = document.createElement("div");
        const response = await fetch(`${API_URL}?key=${API_KEY}&q=${endpoint}&days=4&aqi=no&alerts=yes`);
        const data = await response.json();
        console.log(data);
        if(!data.error){
            console.log("Success");
             
            
        }else{
            const test = document.querySelector(".message")
            message.classList.add("message")
            message.innerText="Please Give Another Name"
            card.appendChild(message);
             if(test){
                message.style.display="none";
             }
        }
        
        return data;   
}


    async function displayWeather(e){
        e.preventDefault();
        const value = document.getElementById("search").value
        const data = await fetchApi(value);
        const days = data.forecast.forecastday;
     fcont.innerHTML="";
        card.innerHTML=` 
                <h2>${data.location.name} , ${data.location.country}</h2>
                <img src="${data.current.condition.icon}" alt="image">
                <h3>${data.current.temp_c}°C</h3>
                <h5> 
                Last Data:
                ${data.current.last_updated}<br>Time Zone:${data.location.tz_id} </h5>
                `



                days.forEach(day => {
                const pred = document.createElement("div");
                pred.classList.add("pred");
                const predicon = document.createElement("img")
                const preddate  = document.createElement("h4")
                const predtemp = document.createElement("h3")
                
                predicon.src=`${day.day.condition.icon}`
                preddate.innerHTML=`${day.date}`;
                predtemp.innerHTML=`${day.day.avgtemp_c}°C`
                    cont.appendChild(fcont);
                    fcont.appendChild(pred);
                    pred.appendChild(predicon);
                    pred.appendChild(predtemp);
                    pred.appendChild(preddate);
            });
    }


    function clear(){
        location.reload();
    }

searchbar.addEventListener("submit",displayWeather);
btn.addEventListener("click",clear);