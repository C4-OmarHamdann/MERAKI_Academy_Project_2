const listCardWrapper = $(".movie-list-wrapper");
const listCard = $(".movie-list");
const listCardTop = $(".movie-list-top");
$(".all-content").hide();
const myLoading = setTimeout(() => {
  $(".ring").fadeOut();
  $(".all-content").fadeIn();
}, 3000);

//auto login\\
dataUsers.forEach((element) => {
  if (element.usersStatus) {
    $("#id01").css("display", "none");
    $(".profile-text-container").css("display", "block").text(element.userName);
    $(".profile-picture").css("display", "block");
    $(".favlist").css("display", "block");
    $(".auth-list a").css("display", "block");
    $(".show-login").parent().hide();
    $(".show-signup").parent().hide();
  }
});
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

  for (let index = 0; index < 16; index++) {
    listCard.append(`<div class="movie-list-item">
    
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
      $(".add-to-fav").remove();
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
      $("#main-details").show();
      $(".details-background").append(
        `<button class="add-to-fav"><i class="fas fa-heart heartd ${e.target.id}"></i>&nbsp;Add To Favorite</button>`
      );

      //fav list\\
      $(".add-to-fav").on("click", () => {
        dataUsers.forEach((element, index) => {
          if (element.usersStatus) {
            dataUsers[0].fav.forEach((element) => {
              if (element.mal_id != top[e.target.id].mal_id) {
                element.fav.push(top[e.target.id]);
              } else {
              }
            });
          } else {
          }
        });
      });
    });
  });

  //details card

  $(".details-btn").click((e) => {
    $(".add-to-fav").remove();
    let index = e.target.id;
    const data = top[e.target.id];
    $(".heartd").remove();
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
    $("#main-details").show();
    $(".details-background").append(
      `<button class="add-to-fav"><i class="fas fa-heart heartd ${e.target.id}"></i>&nbsp;Add To Favorite</button>`
    );
    //fav list\\
    $(".add-to-fav").on("click", () => {
      dataUsers.forEach((element, index) => {
        if (element.usersStatus) {
          if (element.fav.indexOf(top[e.target.id]) == -1) {
            element.fav.push(top[e.target.id]);
            $(`.${e.target.id}`).remove();
          }
        } else {
        }
      });
    });
  });

  $(".exit").click(() => {
    listCardWrapper.show();
    $(".genres ul").html("");
    $("#main-details").hide();
  });
});

//TOGGLE DARKMODE

const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
  "#main-details,.container,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle"
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

$(".show-login").on("click", () => {
  $("#id01").css("display", "none");
});
$(".show-signup").on("click", () => {
  $("#id02").css("display", "none");
});

//create account\\
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
const pass = $(
  `<input class="s-psw" type="password" placeholder="Enter Password" name="psw" required />`
);
$(".psw").append(pass);
const passRepeat = $(
  `<input class="s-psw-r" type="password" placeholder="Repeat Password" name="psw-repeat" required />`
);
$(".psw-r").append(passRepeat);
const submit = $(".signupbtn");

submit.on("click", () => {
  $(".woring").remove();

  if (userName.val() && email.val() && pass.val() && passRepeat.val()) {
    dataUsers.forEach((element) => {
      if (email.val() !== element.email) {
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
      $(".sub-cat .movie-list-item").remove();
      elm.fav.forEach((element, index) => {
        $(".sub-cat").append(`<div class="movie-list-item">

      <img class="movie-list-item-img" src="${element.image_url}" alt="" />
      <span class="movie-list-item-title">${element.title}</span>
      <p class="movie-list-item-desc">
      ${element.synopsis}
      </p>

    </div>`);
      });
      listCardWrapper.hide();
      $("#main-details").hide();
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
    
      <img class="movie-list-item-img" src="${top[index].image_url}" alt="" />
      <span class="movie-list-item-title">${top[index].title}</span>
      <p class="movie-list-item-desc">
      ${top[index].start_date == null ? "coming soon" : top[index].start_date}
      </p>
      
    </div>`);
  }

  //show-more\\
  const showMore = $("#show-more-upcomming");
  showMore.on("click", () => {
    for (let index = 8; index < top.length; index++) {
      $(".upcomming-movie-list").append(`<div class="movie-list-item">
      
      <img class="movie-list-item-img" src="${top[index].image_url}" alt="" />
        <span class="movie-list-item-title">${top[index].title}</span>
        <p class="movie-list-item-desc">
        ${top[index].start_date == null ? "coming soon" : top[index].start_date}
        </p>
       
      </div>`);
    }
    showMore.remove();
  });

  //details card
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

        $(".search-list").show();
        //search card\\
        for (let index = 0; index < 4; index++) {
          $(".search-list .sub-cat-search")
            .append(`<div class="movie-list-item search-list-items">
 
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
    <button id="${index}" class="movie-list-item-button details-btn search-details">Details</button>
  </div>`);
        }
        //details card

        $(".search-details").click((e) => {
          $(".add-to-fav").remove();
          $("#main-details").hide();
          $("#search-details").show();
          let index = e.target.id;
          const data = serchValue[e.target.id];

          $("#search-details .header h1").text(data.title);
          $("#search-details .eps").text(data.episodes);
          $(".date").text(data.start_date.substring(0, 10));
          $("#search-details .score").text(data.score);

          $("#search-details .image").attr("src", data.image_url);

          $("#search-details .synopsis").text(data.synopsis);

          $(".search-list").hide();
          listCardWrapper.hide();

          $("#search-details .details-background").append(
            `<button class="add-to-fav"><i class="fas fa-heart heartd ${e.target.id}"></i>&nbsp;Add To Favorite</button>`
          );

          //fav list\\
          $(".add-to-fav").on("click", () => {
            dataUsers.forEach((element, index) => {
              if (element.usersStatus) {
                dataUsers[0].fav.forEach((element) => {
                  if (element.mal_id != top[e.target.id].mal_id) {
                    element.fav.push(top[e.target.id]);
                  } else {
                  }
                });
              } else {
              }
            });
          });
        });
        listCardWrapper.hide();

        $(".favlastIteams").hide();
        //exit button\\
        $(".exit").click(() => {
          listCardWrapper.show();
          $("#search-details").hide();
          $(".search-list").hide();
        });
      }
    };
    request.send();
    //exit button\\
    $(".exit").click(() => {
      listCardWrapper.show();
      $("#search-details").hide();
    });
  }
});

// to top
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});
