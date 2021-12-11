const listCard = $(".movie-list");

//API \\
const settings = {
  async: true,
  crossDomain: true,
  url: "https://jikan1.p.rapidapi.com/genre/anime/1/1",
  method: "GET",
  headers: {
    "x-rapidapi-host": "jikan1.p.rapidapi.com",
    "x-rapidapi-key": "d6c22af919mshbe0c64cbda6df24p1b18a0jsn4c1b30eb7e33",
  },
};

$.ajax(settings).done(function (response) {
  console.log(response.anime);
  const top = response.anime;
  // console.log(response.top[0].title);
  top.forEach((element) => {
    console.log(element.image_url);
    listCard.append(`<div class="movie-list-item">
      <i class="fa fa-heart"></i>
      <img class="movie-list-item-img" src="${element.image_url}" alt="" />
      <span class="movie-list-item-title">${element.title}</span>
      <p class="movie-list-item-desc">
      ${element.synopsis}
      </p>
      <button class="movie-list-item-button">Details</button>
    </div>`);
  });
});
