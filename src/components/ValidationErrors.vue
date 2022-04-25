<template>
  <div class="errMessages">
    <div class="errMessages-item" v-for="item in errorMessages" :key="item">
      {{ item }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'McvValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  computed: {
    errorMessages() {
      return Object.keys(this.validationErrors).map((name) => {
        const messages = this.validationErrors[name].join(', ');
        return `${name} ${messages}`;
      });
    },
  },
};
</script>
