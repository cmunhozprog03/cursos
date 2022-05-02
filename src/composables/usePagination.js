import { ref, computed } from 'vue';
import { useRoute, useRouter} from 'vue-router';

export default function usePagination(){
  const  pagination = ref({});
    const route = useRoute();
    const router = useRouter();

    //   computed: {
    // page(){

    //   let page = this.$route.query.page ?? '1';

    //   if(page > this.pagination.last_page) {

    //     this.$router.replace({
    //       query: {
    //         page: this.pagination.last_page
    //       }
    //     })
    //     return this.pagination.last_page
    //   }

    //   return page;
    //   }
    // },

    
    // computed
    const page = computed(() => {

      let page = route.query.page ?? '1';

      if(page > pagination.value.last_page){

          router.replace({
           query: {
            page: pagination.value.last_page
          }
          })
          return pagination.value.last_page;
       
      }
      return page;
    });

    // methods
    const setPagination = (response) => {
      pagination.value = {
        links: response.links,
        last_page: response.last_page
      }

    };
    // changePage(url){
    //     this.$router.replace({
    //       query: {
    //         page: url.split('page=')[1]
    //       }
    //     })
    //   }

    const changePage = (url) => {
      router.replace({
        query: {
          page: url.split('page=')[1]
        }
      })
    }
    return {
      pagination,
      page,
      setPagination,
      changePage
    }
}