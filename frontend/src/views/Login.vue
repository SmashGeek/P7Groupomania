<template>
    <div class="container-fluid"> 
    <div class="row">
          <div class="col-lg-3">
          </div><!-- test sidebar-->
          <div class="col-lg-6">
          <div class="form-container">
        <h1>Connexion</h1>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Adresse email</label>
                <input v-model="email" type="email" id="email" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="password">Mot de passe</label>
                <input v-model="password" type="password" id="password" class="form-control" required>
            </div>
            <p>Pas encore de compte ? <router-link to="/" class="link-container"><span>Créez un compte !</span></router-link></p>
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
    name: 'login',
    data(){
        return { 
            email: "",
            password: "",
        }
    },
    methods: {
        login() {
            axios.post("http://localhost:3000/api/auth/login", {
                email: this.email,
                password: this.password
            })
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data));
                this.$router.push("/home")
                console.log(res)
            });
        }
    }


}

</script>