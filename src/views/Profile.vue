<template>
<div class="wrapper">
    <section class="chat-area">
      <header>
        <a href="" class="back-icon"><i class="fas fa-arrow-left"></i></a>
        <div class="details">
        <img src="" alt="">
          <span>{{user.name}}</span> |
          <p>{{user.user_id}}</p>
          <button>Exit</button>
          </div>
          <div class="new_message">
              <form  class="cart__order__form" @submit.prevent="createAPost"  autocomplete="off">
        <input type="text" name="userid" v-model="post.userid" hidden>
        <input type="text" name="message" v-model="post.content" class="input-field" placeholder="Type a message here..." autocomplete="off">
        <button type="submit"  class="button">send it</button>
      </form>
          </div>
        
      </header>
      <div class="message" v-for="message in messages" :key="message.id">
            <div class="user_details">          
                <img src="" alt="">
                <p>{{message.id}}</p> |
                <p v-if="message.user_id === user.user_id">{{user.name}}</p>
           </div>
           <div class="message_details">
                <p>{{message.content}}</p>
                <button class="like">Like</button>
                <span >0</span>
                <button classe="dislike">Dislike</button>
                <span >0</span>
            </div>
            <div class="comment" id="user">
              <button @click="toggle = !toggle">commenter</button>
            <form v-show="toggle" @submit.prevent="createAComment" class="typing-comment">
                <input type="text" name="user_id" v-model="user.user_id" hidden >
                <input type="text" name="post_id" v-model="message.id" hidden >
                <input type="text" name="comment"  v-model="comment.message" class="input-comment" placeholder="Type a comment here..." autocomplete="off">
                <button type="submit"  class="button">send it</button>
                </form>
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
      toggle : false,
       messages: [ {
           id: {},
           user_id: {},
           content: {}
       }],
       user:[{
         user_id: {},
         name: {},
         
       }],
       post:{},
       comment: {}
      
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
      console.log(data)
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
        userId: this.user.user_id,
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
    
    }
  },
    createAComment() {
        const postData = {
          post_id: this.message.id,
          user_id: this.user.user_id,
          content: this.post.content
          
        };
        console.log(postData);
        fetch(
          "http://localhost:3000/api/post/comment",
          {
            method: "POST",
            headers: { 'Accept': 'application/json',
                        'Content-Type': 'application/json'},
            body: JSON.stringify(postData)
          })
      .then(function (res) {
          if (res.ok) {
            console.log("commentaire envoyé !!")
          }
      })
      
      }
}
</script>

<style>
header{
    border-bottom: 1px solid;
    
    flex-direction: column;
}
header .details{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.details button{
    background: black;
    color: white;
    font-size: 15px;
    border-radius: 20px;
    border: none;
    padding: 0.5rem 1.5rem;
    position: absolute;
    right: 30px
    
}

.message{
    background: rgba(0, 204, 255, 0.616);
    margin: 1rem;
    border-radius: 17px;
}
    .message .user_details{
        display: flex;
        justify-content: flex-start;
        align-content: center;
    }
</style>