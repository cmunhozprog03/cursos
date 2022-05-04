<template>
  <nav class="navigation">
    <router-link to="/">Home</router-link> |
    <router-link :to="{ name: 'CoursesList'}">Cursos</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <nav class="navigation">
    <router-link :to="{ name: 'Login'}">Login</router-link> |
    <router-link :to="{ name: 'Register'}">Register</router-link> 
    
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navigation {
  margin: 30px;
}

.navigation a {
  font-weight: bold;
  color: #2c3e50;
}

.navigation a.router-link-exact-active {
  color: #42b983;
}
</style>
