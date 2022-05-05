<template> 
<div class="user-card">
<div class="card-username">Bonjour <span class="username">{{storage.username}}</span></div>
<div class="d-grid gap-2">
    <button class="btn btn-outline-primary" @click="goToSettings">Paramètres du compte</button>
    <button class="btn btn-outline-danger" @click="disconnect">Deconnexion</button>
</div>
</div>

</template>

<script> 
export default {
    name: "userCard",
    data () {
        return {
            storage: JSON.parse(localStorage.getItem('user')),
        }
    },

methods: {
    disconnect(){
      localStorage.removeItem("user");
      this.$router.push('/login')
      },
    goToSettings(){
        this.$router.push('/settings')
    }
}
}
</script>