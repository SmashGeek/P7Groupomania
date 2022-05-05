<template>
<div>
    <div id="create-comment">
        <div>
          <textarea class="form-control" type="text" required v-model="comment.content" placeholder="Ecrivez votre commentaire..." name="content"> </textarea>
        </div>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <button @click="sendComment" class=" btn btn-outline-primary btn-sm">Publier</button>
      </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    props: ["postId"],
    name: 'createComment',
  data() {
    return {
      comment: {
        id: null,
        content: "",
      },
    };
  },

methods: {
    sendComment() {
        const storage = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('user')).token;
            const data = {
            content: this.comment.content,
            userId: storage.userId,
            postId: this.postId
            }

            axios.post("http://localhost:3000/api/comment", (data), {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                this.$router.go();
                console.log(res);
                console.log(data)
            });
    },


}







}
</script>