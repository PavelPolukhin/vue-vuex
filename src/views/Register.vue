<template>
  <div class="register">
    <div class="register__header">
      <h1>Зарегистрироваться</h1>
      <p>
        <router-link :to="{name: 'login'}"> Уже есть аккаунт ? </router-link>
      </p>
    </div>
    <mcv-validation-errors
      v-if="validationErrors"
      :validation-errors="validationErrors"
    />
    <form @submit.prevent="onSubmit" class="form">
      <fieldset>
        <input v-model="username" type="text" placeholder="Имя пользователя" />
      </fieldset>
      <fieldset>
        <input v-model="email" type="text" placeholder="Почта" />
      </fieldset>
      <fieldset>
        <input v-model="password" type="password" placeholder="Пароль" />
      </fieldset>
      <button :disabled="isSubmitting">Зарегистрироваться</button>
    </form>
  </div>
</template>
<script>
import {mapState} from "vuex";
import McvValidationErrors from '@/components/ValidationErrors';
import {actionTypes} from "@/store/modules/auth";

export default {
  name: 'McvRegister',
  components: {
    McvValidationErrors,
  },
  data() {
    return {
      email: '',
      username: '',
      password: '',
    };
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      validationErrors: (state) => state.auth.validationErrors
    })
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then((user) => {
          console.log(user);
          this.$router.push({name: 'globalFeed'});
        });
    },
  },
};
</script>
