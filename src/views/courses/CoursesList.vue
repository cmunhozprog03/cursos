<template>
  
  <h1>Lista de Cursos</h1>

  
  <ul v-if="errors.length > 0">
    <li v-for="error in errors" :key="error.id">
      {{ error }}
    </li>
  </ul>
  <form @submit.prevent="saveCourse" class="mb-3">
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
    <button type="submit" class="btn btn-primary btn-sm">Salvar</button>

  </form>
  
  <!-- {{ course }} -->

  <ul>
    <li v-for="course in courses" :key="'course-' + course.id">
      <router-link :to="{name: 'CourseDetails', params: {id: course.id}}">
        {{ course.title }}
      </router-link>
      -
      <button @click="deleteCourse(course.id)" class="btn btn-danger btn-sm mb-2">Eliminar</button>
      
    </li>
  </ul>

  <!-- Pagination -->
  <div class="d-flex justify-content-center">
    <nav aria-label="...">
      <ul class="pagination">
        <li v-for="pagination_link in pagination.links"
          :key="'pagination_link-' + pagination_link.label" 
          class="page-item"
          :class="{
            'disabled' : pagination_link.url == null,
            'active' : pagination_link.active
          }">
          
          <a class="page-link"
            @click="changePage(pagination_link.url)" 
            v-html="pagination_link.label" 
            style="cursor: pointer">
            
          </a>
        </li>
        
      </ul>
    </nav>
  </div>


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
        pagination: {},
        
        
      }
    },
    created(){
      this.getCategories();
      this.getCourses();
    },

    computed: {
      page(){

        let page = this.$route.query.page ?? '1';

        if(page > this.pagination.last_page) {

          this.$router.replace({
            query: {
              page: this.pagination.last_page
            }
          })
          return this.pagination.last_page
        }

        return page;
      }
    },

    watch: {
      page() {
        this.getCourses();
      }
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
        this.axios.get('https://cursos-prueba.tk/api/courses?sort=-id&per_page=5&page=' + this.page)
          .then(response => {

            let res = response.data;
            this.courses = res.data;

            this.pagination ={
              links: res.links,
              last_page: res.last_page
            }

            

          }).catch(error => {
            console.log(error)
          })
      },

      saveCourse() {
        this.axios.post('https://cursos-prueba.tk/api/courses', this.course)
          .then(() => {

            // let course = response.data;

            // this.courses.push(course);

            this.getCourses();
            
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
            this.getCourses();
            // this.courses = this.courses.filter(course => course.id != id);
          }).catch(error => {
            console.log(error);
          })
      },
      changePage(url){
        this.$router.replace({
          query: {
            page: url.split('page=')[1]
          }
        })
      }
    }
}
</script>

<style scope>
  
</style>