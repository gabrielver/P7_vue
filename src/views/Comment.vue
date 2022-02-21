<template>
    <div>
      <div >
        <i @click="goBack()" class="fa-solid fa-circle-xmark"></i>
        <p> laisser un Commentaire</p>
        <div id="message_details">          
            <i class="fa-solid fa-user"></i>
            <div class="info">
              <p>{{messages.users.name}}</p>
              <span>{{messages.createdAt}}</span>
            </div>
          </div>
           <div class="image">
              <img :src="`${messages.imageUrl}`" alt="">
            </div>
          <div class="message_details">
            <p>{{messages.content}}</p>
          </div>
 
        <form class="form" method="POST" @submit.prevent="createAcomment" >
          <textarea id="comment"  v-model="post.content" placeholder="Pour commenter, c'est ici que ça se passe!"></textarea>
          <input type="hidden" name="user_id" value="{{user.user_id}}" hidden >
          <input type="hidden" id="post_id" value="{{message.id}}" hidden >
          <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
        <div class="commentairePoster">
          <p id="noComm">Commentaires sur le post</p>
           <div class="box-comm">
      <div class="message" v-for="comment in comments" :key="comment.id">
          <div v-if="user.id == 1" id="delete" @click="del(comment.id)" >
              <i  class="fa-solid fa-circle-xmark"></i>
            </div>
        <div id="message_details" :class="`${comment.id}`">          
          <i class="fa-solid fa-user"></i>
          <div class="info">
            <p>{{comment.users.name}}</p>
            <span>{{comment.createdAt}}</span>
          </div>
        </div>
       
        <div class="message_details">
          <p>{{comment.message}}</p>
        </div>
       <div class="like_dislike">
            <div class="likes">
            <button v-if="!userConnectedLikes.includes(comment.id)"  type="button" class="btn btn-primary" @click="like(comment.id)"><i class="far fa-thumbs-up" ></i>{{ comment.likes }} </button>
            <button v-else  type="button" class="btn btn-primary" @click="unlike(comment.id)"><i id="blue" class="fas fa-thumbs-up" ></i>{{ comment.likes }} </button>
          </div>
            <div class="dislikes">
                <button v-if="!userConnectedDislikes.includes(comment.id)"  type="button" class="btn btn-primary" @click="dislike(comment.id)">{{ comment.dislikes }} <i class="far fa-thumbs-down" ></i></button>
                <button v-else  type="button" class="btn btn-primary" @click="undislike(comment.id)">{{ comment.dislikes }} <i id="blue" class="fas fa-thumbs-down" ></i></button>
              </div>
          </div>
      </div>
      </div>
        </div>
      </div>
    </div>
    
</template>
<script>
export default {
  name: "Comment",
  data() {
    return {
      commentaire: [],
      toggle : false,
       messages: [],
       user:[],
       post:{},
       comments:[],
       likes: [],
       dislikes: [],
       userConnectedLikes: [],
       userConnectedDislikes: [],
    };
  },
   beforeMount(){
    this.checkSession();
    this.getUser();
    this.getComment();
    this.getThePost();
    this.getUserConnectedLikes();
    this.getUserConnectedDislikes();
  },
  methods: {
    async checkSession(){
      const token = localStorage.getItem('token');
      console.log(token);
      if(!token){
      const self = this;
      self.$router.push({name: 'Login'});
      }

    },
    async del(id){
      console.log(id);
      await fetch(
        "http://localhost:3000/api/post/comment/" + id,
        {
          method: "delete",
          headers: { 'Authorization':  localStorage.getItem('token')},
        })
        this.getComment();
    },
    goBack(){
      return this.$router.go(-1)
    },
     async getComment(){
       var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      let id = lastURLSegment;  
      const res = await fetch('http://localhost:3000/api/post/comment/all/' + id,
      {
        headers:{
          'Authorization':  localStorage.getItem('token')
        }
      });
      const data2 = await res.json();
      this.comments = data2;
      if(data2 === null){
        const noComm = document.getElementById('noComm');
        noComm.innerHTML= "Il n'y a pas encore de commentaires sur ce post"; 
      }
    },
    
    async getUser(){
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.split('/');
      let id = lastURLSegment[5];  
      const res1 = await fetch('http://localhost:3000/api/auth/user/' + id,
      {
        headers:{
          'Authorization':  localStorage.getItem('token')
        }
      });
      const data1 = await res1.json();
      this.user = data1;
      console.log("users:",data1);
    },

    getThePost() {
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      let id = lastURLSegment;   
      fetch('http://localhost:3000/api/post/' + id,
      {
        headers:{
          'Authorization':  localStorage.getItem('token')
        }
      })
      .then(response => response.json() )
      .then(data => {
        this.messages = data
      })
    },
    
    async createAcomment() {
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      let postId = lastURLSegment;  
      // let comment = document.getElementById('comment').value;
   
      const postData = {
        postId: postId,
        userId: this.user.id,
        message: this.post.content
      };
      
        console.log(postData);
     await fetch("http://localhost:3000/api/post/comment",{
        method: "POST",
        headers: { 'Accept': 'application/json',
        'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('token')},
        body: JSON.stringify(postData)
      })
      .then(function (res) {
        if (res.ok) {
          console.log("commentaire envoyé !!")
          
        }
      });
          this.post.content = "";
          this.getComment()
    },
    unlike(id) {
       var pageURL = window.location.href;
      var lastURLSegment = pageURL.split('/');
      let userId = lastURLSegment[5]; 
      fetch("http://localhost:3000/api/post/comment/like",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('token')
        },

        body: JSON.stringify({
          "commentId": id,
          "userId":userId,
          "mode": 0
        })
      })

      this.userConnectedLikes.splice(this.userConnectedLikes.indexOf(id, 1))
      /*rafraichir la liste des messages en relançant la requete ou mettre à jour le tableau de post local*/
      for (let i = 0; i < this.comments.length; i++) {
        if(this.comments[i].id === id) {
            this.comments[i].likes -= 1;
        }
      }

    },

    like(id) {
       var pageURL = window.location.href;
      var lastURLSegment = pageURL.split('/');
      let userId = lastURLSegment[5];  
      fetch("http://localhost:3000/api/post/comment/like",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('token')
        },

        body: JSON.stringify({
            "commentId": id,
            "userId": userId,
            "mode": 1
        })
      })

      this.userConnectedLikes.push(id)
      /*rafraichir la liste des messages en relançant la requete ou mettre à jour le tableau de post local*/
      for (let i = 0; i < this.comments.length; i++) {
        if(this.comments[i].id === id) {
          if( this.comments[i].likes === null)
            this.comments[i].likes = 1;
          else
            this.comments[i].likes += 1;
        }
      }


    },

    dislike(id) {
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.split('/');
      let userId = lastURLSegment[5];  
      fetch("http://localhost:3000/api/post/comment/dislike",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('token')
        },

        body: JSON.stringify({
            "commentId": id,
            "userId":userId,
            "mode": 1
        })
      })

      this.userConnectedDislikes.push(id)
      /*rafraichir la liste des messages en relançant la requete ou mettre à jour le tableau de post local*/
      for (let i = 0; i < this.messages.length; i++) {
        if(this.comments[i].id === id) {
          if( this.comments[i].dislikes === null)
            this.comments[i].dislikes = 1;
          else
            this.comments[i].dislikes += 1;
        }
      }
    },

    undislike(id) {
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.split('/');
      let userId = lastURLSegment[5];  
      fetch("http://localhost:3000/api/post/comment/dislike",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':  localStorage.getItem('token')
        },

        body: JSON.stringify({
          "commentId": id,
          "userId":userId,
          "mode": 0
        })
      })

      this.userConnectedDislikes.splice(this.userConnectedDislikes.indexOf(id, 1))
      /*rafraichir la liste des messages en relançant la requete ou mettre à jour le tableau de post local*/
      for (let i = 0; i < this.comments.length; i++) {
        if(this.comments[i].id === id) {
            this.comments[i].dislikes -= 1;
        }
      }

    },

    getUserConnectedLikes() {
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.split('/');
      let id = lastURLSegment[5];  
      fetch('http://localhost:3000/api/post/comment/like/'+ id,
      {
        headers:{
          'Authorization':  localStorage.getItem('token')
        }
      })
      .then(response => response.json() )
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          this.userConnectedLikes.push(data[i].commentId)
        }
        console.log("likes:",this.userConnectedLikes)
      })
    },

    getUserConnectedDislikes() {
     var pageURL = window.location.href;
      var lastURLSegment = pageURL.split('/');
      let id = lastURLSegment[5];  
      fetch('http://localhost:3000/api/post/comment/dislike/'+ id,
      {
        headers:{
          'Authorization':  localStorage.getItem('token')
        }
      })
      .then(response => response.json() )
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          this.userConnectedDislikes.push(data[i].commentId)
        }
        console.log( "dislikes:",this.userConnectedDislikes)
      })
    },
}}

</script>
