<template>
  
  <h1>Lista de Cursos</h1>

  
  <ul v-if="errors.length > 0">
    <li v-for="error in errors" :key="error.id">
      {{ error }}
    </li>
  </ul>
  <form @submit.prevent="saveCourse">
    <div>
      <label for="title">Título</label><br>
      <input v-model="course.title" type="text" id="title" placeholder="Insira o título do curso...">
    </div>
    <br>
    <div>
      <label for="description">Descrição</label><br>
      <textarea v-model="course.description" name="" id="description" cols="30" rows="10" placeholder="Insira a descrição do curso..."></textarea>
    </div>
    <br>
    <div>
      <label for="category">Categoria</label><br>
      <select name="" id="category" v-model="course.category_id">
        <option value="" selected disabled>Selecione uma categoria</option>
        <option v-for="category in categories" :key="'category-' + category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>
    <br>
    <button type="submit">Salvar</button>

  </form>
  
  <!-- {{ course }} -->

  <ul>
    <li v-for="course in courses" :key="'course-' + course.id">
      <router-link :to="{name: 'CourseDetails', params: {id: course.id}}">
        {{ course.title }}
      </router-link>
      -
      <button @click="deleteCourse(course.id)">Eliminar</button>
      
    </li>
  </ul>
</template>

<script>
export default {

    data() {
      return {
        categorires: [],
        courses: [],
        course: {
          title: '',
          description: '',
          category_id: ''
        },
        errors: [],
        
      }
    },
    created(){
      this.getCategories();
      this.getCourses();
    },
    methods: {

      getCategories(){
        this.axios.get('https://cursos-prueba.tk/api/categories')
          .then(response => {
            this.categories = response.data;
          }).catch(error => {
            console.log(error)
          })
      },

      getCourses(){
        this.axios.get('https://cursos-prueba.tk/api/courses')
          .then(response => {
            this.courses = response.data;
          }).catch(error => {
            console.log(error)
          })
      },

      saveCourse() {
        this.axios.post('https://cursos-prueba.tk/api/courses', this.course)
          .then(response => {

            let course = response.data;

            this.courses.push(course);
            
            this.course = {
              title: '',
              description: '',
              category_id:''
            }

            this.errors = [];

          }).catch(error => {

            this.errors = Object.values(error.response.data.errors).flat();
            
          })
      },

      deleteCourse(id) {
        this.axios.delete('https://cursos-prueba.tk/api/courses/' + id)
          .then(() => {
            this.courses = this.courses.filter(course => course.id != id);
          }).catch(error => {
            console.log(error);
          })
      }
    }
}
</script>

<style scope>
  
</style>