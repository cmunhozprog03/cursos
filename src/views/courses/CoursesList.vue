<template>
  <div class="container">
    <h1>Lista de Cursos</h1>

    
    <ul v-if="errors.length > 0">
      <li v-for="error in errors" :key="error.id">
        {{ error }}
      </li>
    </ul>

    <div class="card mb-4">

      <form @submit.prevent="saveCourse" class="card-body">
        <div>
          <label for="title">Título</label><br>
          <input class="form-control" v-model="course.title" type="text" id="title" placeholder="Insira o título do curso...">
        </div>
        <br>
        <div>
          <label for="description">Descrição</label><br>
          <textarea class="form-control" v-model="course.description" name="" id="description" cols="30" rows="10" placeholder="Insira a descrição do curso..."></textarea>
        </div>
        <br>
        <div>
          <label for="category">Categoria</label><br>
          <select class="form-control" name="" id="category" v-model="course.category_id">
            <option value="" selected disabled>Selecione uma categoria</option>
            <option v-for="category in categories" :key="'category-' + category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <br>
        <button type="submit" class="btn btn-primary btn-sm">Salvar</button>

      </form>
    </div>
    
    <div class="mb-4">
      <h2>Buscador</h2>
      <input v-model="search" type="text" class="form-control" placeholder="Buscar...">
    </div>
    

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

  </div>
</template>

<script>

import usePagination from '@/composables/usePagination'
export default {

  setup() {
    const {pagination, page, setPagination, changePage} = usePagination();
    
    return {
      pagination,
      page,
      setPagination,
      changePage
    }
  },
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
      search: '',
      }
  },
  created(){
    this.getCategories();
    this.getCourses();
  },

  watch: {
    page() {
      this.getCourses();
    },
    search(){
      this.getCourses();
    },
  },    

  methods: {

    getCategories(){
      this.axios.get('/api/categories')
        .then(response => {
            this.categories = response.data;
        }).catch(error => {
          console.log(error)
        })
    },

    getCourses(){
        //this.axios.get('https://cursos-prueba.tk/api/courses?sort=-id&per_page=5&page=' + this.page +'&filter[title]=' + this.search)
      this.axios.get('/api/courses', {
        params: {
          sordt: '-id',
          per_page: '10',
          page: this.page,
          'filter[title]': this.search
        }
      })
        .then(response => {

          let res = response.data;
          this.courses = res.data;

          this.setPagination(res);
            // this.pagination ={
            //   links: res.links,
            //   last_page: res.last_page
            // }

          }).catch(error => {
            console.log(error)
          })
    },

    saveCourse() {
      this.axios.post('/api/courses', this.course)
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
        this.axios.delete('/api/courses/' + id)
          .then(() => {
            this.getCourses();
              // this.courses = this.courses.filter(course => course.id != id);
          }).catch(error => {
              console.log(error);
          })
    },
      
  }
}
</script>

<style scope>
  
</style>