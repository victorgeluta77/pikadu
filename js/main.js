// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

// перевірка едектронної пошти за допомогою регулярного виразу
const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const editContainer = document.querySelector('.edit-container');
const editElem = document.querySelector('.edit');

const exitElem = document.querySelector('.exit');

const editUsername = document.querySelector('.edit-username');
const editPhotoUrl = document.querySelector('.edit-photo');


const listUsers = [
  {id: '01',
  email: 'mak@mail.com',
  password: '12345',
  displayName: 'MaksJS'
  },
  {
    id: '02',
    email: 'kate@mail.com',
    password: '123456',
    displayName: 'KateKillMaks'
  }
];

const setUsers = {
  user: null,
  // login in
  logIn(email,password,handler){
  //  перевіряємо емайл на валідність
    if(!regExpValidEmail.test(email)){
      alert ('Email doesn\'t valid' );
      return;
  }

    const user = this.getUser(email);
    if (user && user.password === password){
      this.autorizedUser(user);
      handler();
    } else {
      alert (' User does not find')
    }
    console.log(email,password);
  },

  // login out
  logOut(hander){
    console.log('loginOut');
    this.user = null;
    hander();
  },

  // Registration
  signUp(email,password,handler){

    if(!email.trim() || !password.trim()){
      alert ('Please Input your date !!');
      return;
    }

    if(!this.getUser(email)){
      const user ={email,password,displayName: email};
      listUsers.push(user);
      this.autorizedUser(user);
      handler();
      console.log(listUsers);
     
    } else {
      alert (' User was registration !');
      console.log(listUsers);
    }
    
  },
  // get email from user which registration
  getUser(email){
    // let user = null;
    // for (let i=0; i< listUsers.length; i++){
    //   if (listUsers[i].email === email){
    //       user = listUsers[i];
    //       break;
    //   }
    // }
    return listUsers.find(item=> item.email === email);
  },
  autorizedUser(user){
    this.user = user;
  },
  changeDate(){

  }
}
//  перевіряє чи заповнена форма і визначає чи має бути показана форма логіну чи стан залогінення
// при початковому завантаженні - завантажується форма залогінення
const toggleAuthDom = ()=>{
  const user = setUsers.user;
  console.log('user',user);
  if (user){
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};
//  натискання кнопки =Input=
loginForm.addEventListener('submit', (event)=>{
   event.preventDefault();

   setUsers.logIn(emailInput.value,passwordInput.value,toggleAuthDom);
    loginForm.reset();
});

// натискання кнопки =Registration=
loginSignup.addEventListener('click',event =>{
  event.preventDefault();
   console.log('elem buttom - ',event.srcElement.innerHTML);
  setUsers.signUp(emailInput.value,passwordInput.value,toggleAuthDom);
  loginForm.reset();
});

// open form change date
editElem.addEventListener('click',event=>{
  event.preventDefault();
  editContainer.classList.toggle('visible');
});

// listen button =exit=
exitElem.addEventListener('click',event=>{
  event.preventDefault();
  setUsers.logOut(toggleAuthDom);
});

// reading data form rewrite user's data

editContainer.addEventListener('click',event=>{
  event.preventDefault();

  setUsers.editUser(editUsername.value,editPhotoUrl.value);
});

toggleAuthDom();