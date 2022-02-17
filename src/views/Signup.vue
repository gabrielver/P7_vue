<template>
  <div id="app">
      <div class="wrapper">
        <section class="form login">
          <header>GROUPOMANIA social wall</header>
          <form class="cart__order__form" @submit.prevent="signup"  autocomplete="off">
            <div id="alert"></div>
            <div id="signup">
              <div class="field input">
                <label>Name</label>
                <input type="text" id="name" v-model="post.name" placeholder="Enter your Name" required>
              </div>
              <div class="field input">
                <label>pseudo</label>
                <input type="text"  id="pseudo" v-model="post.pseudo" placeholder="Enter your pseudo" required>
              </div>
              <div class="field input">
                <label>Email Address</label>
                <input type="email"  id="email" v-model="post.email" placeholder="Enter your email" required>
              </div>
              <div class="field input">
                <label>Password</label>
                <input type="text"  id="password" v-model="post.password" placeholder="Enter your password" required>
                <i class="fas fa-eye"></i>
              </div>
              <div class="field input">
                <label>Password confirmation</label>
                <input type="text"  id="password_conf" v-model="post.passwordConf" placeholder="confirm your password" required>
                <i class="fas fa-eye"></i>
              </div>
              <div class="field button">
                <button
                type="submit" class="button" :class="{'button--disable' : !validatedFields}" >Connexion</button>
              </div>
              </div>
          </form>
          <div class="link">Already signed up? <router-link :to="{name:'Login'}" replace>Login now</router-link></div>
          
        </section>
      </div>
      
        </div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      post: {},
      data: {},
      idx:{}
    };
  },
   computed: {
    validatedFields: function () {
        if (this.post.email != "" && this.post.name != "" && this.post.pseudo != "" && this.post.password != "" && this.post.passwordConf != "") {
          return true;
        } else {
          return false;
        }
      
    },
  
  },
  methods: {
    async signup() {
     const self = this;
      let idx = "";
      let token = "";
      let pseudo = "";
      const postData = {
        name: this.post.name,
        pseudo: this.post.pseudo,
        email: this.post.email,
        password: this.post.password,
      };
      console.log(postData)
      fetch(
        "http://localhost:3000/api/auth/signup",
        {
          method: "POST",
          headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json'},
          body: JSON.stringify(postData)
        })
        .then(function(res){
          if (res.ok){  
            return res.json();
         //self.$router.push({ name: 'Profile', params: {id: "name1" } , replace: true});
        }else{
          if (res.status == 401){  
        const errorText = document.querySelector("#alert");
         errorText.innerHTML =  "email déjà enregister";
          }
        }
      })
      .then (function(data) {
          idx = data.userId,
          token = data.token,
          pseudo = data.pseudo,
         
          self.$router.push({ name: 'Profile', params: {id : idx } });
        });
        return (idx, token, pseudo) }
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
}
body {
  
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f7f7f7;
  padding: 0 15%;
}
.wrapper {
  background: #fff;

  width: 100%;
  border-radius: 16px;
  box-shadow: 0 0 128px 0 rgba(0, 0, 0, 0.1),
    0 32px 64px -48px rgba(0, 0, 0, 0.5);
}

/* Login & Signup Form CSS Start */

#alert{
  background: rgba(255, 0, 0, 0.336);
  color: red;
}
.form {
  padding: 25px 30px;
}
.form header {
  font-size: 25px;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e6e6;
}
.form form {
  margin: 20px 0;
}
.form form .error-text {
  color: #721c24;
  padding: 8px 10px;
  text-align: center;
  border-radius: 5px;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  margin-bottom: 10px;
  display: none;
}
.form form .name-details {
  display: flex;
}
.form .name-details .field:first-child {
  margin-right: 10px;
}
.form .name-details .field:last-child {
  margin-left: 10px;
}
.form form .field {
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  position: relative;
}
.form form .field label {
  margin-bottom: 2px;
}
.form form .input input {
  height: 40px;
  width: 100%;
  font-size: 16px;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.form form .field input {
  outline: none;
}
.form form .image input {
  font-size: 17px;
}
.form form .button input {
  height: 45px;
  border: none;
  color: #fff;
  font-size: 17px;
  background: #333;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 13px;
}
.form form .field i {
  position: absolute;
  right: 15px;
  top: 70%;
  color: #ccc;
  cursor: pointer;
  transform: translateY(-50%);
}
.form form .field i.active::before {
  color: #333;
  content: "\f070";
}
.form .link {
  text-align: center;
  margin: 10px 0;
  font-size: 17px;
}
.form .link a {
  color: #333;
}
.form .link a:hover {
  text-decoration: underline;
}
.chat-area header {
  display: flex;
  align-items: center;
  padding: 18px 30px;
}
.chat-area{
  background: #e2e2e2;
}
.chat-area header .back-icon {
  color: #333;
  font-size: 18px;
}
.chat-area header img {
  height: 45px;
  width: 45px;
  margin: 0 15px;
  border-radius: 25px;
}
.chat-area header .details span {
  font-size: 17px;
  font-weight: 500;
}
.chat-box {
  position: relative;
  min-height: 500px;
  max-height: 500px;
  overflow-y: auto;
  padding: 10px 30px 20px 30px;
  background: #f7f7f7;
  box-shadow: inset 0 32px 32px -32px rgb(0 0 0 / 5%),
    inset 0 -32px 32px -32px rgb(0 0 0 / 5%);
}
.chat-box .text {
  position: absolute;
  top: 45%;
  left: 50%;
  width: calc(100% - 50px);
  text-align: center;
  transform: translate(-50%, -50%);
}
.chat-box .chat {
  margin: 15px 0;
}
.chat-box .chat p {
  word-wrap: break-word;
  padding: 8px 16px;
  box-shadow: 0 0 32px rgb(0 0 0 / 8%), 0rem 16px 16px -16px rgb(0 0 0 / 10%);
}

.chat-box .incoming {
  background-color: aqua;
  border-radius: 25px;
  margin: 2rem 0rem;
}
.chat-box .incoming img {
  height: 35px;
  width: 35px;
  border-radius: 25px;
}

.incoming .user {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}
.incoming .user span {
  margin-left: 1rem;
}
.incoming .user p {
  position: absolute;
  right: 30px;
  font-size: 9px;
  border-radius: 25px;
}
.chat-box .incoming .details {
  margin-right: auto;
}
.incoming .details p {
  background: #fff;
  color: #333;
  border-radius: 0px 10px 10px 10px;
}
.incoming .details button {
  background: #fff;
  color: #333;
  position: relative;
  top: 25px;
  left: 300px;
  font-size: 22px;
  border-radius: 17px;
}
.incoming .details span {
  position: relative;
  top: 0px;
  left: 280px;
}
.typing-area {
  padding: 18px 30px;
  display: flex;
  justify-content: space-between;
}
.typing-area input {
  height: 45px;
  width: calc(100% - 58px);
  font-size: 16px;
  padding: 0 13px;
  border: 1px solid #e6e6e6;
  outline: none;
  border-radius: 5px 0 0 5px;
}
.typing-area button {
  color: #fff;
  width: 55px;
  border: none;
  outline: none;
  background: #333;
  font-size: 19px;
  cursor: pointer;
  opacity: 1;
  pointer-events: auto;
  border-radius: 0 5px 5px 0;
  transition: all 0.3s ease;
}


.comment .typing-comment {
  padding: 9px 15px;
  display: flex;
  justify-content: space-between;
}
.comment .typing-comment input {
  height: 45px;
  width: calc(100% - 58px);
  font-size: 16px;
  padding: 0 13px;
  border: 1px solid #e6e6e6;
  outline: none;
  border-radius: 5px 0 0 5px;
}


.more {
  display: flex;
  justify-content: center;
  text-align: center;
}

/* Responive media query */
@media screen and (max-width: 450px) {
  .chat-area header {
    padding: 15px 20px;
  }
  .chat-box {
    min-height: 400px;
    padding: 10px 15px 15px 20px;
  }
  .chat-box .chat p {
    font-size: 15px;
  }
  .chat-box .outogoing .details {
    max-width: 230px;
  }
  .chat-box .incoming .details {
    max-width: 265px;
  }
  .incoming .details img {
    height: 30px;
    width: 30px;
  }
  .chat-area form {
    padding: 20px;
  }
  .chat-area form input {
    height: 40px;
    width: calc(100% - 48px);
  }
  .chat-area form button {
    width: 45px;
  }
}

</style>