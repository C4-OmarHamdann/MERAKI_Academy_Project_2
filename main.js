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
    listCard.append(`<div class="movie-list-item">
      <i class="fa fa-heart"></i>
      <img class="movie-list-item-img" src="img/1.jpg" alt="" />
      <span class="movie-list-item-title">Naruto</span>
      <p class="movie-list-item-desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At hic
        fugit similique accusantium.
      </p>
      <button class="movie-list-item-button">Details</button>
    </div>`);
  });
  $(".movie-list-item-title").text(top[0].title);
  $(".movie-list-item-desc").text(top[0].synopsis);
  $(".movie-list-item-img").attr("src", top[0].image_url);
});
