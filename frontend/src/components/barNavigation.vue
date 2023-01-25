<template>
  <b-navbar class="navbar navbar-expand{-sm|-md|-lg|-xl}" type="dark" variant="dark">
    <b-navbar-nav>
      <b-nav-item  to ="/" class="nav-link active" ><img src="../assets/icon-left-font-monochrome-white.png" alt="logo_navbar"  class="img-fluid" style="border-radius: 1rem 0 0 1rem; width: 100px; height: 100px" />
      </b-nav-item>
      <b-nav-item to="/filactualite" class="nav-link active" v-if= "this.userId !== null">Fil d'actualité</b-nav-item>
      <b-nav-item to="/utilisateurs" class="nav-link active" v-if = "this.user.isAdmin == true">Utilisateurs</b-nav-item>
      <b-nav-item to="/profil" class="nav-link active" v-if= "this.userId !== null">Profil</b-nav-item>

      <b-nav-item to="/" v-on:click= "Logout()"  class="nav-link active" v-if= "this.userId !== null">Deconnexion</b-nav-item>


    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import axios from 'axios';

export default {

  name: 'NavBar',

data(){
        return {
            userId: localStorage.getItem('userId'),
            user:{
              isAdmin: ''
            }
        }
    },


 created() {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      axios.get('http://localhost:3000/api/users/' + userId, {
         headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
          console.log(response.data);
          this.user = response.data.User;
          this.user.isAdmin = response.data.User.isAdmin;
      })
      .catch(error => console.log(error));
  },

    methods:{
        Logout(){
            alert('Vous allez être déconnecter !')
            console.log("localstorage Cleared");
            localStorage.clear();
            this.$router.push('/');
        }
    }

}

</script>



<style scoped>

nav.navbar.navbar.navbar-expand\{-sm\|-md\|-lg\|-xl\}.navbar-dark.bg-dark.navbar-expand {
    background-color: #112441;
    max-height: 100px;
    align-items: flex-end;
    display: flex;
    /* justify-content: space-around; */
}

.bg-dark {
    background: #112441 ! important;
}
.navbar-nav{
  display: flex;
    /* flex-direction: row; */
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
    flex-wrap: wrap;
    align-content: stretch;
    align-items: baseline;
    justify-content: center;
    background: #112441;
    max-height: 100px;

}
@media screen and (max-width: 600px) {
.navbar-nav{
  font-size: small;
  flex-flow: nowrap;
  align-items: center;
  width: 300px;
}

}

</style>
