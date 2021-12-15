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
// dataStorage.setItem("dataArray", JSON.stringify(arrayData));
