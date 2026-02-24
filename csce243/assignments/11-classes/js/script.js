/**
 * Song Class
 * Represents a single song with all its metadata
 */
class Song {
    constructor(title, artist, album, year, genre, coverImage, youtubeCode) {
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.year = year;
        this.genre = genre;
        this.coverImage = coverImage;
        this.youtubeCode = youtubeCode;
    }

    /**
     * Returns a song card element to be added to the DOM
     * @returns {HTMLElement} A div containing the song card
     */
    getCard() {
        const card = document.createElement('div');
        card.classList.add('song-card');
        card.setAttribute('data-song', JSON.stringify({
            title: this.title,
            artist: this.artist,
            album: this.album,
            year: this.year,
            genre: this.genre,
            coverImage: this.coverImage,
            youtubeCode: this.youtubeCode
        }));

        const cover = document.createElement('img');
        cover.classList.add('song-card__cover');
        cover.src = this.coverImage;
        cover.alt = `${this.title} album cover`;

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('song-card__info');

        const titleElem = document.createElement('h3');
        titleElem.classList.add('song-card__title');
        titleElem.textContent = this.title;

        const artistElem = document.createElement('p');
        artistElem.classList.add('song-card__artist');
        artistElem.textContent = `By ${this.artist}`;

        infoDiv.appendChild(titleElem);
        infoDiv.appendChild(artistElem);

        card.appendChild(cover);
        card.appendChild(infoDiv);

        // Add click event to open modal
        card.addEventListener('click', () => openModal(this));

        return card;
    }

    /**
     * Helper method to get the YouTube embed URL
     * @returns {string} The full YouTube embed URL
     */
    getYoutubeUrl() {
        return `https://www.youtube.com/embed/${this.youtubeCode}`;
    }
}

/**
 * Array of Song instances
 */
const songs = [
    new Song(
        "Don't Start Now",
        "Dua Lipa",
        "Future Nostalgia",
        2019,
        "Disco-Pop",
        "images/dont-start-now.webp",
        "oygrmJFVFNo"
    ),
    new Song(
        "Levitating",
        "Dua Lipa",
        "Future Nostalgia",
        2020,
        "Disco-Pop",
        "images/levitating.webp",
        "TUVcZfQe-Kw"
    ),
    new Song(
        "As It Was",
        "Harry Styles",
        "Harry's House",
        2022,
        "Pop",
        "images/as-it-was.webp",
        "H5zhQkeVw5s"
    ),
    new Song(
        "Anti-Hero",
        "Taylor Swift",
        "Midnights",
        2022,
        "Pop",
        "images/anti-hero.webp",
        "r7lkelVVVAE"
    ),
    new Song(
        "Heat Waves",
        "Glass Animals",
        "Dreamland",
        2020,
        "Indie-Pop",
        "images/heat-wave.webp",
        "mPFbJ-9tyts"
    ),
    new Song(
        "Uptown Funk",
        "Mark Ronson ft. Bruno Mars",
        "Uptown Special",
        2014,
        "Funk-Pop",
        "images/uptown-funk.webp",
        "OPf0YbXqDm0"
    )
];

/**
 * Initialize the gallery by rendering all songs
 */
function initializeGallery() {
    const container = document.getElementById('songs-container');
    songs.forEach(song => {
        container.appendChild(song.getCard());
    });
}

/**
 * Open the modal and populate it with song data
 * @param {Song} song - The song to display in the modal
 */
function openModal(song) {
    const modal = document.getElementById('song-modal');
    document.getElementById('modal-title').textContent = song.title;
    document.getElementById('modal-artist').textContent = `by ${song.artist}`;
    document.getElementById('modal-album').textContent = song.album;
    document.getElementById('modal-details').textContent = `${song.year}`;
    document.getElementById('modal-genre').textContent = `Genre: ${song.genre}`;
    document.getElementById('video-frame').src = song.getYoutubeUrl();

    modal.style.display = 'block';
}

/**
 * Close the modal and hide any playing video
 */
function closeModal() {
    const modal = document.getElementById('song-modal');
    const videoFrame = document.getElementById('video-frame');

    modal.style.display = 'none';
    videoFrame.src = '';
}

/**
 * Event listeners for modal controls
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize gallery
    initializeGallery();

    // Close modal button
    const closeBtn = document.getElementById('close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside of it
    const modal = document.getElementById('song-modal');
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});
