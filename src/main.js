import { getWeather } from "./weather.js";

const glass = document.querySelector(".glass");
const btn = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");
const v1 = document.getElementById("video1");
const v2 = document.getElementById("video2");

v1.src = "/skies/clear.mp4";

btn.onclick = load;
input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") load();
});

async function load() {
	const city = input.value.trim();
	if (!city) return;

	document.body.style.cursor = "wait";

	try {
		const w = await getWeather(city);

		document.getElementById("cityName").textContent = w.city;
		document.getElementById("temp").textContent = `${w.temp}°`;
		document.getElementById("condition").textContent = w.condition;
		document.getElementById("feels").textContent = `${w.feelsLike}°`;
		document.getElementById("wind").textContent = `${w.wind} km/h`;
		document.getElementById("humidity").textContent = `${w.humidity}%`;
		document.getElementById("uv").textContent = w.uv;
		document.getElementById(
			"sunrise"
		).innerHTML = `<span class="sun-label">Rise</span>${w.sunrise}`;
		document.getElementById(
			"sunset"
		).innerHTML = `<span class="sun-label">Set</span>${w.sunset}`;

		playSky(w.icon);
		glass.classList.remove("collapsed");
	} catch (error) {
		console.error(error);
	} finally {
		document.body.style.cursor = "default";
	}
}

function playSky(iconName) {
	const newSrc = `/skies/${iconName}.mp4`;
	const currentVideo = v1.classList.contains("active") ? v1 : v2;
	const nextVideo = v1.classList.contains("active") ? v2 : v1;

	if (
		currentVideo.src.includes(newSrc) &&
		currentVideo.classList.contains("active")
	)
		return;

	nextVideo.src = newSrc;
	nextVideo.load();
	nextVideo.oncanplay = () => {
		nextVideo.play();
		nextVideo.classList.add("active");
		currentVideo.classList.remove("active");
		setTimeout(() => currentVideo.pause(), 1500);
	};
}
