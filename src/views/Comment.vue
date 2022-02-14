<template>
    <div>
      <div >
        <i @click="toggle = !toggle" class="fa-solid fa-circle-xmark"></i>
        <p> laisser un Commentaire</p>
        <form class="form" method="POST" @submit.prevent="createAcomment" >
          <textarea id="comment" placeholder="Pour commenter, c'est ici que ça se passe!"></textarea>
          <input type="hidden" name="user_id" value="{{user.user_id}}" hidden >
          <input type="hidden" id="post_id" value="{{message.id}}" hidden >
          <button type="submit"><i class="fa-solid fa-paper-plane"></i></button>
        </form>
        <div class="commentairePoster">
          <p>Commentaire sur le post de ...</p>
           <div class="box-comm">
      <div class="message" v-for="comment in comments" :key="comment.id">
        <div id="message_details" :class="`${comment.id}`">          
          <i class="fa-solid fa-user"></i>
          <div class="info">
            <p>{{comment.id}}</p>
            <p>{{comment.users.name}}</p>
            <span>{{comment.createdAt}}</span>
          </div>
        </div>
        <div class="message_details">
          <p>{{comment.message}}</p>
        </div>
        <div class="like_dislike">
          <div class="likes">
                <input type="checkbox"
                :value=comment.id
                v-model="likes"
                name="checkbox"
                v-bind:id="comment.id"
                @click="Liked()"/>
                <label v-bind:for="comment.id">
                  <i class="fa-solid fa-thumbs-up">{{likes}}</i>
                </label>
              </div>
          <!-- <div @click="liked()" class="likes" >
            <i class="fa-solid fa-thumbs-up"></i>
            <span >like {{likes}}</span>
          </div> -->
          <div class="dislikes" @click="disliked()" >        
            <i class="fa-solid fa-thumbs-down"></i>
             <span >dislike {{dislikes}}</span>
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
       comments:[{
           id:{},
         message:{},
         users:{
             name:{}
           }
       }],
       props: {
         msg: {}
       },
       likes: 0,
       dislikes: 0,
    };
  },
   beforeMount(){
  
    /*this.getUser();*/
    this.getComment();
  },
  methods: {
    liked: function(){
      this.likes + 1
    },
    disliked: function(){
      this.dislikes - 1
    
    }, 
    
     async getComment(){
       var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      console.log(lastURLSegment);
      let id = lastURLSegment;  
      console.log(id)
      const res = await fetch('http://localhost:3000/api/post/comment/all/' + id);
      const data2 = await res.json();
      this.comments = data2;
      console.log("comment=",data2)
    
    }, 

    /*async getUser(){
      var pageURL = window.location.href;
      var lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
      console.log(lastURLSegment);
      let id = lastURLSegment;  
      console.log(id)
      const res1 = await fetch('http://localhost:3000/api/auth/user/' + id);
      const data1 = await res1.json();
      this.user = data1;
      console.log("users:",data1);
    },*/
    
    createAcomment() {
    const comment = document.getElementById('comment').value;
    const postid = document.getElementById('post_id').value;
    console.log(comment);
      const postData = {
        post_Id: postid,
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
    }
}}

</script>
