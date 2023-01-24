<template>
  
  <section class="vh-100" style="background-color: #fff;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 1rem;">
          <div class="row g-0">
            <div class="col-md-6 col-lg-5 d-none d-md-block">
              <img src="../assets/icon-left-font.png"
                alt="logo_page_connexion" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
            </div>
            <div class="col-md-6 col-lg-7 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <form>

                  <h1 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Connectez vous a votre compte</h1>

                  <div class="form-outline mb-4">
                    <input type="email" id="form2Example17" class="form-control form-control-lg" placeholder="Votre adresse email" name="email" required v-model="email" />
                    <label class="form-label" for="form2Example17">Email address</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="form2Example27" class="form-control form-control-lg" placeholder="Votre Mot de passe" name="password" required v-model="password" />
                    <label class="form-label" for="form2Example27">Password</label>
                  </div>

                  <div class="pt-1 mb-4">
                    <button class="btn btn-dark btn-lg btn-block" type="button" @click.prevent="userLogin">Login</button>
                  </div>

                  <p class="mb-5 pb-lg-2" style="color: #393f81;">Vous n'avez pas de compte ?<router-link to="/signup"
                      style="color: #393f81;"> Inscrivez-vous ici</router-link></p>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
 
</template>

<script>
import axios from 'axios';

export default {
  name: 'connexion',
  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    userLogin() {
        axios.post('http://localhost:3000/api/users/login', {
            email: this.email,
            password: this.password
        })
        .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', parseInt(res.data.userId));
            localStorage.setItem('role', res.data.isAdmin);
            localStorage.setItem('username', res.data.username);
            this.$router.push('/filactualite');
        })
        .catch(() => alert("Email ou Mot de passe incorrect"));
    }
  }

}
</script>

<style scoped>
h1, .h1 {
    font-size: 1.8rem;
}

</style>