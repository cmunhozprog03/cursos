<template>
  <h1>{{ course.title }}</h1>
  <p>{{ course.description }}</p>
  <p>
    <b>Categoria: </b>
    {{ category.name }}
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
      category: {}
    }
  },
  created() {
    this.getCourse()
  },
  methods: {
    getCourse() {
      this.axios.get('/api/courses/' + this.$route.params.id + '?included=category')
        .then(response =>{
          this.course = response.data;
          this.category = response.data.category;
        }). catch (error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>

</style>