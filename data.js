//database\\
const dataStorage = window.localStorage;
dataStorage.setItem;
let arrayData = [
  {
    userName: "A16_Omar",
    email: "asd@qwe.com",
    password: "1234",
    fav: [],
    usersStatus: false,
  },
];

let dataUsers = JSON.parse(localStorage.getItem("dataArray"));

//footer\\
$("body").append(` <footer>
<p>All rights reserve &copy; <span>Omar Labib Hamdan</span> <br /></p>
</footer>`);
