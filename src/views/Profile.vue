<template>
<div class="wrapper">
    <section class="chat-area">
      <header>
        <div class="head">
        <div class="nav">
          <a href="" class="back-icon"><i class="fas fa-arrow-left"></i></a>
          <button>se deconnecter</button>
        </div>
        <div class="details">
          <i class="fa-solid fa-user"></i>
          <span>{{user.name}}</span>
          <form  class="cart__order__form" @submit.prevent="createAPost"  autocomplete="off">
          <input type="text" name="userid" v-model="post.userid" hidden>
          <input type="text" name="message" v-model="post.content" class="input-field" placeholder="A quoi tu penses ..." autocomplete="off">
          <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
          </form>
        </div>
        </div>
      </header>
      <div class="box">
      <div class="message" v-for="message in messages" :key="message.id">
        <div id="message_details" :class="`${message.id}`">          
          <i class="fa-solid fa-user"></i>
          <div class="info">
            <p>{{message.users.name}}</p>
            <span>{{message.createdAt}}</span>
          </div>
        </div>
        <div class="message_details">
          <p>{{message.content}}</p>
        </div>
        <div class="like_dislike">
          <div class="likes">
            <i class="fa-solid fa-thumbs-up"></i>
            <span >like</span>
          </div>
          <div class="commenter"  @click="toggle = !toggle" id="user">
            <i class="fa-solid fa-comment"></i>
            <span>commenter</span>
          </div> 
          <div class="dislikes">
            <i class="fa-solid fa-thumbs-down"></i>
             <span >dislike</span>
          </div>
        </div>
        <!-- <div class="comment" id="user">
          <button @click="toggle = !toggle">commenter</button> -->
          <!-- <div v-show="toggle" :class="`${message.id}`"> -->
          <!-- <textarea id="comment"></textarea> -->
          <!-- <input type="text" :id="`${message.id}`" >
          <label :for="`${message.id}`"></label>
             <button type="submit" class="button">send it</button> -->
          <!-- </div> -->
        <!-- </div>         -->
      </div>
      </div>
      <div v-show="toggle" id="commentaires" class="`${message.id}`">
        <i @click="toggle = !toggle" class="fa-solid fa-circle-xmark"></i>
        <form class="form" method="POST" @submit.prevent="createAcomment" >
          <textarea id="comment" placeholder="Pour commenter, c'est ici que ça se passe!"></textarea>
          <input type="hidden" name="user_id" value="{{user.user_id}}" hidden >
          <input type="hidden" id="post_id" value="{{message.id}}" hidden >
          <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
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
      toggle : false,
       messages: [ {
           id: {},
           user_id: {},
           content: {},
           users:{
             name:{}
           }
       }],
       user:[{
         user_id: {},
         name: {},
         
       }],
       post:{},
       comment:[{
         message:{}
       }]
      
    };
  },
   beforeMount(){
    this.getMessage();
    this.getUser();
  },
  methods: {
   
     async getMessage(){
      const res = await fetch('http://localhost:3000/api/post/all');
      const data = await res.json();
      this.messages = data;
      console.log("data=",data)
    },

    async getUser(){
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      console.log(lastURLSegment);
      let id = lastURLSegment;  
      console.log(id)
      const res1 = await fetch('http://localhost:3000/api/auth/user/' + id);
      const data1 = await res1.json();
      this.user = data1;
      console.log(data1);
    },
    

     createAPost() {
      const postData = {
        userId: this.user.id,
        content: this.post.content
        
      };
      console.log(postData);
      fetch(
        "http://localhost:3000/api/post",
        {
          method: "POST",
          headers: { 'Accept': 'application/json',
                      'Content-Type': 'application/json'},
          body: JSON.stringify(postData)
        })
     .then(function (res) {
        if (res.ok) {
      const res = fetch('http://localhost:3000/api/post/all');
      const data = res.json();
      this.messages = data;
        }
    })
    },
  
    createAcomment() {
    const comment = document.getElementById('comment').value;
    const postid = document.getElementById('post_id').value;
    console.log(comment);
      const postData = {
        post_Id: postid,
        user_Id: this.user.id,
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
    }
}}

</script>

<style>

header{
    position: fixed;
    flex-direction: column;
    border-radius: 17px;
     background: white;
     top: 0;
     left: 50%;
     margin-left: -30%;
    
     
}
.head{
 border-radius: 17px;
     background: white;
  padding: 0 75%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  
}
header .nav{
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  
}
.nav i{
  margin-right: 15rem;
}
.nav button{
  border: none;
  border-radius: 17px;
  padding: 0rem 0.5rem;
  cursor: pointer;
}
header .details{
    background: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 0.5rem;
    border-radius: 17px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.details form{
display: flex;
flex: 1;

}
.details form input{
  border-radius: 17px;
  background: rgb(235, 235, 235);
  color: gray;
  flex-grow: 2;
  border: none;
  padding: 0.5rem 1rem;

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

    .message .user_details{
        display: flex;
        justify-content: flex-start;
        align-content: center;
    }
    #commentaires{
      
      position: fixed;
      top: 50%;
      left: 50%;
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
</style>