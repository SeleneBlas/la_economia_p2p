let currentPage = 1;
const pageSize = 6;

function getEpisodes(showId, accessToken, offset, limit) {
  return fetch(`https://api.spotify.com/v1/shows/${showId}/episodes?offset=${offset}&limit=${limit}`, {
    headers: {
      'Authorization': 'Bearer ' + accessToken,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => data.items)
    .catch(error => {
      console.error('Error fetching episodes:', error);
      throw new Error('Failed to fetch episodes');
    });
}

function renderEpisodes(episodes) {
  const podcastsContainer = document.getElementById('podcasts-container');
  episodes.forEach(pod => {
    const name = pod.name;
    const URL = pod.external_urls.spotify;
    const imageUrl = pod.images[0].url;
    const description = pod.description.substring(0, 200) + '...';

    const podcastElement = document.createElement('div');
    podcastElement.classList.add('column');
    podcastElement.innerHTML = `
      <div class="podcast-details">
          <a href="${URL}" target="_blank">
            <img class="imagen-podcast" src="${imageUrl}" alt="Podcast Image" style="max-width: 100px; max-height: 100px;">
          </a>
          <div class="title-description">
            <a href="${URL}" target="_blank">
              <h3 class="title">${name}</h3>
            </a>
            <p class="description-custom">${description}</p>
          </div>
      </div>
    `;
    podcastsContainer.appendChild(podcastElement);
  });
}

function loadEpisodes(page, pageSize) {
  const showId = '52ObViuLBc272ViaQ7HsZw';
  const offset = (page - 1) * pageSize;

  const accessToken = process.env.CLIENT_SECRET;

  if (!accessToken) {
    console.error('Access token is missing');
    return;
  }

  getEpisodes(showId, accessToken, offset, pageSize)
    .then(episodes => renderEpisodes(episodes))
    .catch(error => console.error(error));
}

document.addEventListener('DOMContentLoaded', () => {
  loadEpisodes(currentPage, pageSize);
});

function changePage(direction) {
  currentPage += direction;
  if (currentPage < 1) {
    currentPage = 1;
  }
  const podcastsContainer = document.getElementById('podcasts-container');
  podcastsContainer.innerHTML = '';
  loadEpisodes(currentPage, pageSize);
  const podcastSection = document.getElementById('podcast');
  podcastSection.scrollIntoView({ behavior: 'smooth' });
}
