//database\\
const dataStorage = window.localStorage;

let arrayData = [
  {
    userName: "A16_Omar",
    email: "asd@qwe.com",
    password: "1234",
    fav: [],
    usersStatus: true,
  },
];

dataStorage.setItem("dataArray", JSON.stringify(arrayData));
dataUsers = JSON.parse(localStorage.getItem("dataArray"));
