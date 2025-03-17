"use client";

import { CloudIcon } from "./cloud";
import { BedtimeIcon } from "./bedtime";
import { fetchWeather } from "@/frameworks/open-weather";
import { useEffect, useState } from "react";

const fetchWeatherData = async () => {
	const { weather, main } = await fetchWeather();

	return [weather[0].main, main.temp, main.feels_like, main.humidity];
};
const setFetchedData = (data, set) => {
	set({
		weatherName: data[0],
		temperature: data[1],
		feelsLike: data[2],
		humidity: data[3],
	});
};

const WeatherWidget = () => {
	const [widgetWeather, setWidgetWeather] = useState<{
		weatherName: string;
		temperature: number;
		feelsLike: number;
		humidity: number;
	} | null>(null);

	useEffect(() => {
		fetchWeatherData()
			.then((res) => setFetchedData(res, setWidgetWeather))
			.catch(console.error);
	}, []);

	return (
		<div className="relative flex flex-col items-center justify-center w-full h-full rounded-4xl p-5 bg-gradient-to-b from-gray-900 via-cyan-900 to-sky-900 text-indigo-50 shadow shadow-gray-950">
			<div>
				<div>
					<BedtimeIcon
						className="fill-amber-50 hover:fill-amber-100 hover:rotate-6 transition-all w-20 h-20"
						style={{ filter: "drop-shadow(0 0 20px rgba(252, 252, 252, 0.8))" }}
					/>
					<div className="pl-3">
						<CloudIcon
							className="fill-blue-200 transition-all w-20 h-20 -mt-10"
							style={{
								filter: "drop-shadow(0 0 20px rgba(252, 252, 252, 0.8))",
							}}
						/>
					</div>
				</div>
				<div>temperature: {widgetWeather?.temperature}</div>
				<div>weather: {widgetWeather?.weatherName}</div>
				<div>feels-like: {widgetWeather?.feelsLike}</div>
				<div>location: Tokyo</div>
				<div>humidity: {widgetWeather?.humidity}</div>
			</div>
		</div>
	);
};
export default WeatherWidget;

