<template>
    <div>
        <barNavigation/>
        <div class="container rounded bg-white mt-5">
            <div class="row">
                <div class="col-md-4 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5"><b-avatar :text='user.username' size ="4em" class="align-center"></b-avatar><span class="font-weight-bold">{{user.username}}</span><span class="text-black-50">{{user.email}}</span><span>Membre Groupomania depuis : {{dateFormat(user.createdAt)}}</span></div>
                </div>
                <div class="col-md-8">
                    <div class="p-3 py-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><label for="fullName">Pseudo</label></div>
                            <div class="col-md-6"><input type="text" class="form-control" id="fullName" name="username"  placeholder="Enter username" v-model="username"></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><label for="eMail">Email</label></div>
                            <div class="col-md-6"><input type="email" class="form-control" id="eMail" name="email" placeholder="Enter email " v-model="email"></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><label for="password">Password</label></div>
                            <div class="col-md-6"><input type="password" class="form-control" id="password" name="password" placeholder="Enter new password" v-model="password"></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><b-button type="button" variant="success" id="submit" name="submit"  @click="updateProfil">Update</b-button></div>
                            <div class="col-md-6"><b-button type="button" variant="danger" id="submit" name="submit" @click="deleteProfil">Delete</b-button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>



<script>

import axios from 'axios';
import moment from 'moment';
import barNavigation from '../components/barNavigation.vue'
export default {
    name: 'Profil',
   
    components: {
    barNavigation,
  },
  
   data() {
      return {
        user: "",
        email: "",
        username: "",
        password: "",
        isAdmin: "",
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
      })
      .catch(error => console.log(error));
    },

  methods: {

// Mise à jour du profil
        updateProfil(){
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            const fd = {};
            if(this.username.length){
                fd["username"] = this.username
            }
            if(this.email.length){
                fd["email"] = this.email
            }
            if(this.password.length){
                fd["password"] = this.password
            }
    
            axios.put('http://localhost:3000/api/users/' + userId, fd, {
                headers: { Authorization: "Bearer " + token,
                        'Content-Type': 'application/json',
                    },    
            })
            
            .then(response => {
                console.log(response)
                alert('Votre profil a été mise à jour!');
                document.location.reload();
            })
            .catch(error => console.log(error));
        },


// format date
        dateFormat(date){
          if (date) {
              return moment(String(date)).format('DD/MM/YYYY')
          }
      },

// suppression du profil
      deleteProfil(){
          const confirmation = confirm("Êtes vous sûr de vouloir supprimer votre profil et tous les messages qui y sont associés?")
          if (confirmation){
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
              axios.delete('http://localhost:3000/api/users/' + userId, {
                  headers: { Authorization: "Bearer " + token }
              })
              .then(response => {
                    console.log(response.data);
                    localStorage.removeItem('token');
                    localStorage.clear();
                    this.$router.push('/');
              })
              .catch(error => console.log(error));
          }
      },
    
}
    
}
</script>


<style scoped>

.account-settings .user-profile {
    margin: 0 0 1rem 0;
    padding-bottom: 1rem;
    text-align: center;
}
.account-settings .user-profile .user-avatar {
    margin: 0 0 1rem 0;
}
.account-settings .user-profile .user-avatar img {
    width: 90px;
    height: 90px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    border-radius: 100px;
}
h5.user-name {
    margin: auto;
}
h6.user-email {
    margin: auto;
    font-size: 0.8rem;
    font-weight: 400;
    color: #647596;
}
.account-settings .about {
    margin: 2rem 0 0 0;
    text-align: center;
}
.account-settings .about h5 {
    margin: 0 0 15px 0;
    color: #007ae1;
}
.account-settings .about p {
    font-size: 0.825rem;
}
.form-control {
    border: 1px solid #cfd1d8;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: .825rem;
    background: #ffffff;
    color: #2e323c;
}

.card {
    background: #ffffff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    border: 0;
    margin-bottom: 1rem;
}

.btn-success{
    color: #fff;
    background-color: #11852b;
    border-color: #11852b;
}

</style>