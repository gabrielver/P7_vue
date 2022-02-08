<template>
<div class="wrapper">
    <section class="chat-area">
      <header>
        <a href="" class="back-icon"><i class="fas fa-arrow-left"></i></a>
        <div class="details">
        <img src="" alt="">
          <span>pseudo</span> |
          <p>statut</p>
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
                <p>{{message.user_id}}</p>
           </div>
           <div class="message_details">
                <p>{{message.content}}</p>
                <button><i  class="far fa-thumbs-up"></i></button>
                <span >0</span>
                <button classe="like"><i  class="far fa-thumbs-down"></i></button>
                <span >0</span>
            </div>
            <div class="comment">
            <form action="#" class="typing-comment">
                <input type="text" name="outgoing_id"   hidden>
                <input type="text" name="comment"  class="input-comment" placeholder="Type a comment here..." autocomplete="off">
                <button><i class="fab fa-telegram-plane"></i></button>
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
       messages: [ {
           id: {},
           user_id: {},
           content: {}
       }],
       post:{}
      
    };
  },
   beforeMount(){
    this.getName();
  },
  methods: {
   
     async getName(){
      const res = await fetch('http://localhost:3000/api/post/all');
      const data = await res.json();
      this.messages = data;
    },
  

     createAPost() {
      const postData = {
        userId: "2",
        content: this.post.content,
        
      };
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
      const data =  res.json();
      this.messages = data;
    
        }
    })
    
    }
  },
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