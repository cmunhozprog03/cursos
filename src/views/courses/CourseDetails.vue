<template>
  <h1>{{ course.title }}</h1>
  <p>{{ course.description }}</p>
  <p>
    <b>Categoria: </b>
    {{ category.name }}
  </p>
  <p>
    <b>User: </b>
    {{ user.name }}
  </p>
  <router-link :to="{name: 'CourseEdit', params: {
    id: $route.params.id
  }}">
    Editar Curso
  </router-link>
    
  
  
</template>

<script>
export default {

  data() {
    return {
      course: {},
      category: {},
      user: {},
    }
  },
  created() {
    this.getCourse()
  },
  methods: {
    getCourse() {
      this.axios.get('/courses/' + this.$route.params.id + '?included=category,user')
        .then(response =>{
          this.course = response.data;
          this.category = response.data.category;
          this.user = response.data.user
        }). catch (error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>