const API_KEY = "ZB8XAHZZ8S9WZM92HR4VHJKQR";

export async function getWeather(city) {
	const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
		city
	)}?unitGroup=metric&key=${API_KEY}&contentType=json`;

	console.log("Fetching:", url);

	const res = await fetch(url);
	console.log("Response:", res);

	const data = await res.json();
	console.log("Raw API data:", data);

	return normalize(data);
}

function normalize(data) {
	const now = data.currentConditions;
	const today = data.days[0];

	return {
		city: data.resolvedAddress,
		temp: Math.round(now.temp),
		feelsLike: Math.round(now.feelslike),
		humidity: now.humidity,
		wind: now.windspeed,
		uv: now.uvindex,
		condition: now.conditions,
		icon: normalizeIcon(now.icon),
		sunrise: today.sunrise,
		sunset: today.sunset,
		hourly: today.hours.slice(0, 12).map((h) => ({
			time: h.datetime,
			temp: Math.round(h.temp),
			icon: h.icon,
		})),
	};
}

function normalizeIcon(icon) {
	if (icon.includes("rain")) return "rain";
	if (icon.includes("snow")) return "snow";
	if (icon.includes("fog")) return "fog";
	if (icon.includes("cloud")) return "cloudy";
	if (icon.includes("clear")) return "clear";
	return "clear";
}
