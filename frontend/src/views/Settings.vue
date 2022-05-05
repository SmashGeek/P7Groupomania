<template>
<div class="container-fluid"> 
    <div class="row">
        <div class="col-lg-3">
        </div><!-- test sidebar-->
        <div class="col-lg-6">
            <button @click="backToHome" class="btn btn-light">Retour à la page d'accueil</button>
            <div class="form-container settings">
                <h2>Modifications du compte</h2>
                <div class="form-group">
                    <label for="username">Modifier nom d'utilisateur</label>
                    <input v-model="username" type="text" id="username" class="form-control">
                </div>
                <div class="form-group">
                    <label for="password">Modifier mot de passe</label>
                    <input v-model="password" type="password" id="password" class="form-control">
                </div>
                <button @click=editAccount(storage.userId) class="btn btn-outline-primary">Valider mes changements</button>
                <div class="del-account">
                <h3>Supprimer mon compte</h3> 
                <button @click=deleteAccount(storage.userId) class="btn btn-outline-danger">Suppression du compte</button>
                </div>
            </div>
        </div><!-- test middle column -->
          <div class="col-lg-3">
          </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: "settings",
    data() {
        return {
            storage: JSON.parse(localStorage.getItem('user')),
            username: "",
            password: "",
        }
    },

    methods: {
        backToHome() {
            this.$router.push('/home')
        },
        deleteAccount(userId) {
        const token = JSON.parse(localStorage.getItem('user')).token;
        axios.delete("http://localhost:3000/api/user/" + userId, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            console.log(res);
            this.$router.push('/login');
            localStorage.removeItem("user");
        })
        .catch((error) => {
            console.log(error);
        });
    },

        editAccount(userId) {
        const data = {
            username: this.username,
            password: this.password
        }
        axios.put("http://localhost:3000/api/user/" + userId, data)
        .then((res) => { 
            if(res.status == 200) {
                alert("Modifications effectuees !")
                this.$router.go()
            } else {console.log("Pas de changements")}
            console.log(res)
        })
        .catch((error) => {
            console.log(error);
        });
    }
    }
}
</script>

<style>

</style>