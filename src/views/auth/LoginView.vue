<template>
  <div class="container">
   
    <div class="card shadow mx-auto">
      <div class="card-body">
        <h1>Login</h1>
        {{auth}}
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="mb-1">Email</label>
            <input type="email" v-model="email" class="form-control" 
              placeholder="Insira seu email">
          </div>
          <div class="mb-3">
            <label for="password" class="mb-1">Senha</label>
            <input type="password" v-model="password" class="form-control" 
              placeholder="Insira sua senha">
          </div>

          <button class="btn btn-primary" :class="{
            'disabled': disabled
          }">
            Iniciar a seção
          </button>
         
        </form>
      </div>
    </div>
  </div>
  
</template>

<script>

import {mapMutations, mapState} from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      disabled: false,
    }
  },
  computed: {
    ...mapState(['auth'])
  },
  methods: {

    ...mapMutations(['setAuth']),

    login() {

      this.disabled = true;

      this.axios.post('/login', {
        gran_type: 'password',
        client_id: '95e1d3ff-7270-4e6c-8e9c-6dcd6bc10df2',
        client_secret: 'O3tH7XtTgQTD06hMZV2NgfiRk94IsaUGFBTKYKdP',
        username: this.email,
        password: this.password
      }).then((response) => {
        // console.log(response.data);
        localStorage.setItem('auth', JSON.stringify(response.data));
        this.setAuth(response.data);
        this.disabled = false;
        this.$router.push({
          name: 'Dashboard'
        });
      })
    }
  }
}
</script>

<style scope>
  .card{
    max-width: 32rem;
  }
</style>