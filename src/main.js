import { getWeather } from "./weather.js";

window.test = async () => {
	const city = prompt("Enter a city") || "New York";

	try {
		const weather = await getWeather(city);
		console.log("FINAL WEATHER OBJECT:");
		console.table(weather);
		return weather; // <-- force return so DevTools can’t gaslight you
	} catch (err) {
		console.error("ERROR:", err.message);
	}
};
