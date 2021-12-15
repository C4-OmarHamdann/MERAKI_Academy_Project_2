const listCardWrapper = $(".movie-list-wrapper");
const listCard = $(".movie-list");
const listCardTop = $(".movie-list-top");
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
  let cards_length = $(".movie-list-item").length;
  // top.forEach((element, index) => {

  //   listCard.append(`<div class="movie-list-item">
  //     <i id="${index}" class="fa fa-heart "></i>
  //     <img class="movie-list-item-img" src="${element.image_url}" alt="" />
  //     <span class="movie-list-item-title">${element.title}</span>
  //     <p class="movie-list-item-desc">
  //     ${element.synopsis}
  //     </p>
  //     <button id="${index}" class="movie-list-item-button details-btn">Details</button>
  //   </div>`);
  // });

  for (let index = 0; index < 16; index++) {
    listCard.append(`<div class="movie-list-item">
     <i id="${index}" class="fa fa-heart "></i>
     <img class="movie-list-item-img" src="${top[index].image_url}" alt="" />
       <span class="movie-list-item-title">${top[index].title}</span>
       <p class="movie-list-item-desc">
       ${top[index].synopsis}
       </p>
       <button id="${index}" class="movie-list-item-button details-btn">Details</button>
     </div>`);
  }

  //show-more\\
  const showMore = $("#show-more-top");
  showMore.on("click", () => {
    for (let index = 16; index < top.length; index++) {
      listCard.append(`<div class="movie-list-item">
     <i id="${index}" class="fa fa-heart "></i>
     <img class="movie-list-item-img" src="${top[index].image_url}" alt="" />
       <span class="movie-list-item-title">${top[index].title}</span>
       <p class="movie-list-item-desc">
       ${top[index].synopsis}
       </p>
       <button id="${index}" class="movie-list-item-button details-btn">Details</button>
     </div>`);
    }
    showMore.remove();

    //details card

    $(".details-btn").click((e) => {
      let index = e.target.id;
      const data = top[e.target.id];

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

      //fav list\\
      $(".heartd").on("click", () => {
        console.log(top[e.target.id]);
        dataUsers.forEach((element, index) => {
          if (element.usersStatus) {
            dataUsers[0].fav.forEach((element) => {
              if (element.mal_id != top[e.target.id].mal_id) {
                element.fav.push(top[e.target.id]);
              } else {
                console.log(element.mal_id + " /n " + top[e.target.id].mal_id);
              }
            });
          } else {
            console.log(dataUsers.usersStatus);
          }
        });
      });
    });
  });

  //details card

  $(".details-btn").click((e) => {
    let index = e.target.id;
    const data = top[e.target.id];

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
    $(".details-background").append(
      ` <i class="fas fa-heart heartd ${e.target.id}"></i>`
    );
    //fav list\\
    $(".heartd").on("click", () => {
      dataUsers.forEach((element, index) => {
        if (element.usersStatus) {
          console.log(element.fav.indexOf(top[e.target.id]));
          if (element.fav.indexOf(top[e.target.id]) == -1) {
            element.fav.push(top[e.target.id]);
            $(`.${e.target.id}`).remove();
          }
        } else {
          console.log(element.usersStatus);
        }
      });
    });
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
let switchMode = true;
ball.addEventListener("click", () => {
  ball.classList.toggle("active");
  if (switchMode) {
    $(":root").css({
      "--main-bg-color": "#eee",
      "--main-txt-color": "#333",
      "--main-nav-bg-color": "white",
      "--main-nav-txt-color": "black",
    });
    switchMode = false;
  } else {
    $(":root").css({
      "--main-bg-color": "#333",
      "--main-txt-color": "#eee",

      "--main-nav-bg-color": "black",
      "--main-nav-txt-color": "white",
    });
    switchMode = true;
  }
});

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
  $(".woring").remove();
  if (userName.val() && email.val() && pass.val() && passRepeat.val()) {
    dataUsers.forEach((element) => {
      if (email.val() != element.email) {
        if (pass.val() === passRepeat.val()) {
          arrayData.push({
            userName: userName.val(),
            email: email.val(),
            password: pass.val(),
            fav: [],
            usersStatus: true,
          });
          dataStorage.setItem("dataArray", JSON.stringify(arrayData));
          passRepeat.css("background-color", "var(--main-bg-color)");
          pass.css("background-color", "var(--main-bg-color)");
          userName.css("background-color", "var(--main-bg-color)");
          email.css("background-color", "var(--main-bg-color)");
          $(".woring").remove();
          $("#id01").css("display", "none");
          $(".profile-text-container")
            .css("display", "block")
            .text(userName.val());
          $(".profile-picture").css("display", "block");
          $(".favlist").css("display", "block");
          $(".auth-list a").css("display", "block");
          $(".show-login").parent().hide();
          $(".show-signup").parent().hide();
        } else {
          $(".woring").remove();
          passRepeat.css("background-color", "#F52A12");
          pass.css("background-color", "#F52A12");
          $(".psw-r").prepend(
            `<h3 class="woring" style="color:#F52A12">Password Not Matching</h3>`
          );
        }
      } else {
        $(".woring").remove();
        email.css("background-color", "#F52A12");
        $(".email").prepend(
          `<h3 class="woring" style="color:#F52A12">Existing E-mail</h3>`
        );
      }
    });
  } else {
    passRepeat.css("background-color", "#F52A12");
    pass.css("background-color", "#F52A12");
    userName.css("background-color", "#F52A12");
    email.css("background-color", "#F52A12");
  }
});
//logout button\\
$(".logout").on("click", () => {
  dataUsers.forEach((element) => {
    element.usersStatus = false;
  });

  $(".profile-text-container").css("display", "none").text(userName.val());
  $(".profile-picture").css("display", "none");
  $(".favlist").css("display", "none");
  $(".logout").hide();
  $(".show-login").parent().show();
  $(".show-signup").parent().show();
});

//login\\
const loginEmail = $(`<input
class="l-email"
type="text"
placeholder="Enter Email"
name="email-l"
required
/>`);
$(".login-email").append(loginEmail);

const loginPass = $(`<input
class="l-psw"
type="password"
placeholder="Enter Password"
name="psw-l"
required
/>`);
$(".login-psw").append(loginPass);

const login = $(".loginbtn");

login.on("click", () => {
  $(".woring").remove();
  dataUsers.forEach((element) => {
    if (
      loginEmail.val() == element.email &&
      loginPass.val() == element.password
    ) {
      element.usersStatus = true;
      $("#id02").css("display", "none");
      $(".profile-text-container")
        .css("display", "block")
        .text(element.userName);
      $(".profile-picture").css("display", "block");
      $(".favlist").css("display", "block");
      $(".auth-list a").css("display", "block");
      $(".show-login").parent().hide();
      $(".show-signup").parent().hide();
    } else {
      $(".woring").remove();
      loginEmail.css("background-color", "#F52A12");
      loginPass.css("background-color", "#F52A12");
      $(".login-email").prepend(
        `<h3 class="woring" style="color:#F52A12">E-mail or Password uncoract</h3>`
      );
    }
  });
});

//favlist\\
dataUsers.forEach((elm) => {
  if (elm.usersStatus) {
    $(".favlist").on("click", () => {
      $(".favlastIteams").show();
      $(".movie-list-item-fav").remove();
      elm.fav.forEach((element, index) => {
        $(".favlastIteams").append(`<div class="movie-list-item-fav">
     
      <img class="movie-list-item-img" src="${element.image_url}" alt="" />
      <span class="movie-list-item-title">${element.title}</span>
      <p class="movie-list-item-desc">
      ${element.synopsis}
      </p>
      
    </div>`);
      });
      listCardWrapper.hide();
      $(".more-details-section").hide();
      //exit button\\
      $(".exit").click(() => {
        listCardWrapper.show();

        $(".favlastIteams").hide();
      });
    });
  }
});

//Upcomming
const settingstop = {
  async: true,
  crossDomain: true,
  url: "https://jikan1.p.rapidapi.com/top/anime/1/upcoming",
  method: "GET",
  headers: {
    "x-rapidapi-host": "jikan1.p.rapidapi.com",
    "x-rapidapi-key": "d6c22af919mshbe0c64cbda6df24p1b18a0jsn4c1b30eb7e33",
  },
};

$.ajax(settingstop).done(function (response) {
  const top = response.top;

  //add card

  for (let index = 0; index < 8; index++) {
    $(".upcomming-movie-list").append(`<div class="movie-list-item">
    <i id="${index}" class="fa fa-heart "></i>
      <img class="movie-list-item-img" src="${top[index].image_url}" alt="" />
      <span class="movie-list-item-title">${top[index].title}</span>
      <p class="movie-list-item-desc">
      ${top[index].start_date == null ? "coming soon" : top[index].start_date}
      </p>
      <button id="${index}" class="movie-list-item-button details-btn">Details</button>
    </div>`);
  }
  //show-more\\
  const showMore = $("#show-more-upcomming");
  showMore.on("click", () => {
    for (let index = 8; index < top.length; index++) {
      $(".upcomming-movie-list").append(`<div class="movie-list-item">
      <i id="${index}" class="fa fa-heart "></i>
      <img class="movie-list-item-img" src="${top[index].image_url}" alt="" />
        <span class="movie-list-item-title">${top[index].title}</span>
        <p class="movie-list-item-desc">
        ${top[index].synopsis}
        </p>
        <button id="${index}" class="movie-list-item-button details-btn">Details</button>
      </div>`);
    }
    showMore.remove();
  });
});

// search\\

//Enter click

const search = $(".search-all").append(
  ` <input type="search" id="search" placeholder="Search..." />`
);

$("#search").keyup(function (e) {
  // Search text

  let enter_button = e.keyCode;
  if (enter_button == 13) {
    var text = $(this).val();

    const request = new XMLHttpRequest();
    $(".search-list-items").remove();
    request.open(
      "GET",
      `https://api.jikan.moe/v3/search/anime?q=${text}&page=1`
    );

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        let serchValue = JSON.parse(this.responseText).results;
        console.log(serchValue);
        $(".search-list").show();
        //search card\\
        for (let index = 0; index < 4; index++) {
          $(".search-list")
            .append(`<div class="movie-list-item search-list-items">
  <i id="${index}" class="fa fa-heart "></i>
    <img class="movie-list-item-img" src="${
      serchValue[index].image_url
    }" alt="" />
    <span class="movie-list-item-title">${serchValue[index].title}</span>
    <p class="movie-list-item-desc">
    ${
      serchValue[index].start_date == null
        ? "coming soon"
        : serchValue[index].start_date
    }
    </p>
    <button id="${index}" class="movie-list-item-button details-btn">Details</button>
  </div>`);
        }

        $(".search-list").append();
        listCardWrapper.hide();
        $(".more-details-section").hide();

        //exit button\\
        $(".exit").click(() => {
          listCardWrapper.show();

          $(".search-list").hide();
        });
      }
    };
    request.send();
  }
});

//footer\\
$("body").append(` <div class="footer">
<p>All rights reserve &copy; <span>Omar Labib Hamdan</span> <br /></p>
</div>`);
