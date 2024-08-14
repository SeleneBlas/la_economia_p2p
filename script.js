let currentPage = 1;
const pageSize = 6;

function getEpisodes(page, pageSize) {
    return fetch(`/api/episodes?page=${page}&size=${pageSize}`)
        .then(response => response.json())
        .then(data => data.episodes || [])
        .catch(error => {
            console.error('Error fetching episodes:', error);
            return [];
        });
}

function renderEpisodes(episodes) {
    const container = document.getElementById('podcasts-container');
    container.innerHTML = ''; // Clear previous content

    episodes.forEach(episode => {
        const episodeElement = document.createElement('div');
        episodeElement.classList.add('column');
        episodeElement.innerHTML = `
            <div class="podcast-details">
                <a href="${episode.external_urls.spotify}" target="_blank">
                    <img class="imagen-podcast" src="${episode.images[0].url}" alt="Podcast Image" style="max-width: 100px; max-height: 100px;">
                </a>
                <div class="title-description">
                    <a href="${episode.external_urls.spotify}" target="_blank">
                        <h3 class="title">${episode.name}</h3>
                    </a>
                    <p class="description-custom">${episode.description.substring(0, 200)}...</p>
                </div>
            </div>
        `;
        container.appendChild(episodeElement);
    });
}

function changePage(direction) {
    currentPage += direction;
    if (currentPage < 1) currentPage = 1;
    getEpisodes(currentPage, pageSize).then(renderEpisodes);
}

// Initial load
getEpisodes(currentPage, pageSize).then(renderEpisodes);

