<template>
<div>
  <bar-navigation/>
      <b-card-group>
        <b-card
        header="Users"
        header-bg-variant="dark"
        header-text-variant="white"
        class="mb-2"
        style="max-width: 20rem;">
          <b-list-group :id="`role${user.id}`" style= "border-bottom-style:inset" v-for="user in user" :key="user.id" >
                <h5>username : {{user.username}}</h5>
                <p>email : {{user.email}}</p>
                <p>Date de création : {{dateFormat(user.createdAt)}}</p>

                <div class="form-group" :id="`form-groupe${user.id}`">
                    <label for="role">Statut Admin : {{user.isAdmin}}</label>
                    <b-row>
                      <b-col lg="6" class="pb-2"><b-button  class="mt-3" block @click="deleteUser(user.id)">Supprimer</b-button></b-col> 
                      <b-col lg="6" class="pb-2"><b-button  title="Modifier ce poste" v-b-modal:[`modal-${user.id}`] class="mt-3" block>Mettre a jour</b-button></b-col> 
                      <b-modal :id="`modal-${user.id}`"  title="Modifier le statut de l'utilisateur">
                          <div class="modal-body mx-3">
                              <div class="md-form mb-5">
                                  <input type="text" id="form34" placeholder="statut" class="form-control validate" v-model="isAdmin">
                                  <label data-error="wrong" data-success="right" for="form34">modifier le statut</label>
                              </div>
                          </div>
                          <b-button @click="updateRole(user.id)">Modifier</b-button>
                          <template #modal-footer visibilite="false">
                          <div></div>
                          </template> 
                        </b-modal>
                    </b-row>
                </div>
          </b-list-group>
        </b-card>
      </b-card-group>

</div>
          
</template>
        
<script>
import axios from 'axios';
import barNavigation from '../components/barNavigation.vue'
import moment from 'moment'
export default {
    name: 'Utilisateurs',
        components : {
        barNavigation,
    },

data() {
      return {
        //User:[],
        user:"",
        email: "",
        username: "",
        password: "",
        isAdmin: "",
      }

  },

  created() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:3000/api/users' , {
         headers: { Authorization: "Bearer " + token}
      })
      .then(response => {
          console.log(response.data);
          this.user = response.data.User;
          console.log(this.user)
      })
      .catch(error => console.log(error));
  },
  methods: {

//mise a jour statut
        updateRole(userId){
          console.log(userId)
            const token = localStorage.getItem('token');
            const formData = {
                "isAdmin": this.isAdmin
              
            }
            console.log(this.isAdmin)
            axios.put('http://localhost:3000/api/users/isAdmin/'+ userId, formData,{
              headers: { Authorization: "Bearer " + token,
                            'Content-Type': 'application/json',
                    },    
            })
            
            .then(response => {
                console.log(response)
                alert('le role a bien été mise à jour!');
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
// supprimer un compte utilisateur
deleteUser(userId){
            const token = localStorage.getItem('token');
            console.log(userId)

            axios.delete('http://localhost:3000/api/users/' + userId, {
            headers: { Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
            },
            })            
            .then(() => {
                alert('User n° '+ userId + ' a ete supprime !')
                localStorage.getItem('PostId')
                document.location.reload()
            })
            .catch(error => console.log(error));
        },

  },

}
</script>

<style scoped>
.card-group {
  display: flex;
  justify-content: space-around;
}

.list-group{
  text-align: start;
}

</style>