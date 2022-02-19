<template>
<div class="wrapper">
    <section class="chat-area">
      <header>
        <div class="nav"> 
       
          <button  @click="goBack()">Déconnection</button>
        </div>
        <div class="details">
          <i class="fa-solid fa-user"></i>
          <span>{{user.name}}</span>
          <form   class="cart__order__form" @submit.prevent="createAPost"  autocomplete="off">
          <input type="text" name="userid" v-model="post.userid" hidden>
          <textarea id="message" type="text" name="message" v-model="post.content" class="input-field" placeholder="A quoi tu penses ..." autocomplete="off"></textarea>
          <div class="image">
              <label class="img">
                <input type="file" name="image" @change="onFileSelected" hidden/>
                <span class="icon">
                  <i class="fa-solid fa-image"></i>
                </span>
              </label>
          </div>        
          <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
          </form>
        </div>
      </header>
      <div class="box">
        <div class="message"  v-for="message in messages" :key="message.id">
          
          <div id="message_details" :class="`${message.id}`">          
            <i class="fa-solid fa-user"></i>
            <div class="info">
              <p>{{message.users.name}}</p>
              <span>{{message.createdAt}}</span>
            </div>
          </div>
          <div class="message_details">
            <div class="image">
              <img :src="`${message.imageUrl}`" alt="">
            </div>
            <p id="content">{{message.content}}</p>
          </div>
          <div class="like_dislike">
            <div class="likes">
            <button v-if="!userConnectedLikes.includes(message.id)"  type="button" class="btn btn-primary" @click="like(message.id)"><i class="far fa-thumbs-up" ></i>{{ message.likes }} </button>
            <button v-else  type="button" class="btn btn-primary" @click="unlike(message.id)"><i id="blue" class="fas fa-thumbs-up" ></i>{{ message.likes }} </button>
          </div>
            <div class="commenter">
               <button v-if="commentFromPost.includes(message.id)" v-on:click="goToComment(message)">
                  <i class="fa-solid fa-comments"></i> 
                  <i id="circle" class="fa-solid fa-circle"></i>                           
                  <span>commentaires</span>
               </button>
               <button v-else v-on:click="goToComment(message)">
                  <i class="fa-solid fa-comment"></i>                             
                  <span>commentaires</span>
               </button>
            </div> 
            <div class="dislikes">
                <button v-if="!userConnectedDislikes.includes(message.id)"  type="button" class="btn btn-primary" @click="dislike(message.id)">{{ message.dislikes }} <i class="far fa-thumbs-down" ></i></button>
                <button v-else  type="button" class="btn btn-primary" @click="undislike(message.id)">{{ message.dislikes }} <i id="blue" class="fas fa-thumbs-down" ></i></button>
              </div>
          </div>
        </div>
      </div>
      
    </section>
  </div>
  </template>
<script>

export default {
  name: "#user",
  data() {
    return {
      commentaire: [],
      messages: [ {
           id: {},
           user_id: {},
           content: {},
           imageUrl:{},
           users:{
             name:{}
           }
       }],
       user:[{
         user_id: {},
         name: {},
         likes:[{}]
       }],
       post:{},
       props: {
         msg: {}
       },
       likes: {},
       dislikes: [],
       cart:[],
       userConnectedLikes: [],
       userConnectedDislikes: [],
       commentFromPost: [],
       selectedFile: [],
       file:[]
    };
  },
   beforeMount(){
    this.getAllPosts();
    this.getUser();
    this.getUserConnectedLikes();
    this.getUserConnectedDislikes();
    this.getcommentFromPost();
  },
  methods: {
     goBack(){
      return this.$router.go(-1)
    },
    onFileSelected(event){
      this.selectedFile = event.target.files[0]
      this.selectedFile.filename = event.target.files[0].name
      console.log(this.selectedFile)
  
    },

    goToComment(message){
      this.cart.id = message.id,
      this.cart.user_id = message.userId,
      this.cart.name = message.users.name
    
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      let id = lastURLSegment; 
      const messageId = message.id  

      const self = this;
      self.$router.push({name: 'Comment', params: {id: id, postId : messageId} });
    },

    getAllPosts() {
      fetch('http://localhost:3000/api/post/all')
      .then(response => response.json() )
      .then(data => {
        this.messages = data
      })
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
  
    async getUser(){
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      let id = lastURLSegment;  
      const res1 = await fetch('http://localhost:3000/api/auth/user/' + id);
      const data1 = await res1.json();
      this.user = data1;
      console.log("user:",data1);

     
    },
 
     createAPost() {
    const content= this.post.content;

     let formData = new FormData();
     formData.append( 'image',this.selectedFile);
     formData.append( 'userId', this.user.id);
     formData.append( 'content', content);
    
      fetch(
        "http://localhost:3000/api/post",
        {
          method: "POST",
          body: formData
        })
        
    },

    getcommentFromPost() {
  
      fetch('http://localhost:3000/api/post/comment/all')
      .then(response => response.json() )
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          this.commentFromPost.push(data[i].postId)
        }
      })
    },

}}

</script>

<style>

header{
    position: fixed;
    flex-direction: column;
    border-radius: 17px;
    background: white;
    width: 100%;
    top: 6%;
    left: 50%;
    transform: translate(-50%, -50%);
   
}

header .nav{
  position: absolute;
  right: 13%;
  top: 30%;
}

.nav button{
  border: none;
  border-radius: 17px;
  padding: 0rem 0.5rem;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
header .details{
    background: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    border-radius: 17px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 80%;
    padding-top: 4rem;
}
.details form{
display: flex;
flex: 1;
align-items: center;
width: 60%;
}
.details form textarea{
  border-radius: 17px 0px 0px 17px;
  background: rgb(235, 235, 235);
  color: gray;
  flex-grow: 2;
  border: none;
  padding: 0.5rem 1rem;
  height: 90% ;

}
.details span{
  margin: 0rem 0.5rem;
}
.details i{
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: lavender;
  display: flex;
  justify-content: center;
  align-items: center;
}
.details button{
  border: none;
  background: white;
  pointer-events: all;
  cursor: pointer;
  height: 30%;
}
.details button i{
  width: 50px;
  height: 30px;
  border-radius: 25px 0px 0px 25px;

  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon i {
 background: rgba(1, 27, 172, 0.363);
 border-radius: 0px 17px 17px 0px;
 height: 56px;
margin-right: 0.5rem;
cursor: pointer;
}
.box{
  padding-top: 10rem;
  
}
.message{
    background: white;
    margin-top: 1.25rem;
    border-radius: 16px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}
#message_details{
display: flex;
align-items: center;
}
#message_details .info {
 
align-items: center;
 margin-left: 0.5rem;
 justify-content: start;
 text-align: start;
}
#message_details .info span{
  color: grey;
  font-size: 11px;
}
#message_details .info p{
  font-size:larger;
  
}
#message_details i{
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin: 0.5rem;
  background: lavender;
  display: flex;
  justify-content: center;
  align-items: center;
}
.message_details p{
  padding: 1rem;
  text-align: start;
}
.image img {
  width: 80%;
}
.like_dislike{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 1rem;
  border-radius: 0px 0px 16px 16px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-top: 0.5px solid rgb(214, 214, 214);
  color: grey;
}
.like_dislike span{
  margin-left: 0.25rem;
  align-items: center;
}
.likes, .dislikes, .commenter{
 font-size: 12px;
 align-items: center;
 display: flex;
 cursor: pointer;
 
}
.commenter button{
  border: none;
  background: none;
  color: grey;
  cursor: pointer;
}
.likes i, .dislikes i {
  padding: 3px 5px;
  transition: 0.2s;
  cursor: pointer;
}
.likes i:hover, .dislikes i:hover{
  animation: scaler 0.8s infinite linear;
}
.fa-thumbs-up:hover, .fa-thumbs-down:hover {
            color: rgba(38, 77, 251, 0.5);
          }

 .likes button , .dislikes button{
   border: none;
  background: none;
  color: grey;
  cursor: pointer;
                
                }

  .likes  #blue, .dislikes  #blue{
color: rgb(0, 41, 221);
  }
    .message .user_details{
        display: flex;
        justify-content: flex-start;
        align-content: center;
    }

    .commenter #circle {
      color: red;
      font-size: 8px;
      position: absolute;

    }
    #commentaires{
      position: absolute;
      top: 70%;
      left: 50%;
      height: 100%;
      transform: translate(-50%, -50%);
      background: white;
    
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 17px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
   
    #commentaire form{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      width: 25rem;
      height: 10rem;
    }
    form button{
      background: rgb(228, 228, 228);
      padding: 0 1rem;
      border-radius: 17px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    border: none;
    cursor: pointer;
    }
    form textarea{
    width: 25rem;
    height: 5rem;
    resize:both;
    overflow: auto;
    background: lightgray;
    color: gray;
    border: none;
    border-radius: 17px;
    outline: none;
    padding: 0.5rem;
    }
    .commentairePoster{
      border-top: 1px solid;
      border-radius: 17px 17px 0px 0px;
    }
</style>