type fetchWeatherType = () => Promise<OpenWeatherCurrentWeatherAPIResponse>;
export const fetchWeather: fetchWeatherType = async () =>
	fetch(
		"https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=5a9cc51bfc5817058d3daac4993aa9ca&lang=en&units=metric",
	).then((res) => res.json());
