<template>
    <div class="post-container">
        <h2>Créer votre publication</h2>
        <div class="form-group mb-2">
            <label for="content"></label>
            <textarea class="form-control" rows="3" v-model="content"></textarea>
            </div>
            <input class="form-control" type="file" name="file" accept="image/png, image/jpeg" title=" "/>
            <button @click=createPost class="btn btn-outline-primary" type="button">Publier</button>
    </div>
    
</template>

<script>
import axios from "axios";
export default {
    name: 'post',
    data(){
        return { 
            post: {
                id: null,
                content: "",
            }
        }
    },
    methods: {
        createPost() {
            const storage = JSON.parse(localStorage.getItem('user'));
            const token = JSON.parse(localStorage.getItem('user')).token;
            const imgFile = document.querySelector("input[type=file]").files[0];
            if (this.createPost !="" || imgFile) {
            let formData = new FormData()
            formData.append('content', this.content);
            formData.append('userId', storage.userId)
            if (imgFile) {
                formData.append('file', imgFile);
            }

            axios.post("http://localhost:3000/api/post/", (formData), {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                this.$router.go();
                console.log(res);
                console.log(formData)
            });
        }
    }


}
}
</script>