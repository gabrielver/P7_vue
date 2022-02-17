<template>
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
            <p>{{message.content}}</p>
          </div>
          <div class="like_dislike">
             
            <div @click="displayLikes(), updateActivePlan()" :active-plan="activePlan" @onUpdatePlan="updateActivePlan" >
              <button class="like_btn">
                <span id="icon"><i class="far fa-thumbs-up"></i></span>
              </button>
            </div>
            <div class="commenter">
               <button v-on:click="addToCart(message) ,toggle = !toggle">
                  <i class="fa-solid fa-comment"></i>
                  <span>commentaires</span>
               </button>
            </div> 
            
            <div class="dislikes">
                <input type="checkbox" name="checkbox2"  v-bind:id="message.content"/>
                <label v-bind:for="message.content">
                  <i class="fa-solid fa-thumbs-down"></i>
                </label>
              </div>
          </div>
        </div>
      </div>
</template>
<script>
import { emit } from "../../Backend/app";

export default{
    props:['activePlan'],
 data() {
    return {
       
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
       likes: [{
         id:"",
         userId:{},
         postId:{}
       }],
       cart:[]
    };
  },
  beforeMount(){
    this.getMessage();
    this.getUser();
    
  },
  methods:{
      async getMessage(){
      const res = await fetch('http://localhost:3000/api/post/all');
      const data = await res.json();
      this.messages = data;
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
    displayLikes(){
     const likeBtn = document.querySelector('.like_btn');
     const likeIcon = document.querySelector('#icon');
     
      let clicked = false;

      likeBtn.addEventListener("click", () =>{
        if(!clicked){
          clicked = true;
          console.log("clicked");
          likeIcon.innerHTML = `<i class="fas fa-thumbs-up"></i>`;
        }else{
          clicked = false;
          likeIcon.innerHTML = `<i class="far fa-thumbs-up"></i>`;
        }
    });
    },
    
  }
};
</script>