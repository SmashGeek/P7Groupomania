<template>

<div class="feed">
    <h1>Toutes les publications</h1>

    <div>
        <div v-for="post in posts" :key="post.id" class="post-content ">
            <div class="btn-suppr"><deletePost :postId="post.id" :userId="post.userId"/></div>
            <div class="post-username">{{  post.user.username }}</div>
            <div class="post-date"> Publié le {{ formatDate(post.createdAt)}} </div>
            <div v-if="post.imageUrl">
            <img  :src="'http://localhost:3000/images/' + post.imageUrl" class="img-post img-fluid"/>
            </div>
            <div v-if="post.content" class="content-post"> 
                <p> {{  post.content }} </p>
            </div>
         <createComment :postId="post.id"/>
         <h2>Commentaires</h2>
         <displayComment :postId="post.id"/>
        </div>
    </div>
</div>
</template>

<script> 
import axios from "axios";
import createComment from './createComment.vue';
import displayComment from './displayComment.vue';
import deletePost from './deletePost.vue';
export default {
    name: 'feed',
    components: {
        deletePost,
        createComment,
        displayComment,
    },

    data() {
        return {
            storage: JSON.parse(localStorage.getItem('user')),
            posts: [],
        };
    },

    methods: {
        displayPosts() {
            const token = JSON.parse(localStorage.getItem('user')).token;
            axios.get("http://localhost:3000/api/post/", {
             
            headers: {
                authorization: `Bearer ${token}`
            }})
            .then((res) => {
                this.posts = res.data;
                console.log(this.posts);
            })
            .catch((error) => {
                console.log(error);
            });
            },

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
            })
            .catch((error) => {
            console.log(error);
        });
        },
             //fonction pour afficher la date et l'heure des posts en fr
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
            this.displayPosts();
        },
};
</script>