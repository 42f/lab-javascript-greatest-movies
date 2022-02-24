// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(movies) {
  return movies.map((movie) => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(movies) {
  return movies.filter((movie) =>
    movie.director === 'Steven Spielberg' && movie.genre.includes('Drama'))
    .length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(movies) {
  let output = 0;
  if (movies.length > 0) {
    output = movies.reduce((prev, curr) => prev + (curr.score || 0), 0);
    output /= movies.length;
  }
  return Math.round(output * 100) / 100;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  return scoresAverage(movies.filter((movie) => movie.genre.includes('Drama')));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(movies) {
  const sortedMovies = [...movies];
  sortedMovies.sort((a, b) => {
    if (a.year === b.year && b.title < a.title) {
      return 1;
    } else if (a.year === b.year && b.title > a.title) {
      return -1;
    }
    return a.year - b.year;
  })
  return sortedMovies;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function moviesCmp(a, b) {
  if (a.title < b.title) {
    return -1;
  } else if (a.title > b.title) {
    return 1;
  }
  return 0;
}

function scoreCmp(a, b) {
  return a.score - b.score;
}

function orderAlphabetically(movies) {
  const sortedMovies = [...movies];
  return sortedMovies
    .sort((a, b) => moviesCmp(a, b))
    .slice(0, 20)
    .sort((a, b) => scoreCmp(a, b))
    .map((movie) => movie.title);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

function convertToMinutes(arr) {
  return parseInt(arr[0] || 0) * 60 + parseInt(arr[2] || 0);
}

function turnHoursToMinutes(movies) {

  const moviesDeepCopy = JSON.parse(JSON.stringify(movies))

  return moviesDeepCopy.map(movie => {
    if (movie.duration && movie.duration.length) {
      const numValues = movie.duration.split(/[^0-9]/);
      movie.duration = convertToMinutes(numValues);
    }
    return movie;
  });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average

function getBestYear(years) {
  let bestYear = {};
  for (let year in years) {
    let yearAv = scoresAverage(years[year]);
    if (!bestYear.averageScore || yearAv > bestYear.averageScore) {
      bestYear.year = year;
      bestYear.averageScore = yearAv;
    }
  }
  return bestYear;
}

function getMoviesByYear(movies) {
  const years = {};
  for (movie of movies) {
    years[(movie.year || 0)] = [...(years[movie.year] || []), movie];
  }
  return years;
}

function bestYearAvg(movies) {
  if (movies.length) {
    const sortedYear = getMoviesByYear(movies);
    const bestYear = getBestYear(sortedYear);

    return `The best year was ${bestYear.year} with an average score of ${bestYear.averageScore}`;
  }
  return null;
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
