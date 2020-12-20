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

const userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts');


const listUsers = [
  {id: 1,
  email: 'mak@mail.com',
  password: '12345',
  displayName: 'MaksJS'
  },
  {
    id: 2,
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
    // console.log(email,password);
  },

  // login out
  logOut(hander){
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
      const userDisplayName = this.userName(email);// userName - 131 string
      const user ={id:listUsers.length+1,email,password,displayName: userDisplayName};
      listUsers.push(user);
      this.autorizedUser(user);
      handler();  
      console.log(listUsers);
      console.log(user); 
     
    } else {
      alert (' User was registration !'); 
    }
    
  },

// edit user
editUser(userName,userPhoto,handler){
  if(userName){
    this.user.displayName = this.userName(userName);
    this.user.email = userName;
  }
  if(userPhoto){
    this.user.photo = userPhoto;
  }
  handler();
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

  },
  // зчитує імя юзера(що є його поштою) та повертає результат у вигляді стрічки
  userName(email){
     return email.substring(0,(email.indexOf('@',0)));
  }
}
// робота з повідомленням, дописами
const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста 01',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее','новое','горячее','мое','случайность'],
      author: 'mak@mail.com',
      date: '11.11.2020, 20:54:00',
      like: 15,
      comments: 20,
    },
    {
      title: 'Заголовок поста 02',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
      tags: ['свежее','новое','мое','случайность'],
      author: 'kate@mail.com',
      date: '10.11.2020, 20:54:00',
      like: 45,
      comments: 10,
    }
  ]
}



//  перевіряє чи заповнена форма і визначає чи має бути показана форма логіну чи стан залогінення
// при початковому завантаженні - завантажується форма залогінення
const toggleAuthDom = ()=>{
  const user = setUsers.user;

  if (user){
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo ? user.photo : userAvatarElem.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
  // console.log('user = ',user);
  // console.log('new list =',listUsers);
};

const tegsPost = (tags)=>{
    let codeStr = '';
    tags.forEach(item=>{
     
       codeStr += `<a href="#" class="tag">#${item}</a>`;
    });
    return codeStr;
}

const showAllPosts =()=>{
  

  let postHTML = '';

  setPosts.allPosts.forEach(({title,text,tags,author,date,like,comments})=>{
    postHTML += `
    <section class="post">
    <div class="post-body">
      <h2 class="post-title">${title}</h2>
      <p class="post-text">${text}</p>     
      <div class="tags">
        ${tegsPost(tags)}
      </div>
      <!-- /.tags -->
    </div>
    <!-- /.post-body -->
    <div class="post-footer">
      <div class="post-buttons">
        <button class="post-button likes">
          <svg width="19" height="20" class="icon icon-like">
            <use xlink:href="img/icons.svg#like"></use>
          </svg>
          <span class="likes-counter">${like}</span>
        </button>
        <button class="post-button comments">
          <svg width="21" height="21" class="icon icon-comment">
            <use xlink:href="img/icons.svg#comment"></use>
          </svg>
          <span class="comments-counter">${comments}</span>
        </button>
        <button class="post-button save">
          <svg width="19" height="19" class="icon icon-save">
            <use xlink:href="img/icons.svg#save"></use>
          </svg>
        </button>
        <button class="post-button share">
          <svg width="17" height="19" class="icon icon-share">
            <use xlink:href="img/icons.svg#share"></use>
          </svg>
        </button>
      </div>
      <!-- /.post-buttons -->
      <div class="post-author">
        <div class="author-about">
          <a href="#" class="author-username">${setUsers.userName(author)}</a>
          <span class="post-time">${date}</span>
        </div>
        <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
      </div>
      <!-- /.post-author -->
    </div>
    <!-- /.post-footer -->
  </section>
    `;
  });

  postsWrapper.innerHTML = postHTML;
}

const init = ()=>{

  //  натискання кнопки =Input=
loginForm.addEventListener('submit', (event)=>{
  event.preventDefault();

  setUsers.logIn(emailInput.value,passwordInput.value,toggleAuthDom);
   loginForm.reset();
});

// натискання кнопки =Registration=
loginSignup.addEventListener('click',event =>{
 event.preventDefault();
 setUsers.signUp(emailInput.value,passwordInput.value,toggleAuthDom);
 loginForm.reset();
});

// open form change date
editElem.addEventListener('click',event=>{
 event.preventDefault();
 editContainer.classList.toggle('visible');
 editUsername.value = setUsers.user.displayName;
});

// listen button =exit=
exitElem.addEventListener('click',event=>{
 event.preventDefault();
 setUsers.logOut(toggleAuthDom);
});

// reading data form rewrite user's data

editContainer.addEventListener('submit',event=>{
 event.preventDefault();
 console.log("181 event = ",event.srcElement.innerText);
 setUsers.editUser(editUsername.value,editPhotoUrl.value,toggleAuthDom);
 editContainer.classList.remove('visible');
});

  showAllPosts();
  toggleAuthDom();
}

document.addEventListener('DOMContentLoaded',()=>{
  init();
})


