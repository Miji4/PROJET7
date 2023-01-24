<template>    
  <div>
    <barNavigation/> 
    <div class="home">
      <connexion/>
    </div>
  </div>

</template>

<script>
import barNavigation from '../components/barNavigation.vue'
import connexion from '../components/connexion.vue'


export default {
  name: 'Home',
  components: {
    barNavigation,
    connexion,
  }
}
</script>

<style scoped>


.home{
    max-width: 100%;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
}

.img{
  max-width: 100%;

}

</style>