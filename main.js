const listCard = $(".movie-list");
const detalis = $(".more-details-section");

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
  console.log(response.anime[1]);
  const top = response.anime;
  // console.log(response.top[0].title);

  //add card
  top.forEach((element, index) => {
    listCard.append(`<div class="movie-list-item">
      <i class="fa fa-heart"></i>
      <img class="movie-list-item-img" src="${element.image_url}" alt="" />
      <span class="movie-list-item-title">${element.title}</span>
      <p class="movie-list-item-desc">
      ${element.synopsis}
      </p>
      <button id="${index}" class="movie-list-item-button details-btn">Details</button>
    </div>`);
  });

  //details card
  $(".more-details-section").hide();

  $(".details-btn").click((e) => {
    console.log(e.target.id);
    let index = e.target.id;
    const data = top[e.target.id];
    console.log(data.title);
    $(".header h1").text(data.title);
    $(".eps").text(data.episodes);
    $(".date").text(data.airing_start.substring(0, 10));
    $(".score").text(data.score);
    $(".rank").text(++index);
    $(".image").attr("src", data.image_url);

    $(".synopsis").text(data.synopsis);
    listCard.hide();
    $(".more-details-section").show();
  });
  $(".exit").click(() => {
    listCard.show();
    $(".more-details-section").hide();
  });
});
