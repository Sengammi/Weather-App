import React, {useEffect, useState} from 'react';
import axios from "axios";
import Header from "./components/Header";
import Input from "./components/Input";

const please = localStorage.cityName ? localStorage.cityName : 'Sadzhavka';
const api = '0191dbe261d842358f7185516232501'
let url = `https://api.weatherapi.com/v1/current.json?key=${api}&q=${please}&aqi=yes`;


const App = () => {

    const [weatherData, setWeatherData] = useState(null)
    const [city, setCity] = useState((localStorage.cityName ? localStorage.cityName : 'Sadzhavka'));
    const link = document.querySelector("link[rel~='icon']");
    const title = document.querySelector("title[id~='title']");

    const weatherCheck = async () => {
        try {

            const {data} = await axios.get(url);

            await setWeatherData(data);

        } catch (err) {
            alert(`Such a city does not exist. ${err.toString()}`);
        }
    }

    const editCity = async () => {
        try {
            url = `https://api.weatherapi.com/v1/current.json?key=${api}&q=${city}&aqi=yes`;
            await weatherCheck()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        weatherCheck().then()
    },[])

    if (weatherData !== null) {
        link.href = ('https:' + weatherData?.current?.condition?.icon);
        title.textContent = "Weather in " + weatherData?.location?.name;
        localStorage.cityName = weatherData?.location?.name;
        return (
            <div>
                <Header
                    title={`Weather in ` + weatherData?.location?.name + ', ' + (weatherData?.location?.region ? weatherData?.location?.region + ", " + weatherData?.location?.country : weatherData.location.country)}/>
                <main>
                    <Input city={setCity} onEdit={() => editCity()}/>
                    <div className={'weather-now'}>
                        <img className={'condition-icon'} src={'https:' + weatherData?.current?.condition?.icon} alt=""/>
                        <p className={'condition-text'}>{weatherData?.current?.condition?.text}</p>
                    </div>
                    <span className={'add-info'}>
                        <div>
                            <p>
                                Temperature in Celsius: {weatherData?.current?.temp_c}.
                            </p>
                            <p>
                                But it feels like: {weatherData?.current?.feelslike_c}.
                            </p>
                            <p>
                                Humidity: {weatherData?.current?.humidity}.
                            </p>
                        </div>
                        <div>
                            <p>
                                Precipitation in mm: {weatherData.current.precip_mm}.
                            </p>
                            <p>
                                Gust km/h: {weatherData.current.gust_kph}.
                            </p>
                            <p>
                                Wind km/h: {weatherData.current.wind_kph}.
                            </p>
                    </div>
                    </span>
                </main>
            </div>
        )
    }
}

export default App;
