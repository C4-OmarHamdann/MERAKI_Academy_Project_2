//database\\
const dataStorage = window.localStorage;
let dataUsers = [];
let arrayData = [
  {
    userName: "A16_Omar",
    email: "asd@qwe.com",
    password: "1234",
    fav: [],
    usersStatus: false,
  },
];

dataStorage.setItem("dataArray", JSON.stringify(arrayData));
dataUsers = JSON.parse(localStorage.getItem("dataArray"));
