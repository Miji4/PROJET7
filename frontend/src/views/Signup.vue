<template>

    <div>
        <bar-navigation/>

        <div id="container">
            <form >

           <div class="form-outline mb-4">
                <input type="text" placeholder="Votre Pseudo" name="username" required v-model="username">
                <label class="form-label" for="form2Example27">Pseudo</label>

            </div>
           <div class="form-outline mb-4">
                <input type="text" placeholder="Votre adresse email" name="email" pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}" required v-model="email">
                <label class="form-label" for="form2Example17">Email address</label>

            </div>
           <div class="form-outline mb-4">
                <input type="password" placeholder="Votre Mot de passe" title = "votre mot de passe doit compter minimum 6 caractères et inclure un chiffre" name="password"  required v-model="password">
                <label class="form-label" for="form2Example27">Password</label>

            </div>
             <div class="pt-1 mb-4">
                <button class="btn btn-dark btn-lg btn-block" type="button" @click.prevent="userSignup">Signup</button>
             </div>
            </form>    
        </div>
        
    </div>
</template>

<script>

import axios from 'axios';
import barNavigation from '../components/barNavigation.vue'


export default {
    components :{
        barNavigation
    },
 
  data () {
    return {
      username: '',
      email: '',
      password: ''
      
    }
  },

    methods: {
        userSignup() {
            axios.post('http://localhost:3000/api/users/signup', {
                username: this.username,
                email: this.email,
                password: this.password,
            })
            .then(response => {
                console.log(response);
                alert('Votre compte a bien été créé! Vous pouvez à présent vous connecter!');
                this.$router.push('/');            
            })
                       
            .catch((error) => { 
                
                console.log(error)
                alert(error.response.data.error || error.response.data.error.errors[0])
            }) 
            
        }, 
    }
}

</script>

<style scoped>
#container{
    width:400px;
    margin:0 auto;
    margin-top:10%;
}
form {
    width:100%;
    padding: 30px;
    border: 1px solid #f1f1f1;
    border-radius: 15px;
    background: #fff;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
input[type=text], input[type=password], textarea {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

input[type=submit] {
    background-color: #435ef3ee;
    border-radius: 15px;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    cursor: pointer;
    width: 100%;
    transition: all .3s ease-in;
}
input[type=submit]:hover {
    background-color: #0f44819f;
}

input:invalid {
  border: 2px solid red;
}

input:valid {
  border: 1px solid green;
}

#login  {
  font-weight: bold;
  background-color: #c0af18;
  border-radius: 10px;
  color: white;
  padding: 15px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 40%;
}
#loginLink:link {
  text-decoration: none;
}
.icon {
    margin-bottom: 5px;
}

</style>
