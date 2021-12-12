const listCardWrapper = $(".movie-list-wrapper");
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
  const top = response.anime;

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
    for (let index = 0; index < data.genres.length; index++) {
      $(".genres ul").append(`<li>${data.genres[index].name}</li>`);
    }
    listCardWrapper.hide();
    $(".more-details-section").show();
  });
  $(".exit").click(() => {
    listCardWrapper.show();
    $(".genres ul").html("");
    $(".more-details-section").hide();
  });
});

//TOGGLE DARKMODE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  ".more-details-section,.container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
);
let c = true;
ball.addEventListener("click", () => {
  ball.classList.toggle("active");
  if (c) {
    $(":root").css({
      "--main-bg-color": "#eee",
      "--main-txt-color": "#333",
      "--main-nav-bg-color": "white",
      "--main-nav-txt-color": "black",
    });
    c = false;
  } else {
    $(":root").css({
      "--main-bg-color": "#333",
      "--main-txt-color": "#eee",

      "--main-nav-bg-color": "black",
      "--main-nav-txt-color": "white",
    });
    c = true;
  }
});

// // Get the popup
// const modal = $("id01"); //Signup
// const modal2 = $("id02"); //Login
// // When the user clicks anywhere outside of the modal, close it
// // window.onclick = function (event) {
// //   if (event.target == modal) {
// //     modal.style.display = "none";
// //   }
// //}
// ;
// window.onclick = function (event) {
//   if (event.target == modal2) {
//     modal.style.display = "none";
//   }
// };

//sign up

const userName = $(` <input
class="s-username"

type="text"
placeholder="Enter Username"
name="uname"
required
/>`);
$(".uname").append(userName);
const email = $(`<input
class="s-email"
type="text"
placeholder="Enter Email"
name="email"
required
/>`);
$(".email").append(email);
const pass = $(`<input
class="s-psw"
type="password"
placeholder="Enter Password"
name="psw"
required
/>`);
$(".psw").append(pass);
const passRepeat = $(`<input
class="s-psw-r"
type="password"
placeholder="Repeat Password"
name="psw-repeat"
required
/>`);
$(".psw-r").append(passRepeat);
const submit = $(".signupbtn");

submit.on("click", () => {
  dataUsers.push({
    userName: userName.val(),
    email: email.val(),
    password: pass.val(),
    fav: [],
  });
});
console.log(dataUsers);
