<template>
         <div id="show-comments"> 
       <div :key="comment.id" v-for="comment in comments" class="shadow-lg p-3 mb-3 bg-body rounded comment-content">
         <div v-if="storage.userId === comment.userId"> <i type="button" @click=deleteComment(comment.id) class="bi bi-trash3 btn-suppr" style="font-size: 1.2rem; color: #D50000" alt="supprimer"></i></div>
         <div class="comment-username"><span>{{ comment.user.username }}</span></div>
         <div class="comment-date" >Publié le {{ formatDate(comment.createdAt) }}</div>
         <div class="content-comment fst-italic">{{ comment.content }}</div>
         </div> 
      </div>
    
</template>
<script>
import axios from 'axios';
export default {
    props: ["postId"],
    name: 'displayComment',
  data() {
    return {
      storage: JSON.parse(localStorage.getItem('user')),
      comments: []
    };
  },

methods: {
    displayComments() {
        console.log("displayComment: " + this.postId)
             const token = JSON.parse(localStorage.getItem('user')).token;
             axios.get("http://localhost:3000/api/comment/all?postId=" + this.postId, {
             
             headers: {
                    authorization: `Bearer ${token}`
                }
                })
             .then((res) => {
                 this.comments = res.data;
                 console.log(this.comments);
             })
             .catch((error) => {
                console.log(error);
             });
             },

    deleteComment(commentId) {
      const token = JSON.parse(localStorage.getItem('user')).token;
      axios.delete("http://localhost:3000/api/comment/" + commentId,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        console.log(res);
        this.$router.go();
      })
      .catch((error) => {
            console.log(error);
      });
    },
    formatDate(opt) {
            let options = {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric"
            };
            let timestamp = Date.parse(opt);
            let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
            return date.toString();
        },

},
mounted() {
 this.displayComments();
}

}
</script>