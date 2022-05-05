<template>
        <div class="container-fluid"> 
    <div class="row">
          <div class="col-lg-3">
          </div><!-- test sidebar-->
          <div class="col-lg-6">
          <div class="form-container">
        <h1>Creer un compte</h1>
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="username">Nom d'utilisateur</label>
                <input v-model="username" type="text" id="username" class="form-control" required="required">
            </div>
            <div class="form-group">
                <label for="email">Adresse email</label>
                <input v-model="email" type="email" id="email" class="form-control" required="required">
            </div>
            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input v-model="password" type="password" id="password" class="form-control" required="required">
            </div>
            <p>Déjà un compte ? <router-link to="/login">Connectez-vous !</router-link></p>
            <button class="btn btn-outline-primary" type="submit" >
                Valider
            </button>
        </form>
        </div>
          </div><!-- test middle column -->
          <div class="col-lg-3">
          </div>
        </div>
      </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'signup',
    data(){
        return { 
            username: "",
            email: "",
            password: "",
        }
    },
    methods: {
        register() {
            axios.post("http://localhost:3000/api/auth/signup", {
                username : this.username,
                email : this.email,
                password : this.password
            })
            .then((res) => {
                console.log(res);
                this.$router.push("/login")
            })
            .catch((error) => {
                alert(error, "Cette adresse email est déjà utilisée !")
            });
        }
    }


}
</script>