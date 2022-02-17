<template>
    <div>
      <div >
        <i @click="toggle = !toggle" class="fa-solid fa-circle-xmark"></i>
        <p> laisser un Commentaire</p>
        <div id="message_details">          
            <i class="fa-solid fa-user"></i>
            <div class="info">
              <p>{{messages.users.name}}</p>
              <span>{{messages.createdAt}}</span>
            </div>
          </div>
          <div class="message_details">
            <p>{{messages.content}}</p>
          </div>
 
        <form class="form" method="POST" @submit.prevent="createAcomment" >
          <textarea id="comment" placeholder="Pour commenter, c'est ici que ça se passe!"></textarea>
          <input type="hidden" name="user_id" value="{{user.user_id}}" hidden >
          <input type="hidden" id="post_id" value="{{message.id}}" hidden >
          <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
        <div class="commentairePoster">
          <p id="noComm">Commentaires sur le post</p>
           <div class="box-comm">
      <div class="message" v-for="comment in comments" :key="comment.id">
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
            <div class="commenter">
               <button v-if="commentFromPost.includes(comment.id)" v-on:click="goToComment(comment)">
                  <i class="fa-solid fa-comments"></i> 
                  <i id="circle" class="fa-solid fa-circle"></i>                           
                  <span>commentaires</span>
               </button>
               <button v-else v-on:click="goToComment(comment)">
                  <i class="fa-solid fa-comment"></i>                             
                  <span>commentaires</span>
               </button>
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
    this.getUser();
    this.getComment();
    this.getThePost();
    this.getUserConnectedLikes();
    this.getUserConnectedDislikes();
  },
  methods: {
   
     async getComment(){
       var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      let id = lastURLSegment;  
      const res = await fetch('http://localhost:3000/api/post/comment/all/' + id);
      const data2 = await res.json();
      this.comments = data2;
      if(data2 == ""){
        const noComm = document.getElementById('noComm');
        noComm.innerHTML= "Il n'y a pas encore de commentaires sur ce post ..."; 
      }
    },
    
    async getUser(){
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.split('/');
      console.log(lastURLSegment);
      let id = lastURLSegment[5];  
      console.log(id)
      const res1 = await fetch('http://localhost:3000/api/auth/user/' + id);
      const data1 = await res1.json();
      this.user = data1;
      console.log("users:",data1);
    },

    getThePost() {
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      let id = lastURLSegment;   
      fetch('http://localhost:3000/api/post/' + id)
      .then(response => response.json() )
      .then(data => {
        this.messages = data
      })
    },
    
    createAcomment() {
       var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      let postId = lastURLSegment;  
      const comment = document.getElementById('comment').value;
   
      const postData = {
        postId: postId,
        userId: this.user.id,
        message: comment
      };
      
        console.log(postData);
      fetch("http://localhost:3000/api/post/comment",{
        method: "POST",
        headers: { 'Accept': 'application/json',
        'Content-Type': 'application/json'},
        body: JSON.stringify(postData)
      })
      .then(function (res) {
        if (res.ok) {
          console.log("commentaire envoyé !!")
        }
      });
    },
      unlike(id) {
      fetch("http://localhost:3000/api/post/like",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          "postId": id,
          "userId":1,
          "mode": 0
        })
      })

      this.userConnectedLikes.splice(this.userConnectedLikes.indexOf(id, 1))
      /*rafraichir la liste des messages en relançant la requete ou mettre à jour le tableau de post local*/
      for (let i = 0; i < this.messages.length; i++) {
        if(this.messages[i].id === id) {
            this.messages[i].likes -= 1;
        }
      }

    },

    like(id) {
      fetch("http://localhost:3000/api/post/like",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            "postId": id,
            "userId":1,
            "mode": 1
        })
      })

      this.userConnectedLikes.push(id)
      /*rafraichir la liste des messages en relançant la requete ou mettre à jour le tableau de post local*/
      for (let i = 0; i < this.messages.length; i++) {
        if(this.messages[i].id === id) {
          if( this.messages[i].likes === null)
            this.messages[i].likes = 1;
          else
            this.messages[i].likes += 1;
        }
      }


    },

    dislike(id) {
      fetch("http://localhost:3000/api/post/dislike",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            "postId": id,
            "userId":1,
            "mode": 1
        })
      })

      this.userConnectedDislikes.push(id)
      /*rafraichir la liste des messages en relançant la requete ou mettre à jour le tableau de post local*/
      for (let i = 0; i < this.messages.length; i++) {
        if(this.messages[i].id === id) {
          if( this.messages[i].dislikes === null)
            this.messages[i].dislikes = 1;
          else
            this.messages[i].dislikes += 1;
        }
      }
    },

    undislike(id) {
      fetch("http://localhost:3000/api/post/dislike",{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          "postId": id,
          "userId":1,
          "mode": 0
        })
      })

      this.userConnectedDislikes.splice(this.userConnectedDislikes.indexOf(id, 1))
      /*rafraichir la liste des messages en relançant la requete ou mettre à jour le tableau de post local*/
      for (let i = 0; i < this.messages.length; i++) {
        if(this.messages[i].id === id) {
            this.messages[i].dislikes -= 1;
        }
      }

    },

    getUserConnectedLikes() {
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      let id = lastURLSegment;  
      fetch('http://localhost:3000/api/post/like/'+ id)
      .then(response => response.json() )
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          this.userConnectedLikes.push(data[i].postId)
        }
        console.log( this.userConnectedLikes)
      })
    },

    getUserConnectedDislikes() {
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      let id = lastURLSegment;  
      fetch('http://localhost:3000/api/post/dislike/'+ id)
      .then(response => response.json() )
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          this.userConnectedDislikes.push(data[i].postId)
        }
        console.log( this.userConnectedDislikes)
      })
    },
}}

</script>
