<template>
        <div v-if="storage.userId === userid"> <i type="button" @click=deletePost(postid) class="bi bi-trash3" style="font-size: 1.5rem; color: #D50000" alt="supprimer" ></i> </div>
</template>

<script>
import axios from 'axios';
export default {
     props: [ 'postId','userId'],
     name: 'deletePost',
     data() {
         return {
            storage: JSON.parse(localStorage.getItem('user')),
            userid: this.userId,
            postid: this.postId,
         };
},

methods: {
deletePost(postIdArg) {
    const token = JSON.parse(localStorage.getItem('user')).token;
    axios.delete("http://localhost:3000/api/post/" + postIdArg, 
    { 
        headers: { 
            authorization: `Bearer ${token}` 
        }
    })
    .then((res) => {
        console.log(res);
        this.$router.go();
        });
},

},
}
</script>