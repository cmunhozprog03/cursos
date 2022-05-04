<template>
  <div class="container">
    <h1>Login</h1>
    <div class="card shadow mx-auto">
      <div class="card-body">
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

          <button class="btn btn-primary">
            Iniciar a seção
          </button>
         
        </form>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      console.log('iniciar seção')
    }
  }
}
</script>

<style scope>
  .card{
    max-width: 32rem;
  }
</style>