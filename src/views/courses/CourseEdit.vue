<template>
  <h1>Editar um curso</h1>

  <form @submit.prevent="updateCourse">
    <div>
      <label for="title">Título</label><br />
      <input
        v-model="course.title"
        type="text"
        id="title"
        placeholder="Insira o título do curso..."
      />
    </div>
    <br />
    <div>
      <label for="description">Descrição</label><br />
      <textarea
        v-model="course.description"
        name=""
        id="description"
        cols="30"
        rows="10"
        placeholder="Insira a descrição do curso..."
      ></textarea>
    </div>
    <br />
    <div>
      <label for="category">Categoria</label><br />
      <select name="" id="category" v-model="course.category_id">
        <option value="" selected disabled>Selecione uma categoria</option>
        <option
          v-for="category in categories"
          :key="'category-' + category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <br />
    <button type="submit">Salvar</button>
  </form>
  
</template>

<script>
export default {
  data() {
    return {
      categorires: [],
      course: {},
    };
  },
  created() {
    this.getCategories();
    this.getCourse();
  },
  methods: {
    getCategories() {
      this.axios
        .get("/categories")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getCourse() {
      this.axios
        .get(
          "/courses/" +
            this.$route.params.id +
            "?included=category"
        )
        .then((response) => {
          this.course = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateCourse() {
      this.axios
        .put('/courses/' + this.$route.params.id, this.course)
        .then(() =>{
          this.$router.push({name: 'CourseDetails', params: {id: this.$route.params.id}})
        }).catch(error => {
          console.log(error)
        })
    },
  },
};
</script>

<style>
</style>