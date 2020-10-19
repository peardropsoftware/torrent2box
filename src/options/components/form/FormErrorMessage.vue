<template functional>
  <div v-if="props.errorMessage" class="message is-danger" style="margin-top: 1rem;">
    <div class="message-header">
      Error
    </div>
    <div class="message-body">
      {{props.errorMessage}}
    </div>
  </div>
</template>

<script lang="ts">
  export default {
      props: {
          errorMessage: {
              required: true,
              type: String
          }
      }
  };
</script>
