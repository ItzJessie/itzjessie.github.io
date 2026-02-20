const moods = {
	happy: {
		"Uptown Funk by Mark Ronson ft. Bruno Mars": "https://www.youtube.com/embed/OPf0YbXqDm0",
		"September by Earth, Wind & Fire": "https://www.youtube.com/embed/Gs069dndIYk",
		"Here Comes the Sun by The Beatles": "https://www.youtube.com/embed/KQetemT1sWc",
		"Good as Hell by Lizzo": "https://www.youtube.com/embed/3tmd-ClpJxA",
		"Best Day of My Life by American Authors": "https://www.youtube.com/embed/Y66j_BUCBMY"
	},
	sad: {
		"The Night We Met by Lord Huron": "https://www.youtube.com/embed/wGF7PswOENQ",
		"All I Want by Kodaline": "https://www.youtube.com/embed/mtf7hC17IBM",
		"When the Party's Over by Billie Eilish": "https://www.youtube.com/embed/pbMwTqkKSps",
		"Say Something by A Great Big World & Christina Aguilera": "https://www.youtube.com/embed/-2U0Ivkn2Ds",
		"Skinny Love by Bon Iver": "https://www.youtube.com/embed/ssdgFoHLwnk"
	}
};

const moodSelect = document.getElementById("mood-select");
const songList = document.getElementById("song-list");
const videoWrapper = document.getElementById("video-wrapper");
const videoFrame = document.getElementById("video-frame");

const clearVideo = () => {
	videoFrame.src = "";
	videoWrapper.hidden = true;
};

const renderSongs = (moodKey) => {
	songList.innerHTML = "";
	clearVideo();

	if (!moodKey || !moods[moodKey]) {
		return;
	}

	Object.entries(moods[moodKey]).forEach(([title, url]) => {
		const listItem = document.createElement("li");
		const link = document.createElement("a");
		link.href = "#";
		link.textContent = title;
		link.dataset.video = url;
		listItem.appendChild(link);
		songList.appendChild(listItem);
	});
};

moodSelect.addEventListener("change", (event) => {
	renderSongs(event.target.value);
});

songList.addEventListener("click", (event) => {
	const link = event.target.closest("a");
	if (!link) {
		return;
	}

	event.preventDefault();
	const url = link.dataset.video;
	if (!url) {
		return;
	}

	videoFrame.src = url;
	videoWrapper.hidden = false;
});
