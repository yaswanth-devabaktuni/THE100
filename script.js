const apiKey = 'bee8ce9f0d5a33ee50837d31a61a64eb';
async function fetchTopMovies() {
  try {
      const totalMovies = 100;
      const perPage = 20;
      const totalPages = Math.ceil(totalMovies / perPage);
      const movies = [];

      for (let page = 1; page <= totalPages; page++) {
          const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${page}`);
          const data = await response.json();
          movies.push(...data.results);
      }

      return movies.slice(0, totalMovies);
  } catch (error) {
      console.error(error);
      return [];
  }
}

function createMovieCard(movie) {
  const card = document.createElement('div');
  card.className = 'card';

  const posterImg = document.createElement('img');
  posterImg.src = `https://image.tmdb.org/t/p/w154${movie.poster_path}`;
  posterImg.alt = movie.title;
  posterImg.className = 'card-image';

  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';

  const title = document.createElement('h2');
  title.textContent = movie.title;
  title.className = 'card-title';

  const releaseYear = document.createElement('p');
  releaseYear.textContent = `Release Year: ${movie.release_date.slice(0, 4)}`;
  releaseYear.className = 'card-text';

  const plot = document.createElement('p');
  plot.textContent = movie.overview;
  plot.className = 'card-text';

  const rating = document.createElement('p');
  rating.textContent = `Rating: ${movie.vote_average}`;
  rating.className = 'card-text';

  cardContent.appendChild(title);
  cardContent.appendChild(releaseYear);
  cardContent.appendChild(plot);
  cardContent.appendChild(rating);

  card.appendChild(posterImg);
  card.appendChild(cardContent);

  return card;
}

async function displayTopMovies(searchTerm = '') {
  const topMovies = await fetchTopMovies();

  const movieList = document.getElementById('movie-list');
  movieList.innerHTML = '';

  topMovies.forEach((movie, index) => {
      if (searchTerm === '' || movie.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          const movieCard = createMovieCard(movie);
          movieList.appendChild(movieCard);
      }
  });
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
  displayTopMovies(e.target.value);
});

displayTopMovies();