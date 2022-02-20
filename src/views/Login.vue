<template>
  <div id="app">
      <div class="wrapper">
        <section class="form login">
          <header>GROUPOMANIA social wall</header>
          <form class="cart__order__form" @submit.prevent="login"  autocomplete="off">
            <div class="error-text"></div>
            <div id="signup">
              <div class="field input">
                <label>Email Address</label>
                <input type="email"  id="email" v-model="post.email" placeholder="Enter your email" required>
              </div>
              <div class="field input">
                <label>Password</label>
                <input type="password"  id="password" v-model="post.password" placeholder="Enter your password" required>
                <i class="fas fa-eye" @click="switchVisibility()"></i>
              </div>
              <div class="field button">
                <button
                type="submit" class="button">Connexion</button>
              </div>
              </div>
          </form>
          <div class="link">Not yet signed up? <router-link :to="{name:'Signup'}" replace>Signup now</router-link></div>
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
  methods: {
      switchVisibility(){
      const passwordField = document.getElementById('password');
      if(passwordField.getAttribute('type') === 'password'){
        passwordField.setAttribute('type','text');
      }else{
         passwordField.setAttribute('type','password');
      }
    },
    async login() {
      const self = this;
      let idx = "";
      let token = "";
      let pseudo = "";
      const postData = {
        email: this.post.email,
        password: this.post.password,
      };
      fetch(
        "http://localhost:3000/api/auth/login",
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
        }
        })
        .then (function(data) {
          localStorage.setItem('token', data.token);
          console.log(data.token)
          idx = data.userId,
          
         
          self.$router.push({ name: 'Profile', params: {id : idx } });
        });
        return (idx, token, pseudo) }

  }
};
</script>