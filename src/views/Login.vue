<template>
  <div class="login">
    <div class="login__header">
      <h1>Войти</h1>
      <p>
        <router-link :to="{name: 'register'}">Нужен аккаунт ?</router-link>
      </p>
    </div>
    <mcv-validation-errors
      v-if="validationErrors"
      :validation-errors="validationErrors"
    />
    <form @submit.prevent="onSubmit" class="form">
      <fieldset>
        <input v-model="email" type="text" placeholder="Почта" />
      </fieldset>
      <fieldset>
        <input v-model="password" type="password" placeholder="Пароль" />
      </fieldset>
      <button :disabled="isSubmitting">Войти</button>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import McvValidationErrors from "@/components/ValidationErrors";
import { actionTypes } from "@/store/modules/auth";

export default {
  name: "McvLogin",
  components: {
    McvValidationErrors
  },
  data() {
    return {
      email: "",
      password: ""
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
        .dispatch(actionTypes.login, {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "globalFeed" });
        });
    }
  }
};
</script>
