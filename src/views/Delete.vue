<template>
  <div id="app">
      <div class="wrapper">
        <section class="form login">
          <header class="delete" >Pour supprimer votre compte, veuillez inserer votre email et mot de passe</header>
          <form class="cart__order__form" @submit.prevent="deleteUser"  autocomplete="off">
            <div id="error-text"></div>
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
                type="submit" class="button">supprimer mon compte</button>
              </div>
              </div>
          </form>
          <div class="warning"><p>Attention, toute suppression est definitive !</p></div>
          <div class="link">Tu as changé d'avis ?<router-link :to="{name:'Login'}" replace> Connecte toi ici</router-link></div>
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
  async deleteUser() {
    const done = document.getElementById('error-text')
      const postData = {
        email: this.post.email,
        password: this.post.password,
      };
      fetch(
        "http://localhost:3000/api/auth/userDelete",
        {
         method: "post",
          headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json'},
          body: JSON.stringify(postData)
        })
        
        .then(function(res){
          if (res.ok){ 
            return res.json();
        }
        })
            this.post.email = "";
            this.post.password = "";
            done.innerHTML = "Votre compte à bien été supprimé ";
            } 
}
}
</script>
<style>
#ErrorMsg{
  background: rgba(255, 0, 0, 0.171);
  color: red;
  
}
.delete {
  top: 7%;
}
.warning {
  color: red;
  font-size: 20px;
}
</style>