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
export default {
  data() {
    return {
      email: '',
      password: '',
      disabled: false,
    }
  },
  methods: {
    login() {

      this.disabled = true;

      this.axios.post('/api/login', {
        gran_type: 'password',
        client_id: '95e1d3ff-7270-4e6c-8e9c-6dcd6bc10df2',
        client_secret: 'O3tH7XtTgQTD06hMZV2NgfiRk94IsaUGFBTKYKdP',
        username: this.email,
        password: this.password
      }).then((response) => {
        console.log(response.data);
        this.disabled = false;
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