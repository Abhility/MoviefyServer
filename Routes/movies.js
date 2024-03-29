const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { verifyLoginToken, verifyToken } = require('../jwtToken');

function getGenreId(name) {
  let genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];
  for (let genre of genres) {
    if (genre.name.localeCompare(name) == 0) {
      return genre.id;
    }
  }
}

router.get('/search/:query', (req, res) => {
  const page = req.query.page || 1 || 1;
  const name = req.params.query;
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${name}&region=IN&page=${page}`
  )
    .then((response) => response.json())
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

// verifyToken
router.get('/trending', (req, res) => {
  const page = req.query.page || 1;
  fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}&region=IN&page=${page}`
  )
    .then((response) => response.json())
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

router.get('/genre/:name', (req, res) => {
  const page = req.query.page || 1;
  let genre = req.params.name;
  const genreId = getGenreId(genre);
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${genreId}&region=IN&page=${page}`
  )
    .then((response) => response.json())
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

router.get("/getmovie/:movieId", (req, res) => {
  const movieId = req.params.movieId;
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
  )
    .then(response => response.json())
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => console.log(err));
});

router.get("/getmovie/:movieId/videos", (req, res) => {
  const movieId = req.params.movieId;
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.API_KEY}`
  )
    .then(response => response.json())
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => console.log(err));
});

router.get("/getmovie/:movieId/credits", (req, res) => {
  const movieId = req.params.movieId;
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.API_KEY}`
  )
    .then(response => response.json())
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => console.log(err));
});

router.get("/getmovie/:movieId/images", (req, res) => {
  const movieId = req.params.movieId;
  fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.API_KEY}&include_image_language=en,null`
  )
    .then(response => response.json())
    .then(result => {
      return res.status(200).send(result);
    })
    .catch(err => console.log(err));
});

router.get(
  '/getmovies/now_playing',
  // verifyToken,
  // verifyLoginToken,
  (req, res) => {
    const page = req.query.page || 1;
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&region=IN&page=${page}`
    )
      .then((response) => response.json())
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((err) => console.log(err));
  }
);

router.get('/getmovies/upcoming', verifyToken, verifyLoginToken, (req, res) => {
  const page = req.query.page || 1;
  fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&region=IN&page=${page}`
  )
    .then((response) => response.json())
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => console.log(err));
});

router.get(
  '/getmovies/top-rated',
  verifyToken,
  verifyLoginToken,
  (req, res) => {
    const page = req.query.page || 1;
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&page=${page}&region=IN`
    )
      .then((response) => response.json())
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((err) => console.log(err));
  }
);

router.get(
  '/movie/:movieId/watch',
  (req, res) => {
    const movieId = req.params.movieId;
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.API_KEY}`
    )
      .then((response) => response.json())
      .then((result) => {
        return res.status(200).send(result.results);
      })
      .catch((err) => console.log(err));
  }
);

router.get(
  '/movie/:movieId/related',
  (req, res) => {
    const movieId = req.params.movieId;
    const page = req.query.page || 1 ;
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.API_KEY}&page=${page}`
    )
      .then((response) => response.json())
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((err) => console.log(err));
  }
);

router.get(
  '/movie/:movieId/socialLinks',
  (req, res) => {
    const movieId = req.params.movieId;
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/external_ids?api_key=${process.env.API_KEY}`
    )
      .then((response) => response.json())
      .then((result) => {
        delete result.id;
        result = Object
          .keys(result)
          .map(socialLink => (
            {
              name: socialLink.split('_')[0],
              linkId: result[socialLink]
            }
          ))
          .filter(socialLink => !!socialLink.linkId);

        return res.status(200).send(result);
      })
      .catch((err) => console.log(err));
  }
);

router.get(
  '/movie/:movieId/reviews',
  (req, res) => {
    const movieId = req.params.movieId;
    const page = req.query.page || 1;
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.API_KEY}&page=${page}`
    )
      .then((response) => response.json())
      .then((result) => {
        return res.status(200).send(result);
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;