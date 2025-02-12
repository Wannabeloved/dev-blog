/**
 * Possible weather condition groups
 */
type WeatherMain =
	| "Thunderstorm"
	| "Drizzle"
	| "Rain"
	| "Snow"
	| "Clear"
	| "Clouds"
	| "Mist"
	| "Smoke"
	| "Haze"
	| "Dust"
	| "Fog"
	| "Sand"
	| "Ash"
	| "Squall"
	| "Tornado";
/**
 * Coordinates of the location
 */
interface Coord {
	/** Longitude (east-west position) */
	lon: number;
	/** Latitude (north-south position) */
	lat: number;
}
/**
 * List of possible weather icons
 * Format: {xx}{d|n}
 * xx - weather code (e.g. 01, 02, ... 50)
 * d/n - day or night
 */
type WeatherIcon =
	| "01d"
	| "01n" // Clear sky
	| "02d"
	| "02n" // Few clouds
	| "03d"
	| "03n" // Scattered clouds
	| "04d"
	| "04n" // Broken clouds
	| "09d"
	| "09n" // Shower rain
	| "10d"
	| "10n" // Rain
	| "11d"
	| "11n" // Thunderstorm
	| "13d"
	| "13n" // Snow
	| "50d"
	| "50n"; // Mist
/**
 * Weather conditions
 */
interface Weather {
	/** Weather condition ID */
	id: number;
	/** Main weather condition */
	main: WeatherMain;
	/** Detailed weather description */
	description: string;
	/** Weather icon ID */
	icon: WeatherIcon;
}
/**
 * Main weather data
 */
interface Main {
	/** Temperature (default: Kelvin) */
	temp: number;
	/** Feels-like temperature (how it feels to humans) */
	feels_like: number;
	/** Atmospheric pressure at sea level (hPa) */
	pressure: number;
	/** Humidity (%) */
	humidity: number;
	/** Minimum observed temperature (default: Kelvin) */
	temp_min: number;
	/** Maximum observed temperature (default: Kelvin) */
	temp_max: number;
	/** Atmospheric pressure at sea level (hPa) - optional */
	sea_level?: number;
	/** Atmospheric pressure at ground level (hPa) - optional */
	grnd_level?: number;
}
/**
 * Wind details
 */
interface Wind {
	/** Wind speed (default: meters per second) */
	speed: number;
	/** Wind direction (degrees) */
	deg: number;
	/** Wind gust speed - optional */
	gust?: number;
}
/**
 * Cloud coverage
 */
interface Clouds {
	/** Cloudiness (%) */
	all: number;
}
/**
 * Rain data
 */
interface Rain {
	/** Rain volume in the last hour (mm) - optional */
	"1h"?: number;
	/** Rain volume in the last 3 hours (mm) - optional */
	"3h"?: number;
}
/**
 * Snow data
 */
interface Snow {
	/** Snow volume in the last hour (mm) - optional */
	"1h"?: number;
	/** Snow volume in the last 3 hours (mm) - optional */
	"3h"?: number;
}
/**
 * List of all country codes (ISO 3166-1 alpha-2)
 */
type CountryCode =
	| "AF"
	| "AX"
	| "AL"
	| "DZ"
	| "AS"
	| "AD"
	| "AO"
	| "AI"
	| "AQ"
	| "AG"
	| "AR"
	| "AM"
	| "AW"
	| "AU"
	| "AT"
	| "AZ"
	| "BS"
	| "BH"
	| "BD"
	| "BB"
	| "BY"
	| "BE"
	| "BZ"
	| "BJ"
	| "BM"
	| "BT"
	| "BO"
	| "BQ"
	| "BA"
	| "BW"
	| "BV"
	| "BR"
	| "IO"
	| "BN"
	| "BG"
	| "BF"
	| "BI"
	| "CV"
	| "KH"
	| "CM"
	| "CA"
	| "KY"
	| "CF"
	| "TD"
	| "CL"
	| "CN"
	| "CX"
	| "CC"
	| "CO"
	| "KM"
	| "CG"
	| "CD"
	| "CK"
	| "CR"
	| "HR"
	| "CU"
	| "CW"
	| "CY"
	| "CZ"
	| "CI"
	| "DK"
	| "DJ"
	| "DM"
	| "DO"
	| "EC"
	| "EG"
	| "SV"
	| "GQ"
	| "ER"
	| "EE"
	| "SZ"
	| "ET"
	| "FK"
	| "FO"
	| "FJ"
	| "FI"
	| "FR"
	| "GF"
	| "PF"
	| "TF"
	| "GA"
	| "GM"
	| "GE"
	| "DE"
	| "GH"
	| "GI"
	| "GR"
	| "GL"
	| "GD"
	| "GP"
	| "GU"
	| "GT"
	| "GG"
	| "GN"
	| "GW"
	| "GY"
	| "HT"
	| "HM"
	| "VA"
	| "HN"
	| "HK"
	| "HU"
	| "IS"
	| "IN"
	| "ID"
	| "IR"
	| "IQ"
	| "IE"
	| "IM"
	| "IL"
	| "IT"
	| "JM"
	| "JP"
	| "JE"
	| "JO"
	| "KZ"
	| "KE"
	| "KI"
	| "KP"
	| "KR"
	| "KW"
	| "KG"
	| "LA"
	| "LV"
	| "LB"
	| "LS"
	| "LR"
	| "LY"
	| "LI"
	| "LT"
	| "LU"
	| "MO"
	| "MG"
	| "MW"
	| "MY"
	| "MV"
	| "ML"
	| "MT"
	| "MH"
	| "MQ"
	| "MR"
	| "MU"
	| "YT"
	| "MX"
	| "FM"
	| "MD"
	| "MC"
	| "MN"
	| "ME"
	| "MS"
	| "MA"
	| "MZ"
	| "MM"
	| "NA"
	| "NR"
	| "NP"
	| "NL"
	| "NC"
	| "NZ"
	| "NI"
	| "NE"
	| "NG"
	| "NU"
	| "NF"
	| "MK"
	| "MP"
	| "NO"
	| "OM"
	| "PK"
	| "PW"
	| "PS"
	| "PA"
	| "PG"
	| "PY"
	| "PE"
	| "PH"
	| "PN"
	| "PL"
	| "PT"
	| "PR"
	| "QA"
	| "RE"
	| "RO"
	| "RU"
	| "RW"
	| "BL"
	| "SH"
	| "KN"
	| "LC"
	| "MF"
	| "PM"
	| "VC"
	| "WS"
	| "SM"
	| "ST"
	| "SA"
	| "SN"
	| "RS"
	| "SC"
	| "SL"
	| "SG"
	| "SX"
	| "SK"
	| "SI"
	| "SB"
	| "SO"
	| "ZA"
	| "GS"
	| "SS"
	| "ES"
	| "LK"
	| "SD"
	| "SR"
	| "SJ"
	| "SE"
	| "CH"
	| "SY"
	| "TW"
	| "TJ"
	| "TZ"
	| "TH"
	| "TL"
	| "TG"
	| "TK"
	| "TO"
	| "TT"
	| "TN"
	| "TR"
	| "TM"
	| "TC"
	| "TV"
	| "UG"
	| "UA"
	| "AE"
	| "GB"
	| "US"
	| "UM"
	| "UY"
	| "UZ"
	| "VU"
	| "VE"
	| "VN"
	| "VG"
	| "VI"
	| "WF"
	| "EH"
	| "YE"
	| "ZM"
	| "ZW";
/**
 * System information
 */
interface Sys {
	/** Internal parameter - optional */
	type?: number;
	/** Internal parameter - optional */
	id?: number;
	/** Internal parameter - optional */
	message?: number;
	/** Country code (ISO 3166-1 alpha-2) */
	country: CountryCode;
	/** Sunrise time (Unix UTC) */
	sunrise: number;
	/** Sunset time (Unix UTC) */
	sunset: number;
}
/**
 * Possible API response codes
 */
type ResponseCode = 200 | 400 | 401 | 404 | 500;
/**
 * OpenWeather API response for current weather
 */
interface OpenWeatherCurrentWeatherAPIResponse {
	/** Location coordinates */
	coord: Coord;
	/** Weather conditions */
	weather: Weather[];
	/** Internal parameter */
	base: string;
	/** Main weather data */
	main: Main;
	/** Visibility in meters (optional, max value: 10 km) */
	visibility?: number;
	/** Wind details */
	wind: Wind;
	/** Cloud coverage */
	clouds: Clouds;
	/** Rain data (optional) */
	rain?: Rain;
	/** Snow data (optional) */
	snow?: Snow;
	/** Data calculation time (Unix UTC) */
	dt: number;
	/** System information */
	sys: Sys;
	/** Timezone offset from UTC (seconds) */
	timezone: number;
	/** City ID */
	id: number;
	/** City name */
	name: string;
	/** Response code (200 = success) */
	cod: ResponseCode;
}
