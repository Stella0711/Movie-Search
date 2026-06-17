// API 1: "https://jsonplaceholder.typicode.com/users"
// API 2: "https://jsonplaceholder.typicode.com/posts?userId=:id"
// const userListEl = document.querySelector(".user-list");

// async function main() {
//   const users = await fetch("https://jsonplaceholder.typicode.com/users");
//   const usersData = await users.json();
  
//   userListEl.innerHTML = usersData.map((user) => userHTML(user)).join("");
// }

//   main();

//   function showUserPosts(id) {
//     localStorage.setItem("id", id);
//     window.location.href = `${window.location.origin}/user.html`
// }
    

//   function userHTML(user) {
//        return `<div class="user-card" onclick ="showUserPosts(${user.id})">
//             <div class="user-card__container">
//             <h3>${user.name}</h3>
//                 <p><b>Email:</b> ${user.email}</p>
//                 <p><b>Phone:</b> ${user.phone}</p>
//                 <p><b>Website:</b> <a href="https://${user.website}" target="_blank">
//                 ${user.website}</a></p>
//             </div>
//          </div>`;
//   }

let currentMovies = [];

const sortFilter = document.querySelector("#sortFilter");
const movieInput = document.querySelector("#movieInput");
const searchButton = document.querySelector("#searchBtn");
const movieContainer = document.querySelector(".results__grid");

async function searchMovies() {
  const movieTitle = movieInput.value;

  const response = await fetch(
    `https://www.omdbapi.com/?apikey=919dd8b6&s=${movieTitle}`
  );

  const data = await response.json();

  if (!data.Search) {
    movieContainer.innerHTML = "<p>No movies found.</p>";
    return;
  }

  currentMovies = data.Search; // 👈 store results

  renderMovies();
}

function filterMovies(event) {
  const value = event.target.value;

  if (value === "az") {
    currentMovies.sort((a, b) =>
      a.Title.localeCompare(b.Title)
    );
  }

  if (value === "za") {
    currentMovies.sort((a, b) =>
      b.Title.localeCompare(a.Title)
    );
  }

  if (value === "yearAsc") {
    currentMovies.sort((a, b) => a.Year - b.Year);
  }

  if (value === "yearDesc") {
    currentMovies.sort((a, b) => b.Year - a.Year);
  }

  renderMovies();
}

function renderMovies() {
  movieContainer.innerHTML =
    currentMovies
      .slice(0, 6)
      .map(movie => movieHTML(movie))
      .join("");
}

function movieHTML(movie) {
  return `
    <div class="movie-card">
      <img src="${movie.Poster}" alt="">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    </div>
  `;
}


