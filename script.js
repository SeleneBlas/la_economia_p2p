let currentPage = 1;
const pageSize = 6;

function getSpotify(page, pageSize) {
  const client_id = '74ead41a626a4f8db39bd1800ef9eab8';
  const client_secret = process.env.CLIENT_SECRET;
  const show_id = '52ObViuLBc272ViaQ7HsZw';
  const offset = (page - 1) * pageSize;

  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(client_id + ":" + client_secret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })
    .then(response => response.json())
    .then(data => {
      const access_token = data.access_token;

      fetch(`https://api.spotify.com/v1/shows/${show_id}/episodes?offset=${offset}&limit=${pageSize}`, {
        headers: {
          'Authorization': 'Bearer ' + access_token,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(results => {
          const podcastsContainer = document.getElementById('podcasts-container');
          const episodes = results.items;
          episodes.forEach((pod, index) => {
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
        })
        .catch(error => console.error('Error fetching episodes:', error));
    })
    .catch(error => console.error('Error fetching access token:', error));
}

getSpotify(1, pageSize);

function changePage(direction) {
  currentPage += direction;
  if (currentPage < 1) {
    currentPage = 1;
  }
  const podcastsContainer = document.getElementById('podcasts-container');

  if (podcastsContainer.firstChild) {
    podcastsContainer.innerHTML = '';
  }

  getSpotify(currentPage, pageSize);

  const podcastSection = document.getElementById('podcast');
  podcastSection.scrollIntoView({ behavior: 'smooth' });
}

