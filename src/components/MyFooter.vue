<template>
  <div class="position-absolute bottom-0 text-center" id="footer">
    <p class="mt-2">Logan Brooks &copy;{{ copyrightYear }}</p>
  </div>
</template>

<script>
  export default {
    computed:{
      copyrightYear(){
        return new Date().getFullYear();
      }
    }
  }
</script>

<style scoped>
  #footer
  {
    background: lightgrey;
    width: 100%;
  }
</style>