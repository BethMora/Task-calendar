<template>
  <Access>
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- <template v-slot:nameUser> </template> -->
      <!-- <template v-slot:userName> </template>
      <template v-slot:password> </template>
      <template v-slot:submit> </template> -->
      
      
      <!-- <slot name="userName"></slot> -->
      <!-- <slot name="password"></slot> -->
      <!-- <slot name="submit"></slot> -->
    </v-form>
  </Access>
</template>

<script>
import Access from "@/components/Login/Access.vue";

export default {
  name: "SignIn",
  components:{
      Access
  },
  data() {
    return {
      valid: true,
      name: "",
      email: "",
      userName: "",
      //   nameRules: [
      //     (v) => !!v || "Name is required",
      //     (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      //   ],
      show1: false,
      psw: "",
      //   emailRules: [
      //     (v) => !!v || "E-mail is required",
      //     (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      //   ],

      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
        valid: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
    };
  },

  

  methods: {
    // login() {
    //   console.log("Logueado user");
    //   // let user = {
    //   //     name: this.name,
    //   //     username: this.psw
    //   // };
    //   let post = {
    //     userId: 1,
    //     id: 0,
    //     title:
    //       "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    //     body:
    //       "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    //   };

    //   axios.post(url, post).then((data) => {
    //     console.log(data);
    //     //   if (data.status === "ok"){
    //     //       console.log("Todo correcto")
    //     //   }else{

    //     //   }
    //   });
    // },
  },
};
</script>
