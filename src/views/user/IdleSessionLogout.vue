<template>
  <vs-alert color="warning" active="true">
    <p>Are you there ...?</p>
    <p>you will be logged out after {{ time / 1000 }} Seconds</p>
  </vs-alert>
</template>

<script>
export default {
  data() {
    return {
      time: 30000
    };
  },
  created() {
    let timerId = setInterval(() => {
      this.time -= 1000;
      if (!this.$store.state.idleVue.isIdle) {
        clearInterval(timerId);
      }
      if (this.time < 1) {
        clearInterval(timerId);
        // Your logout function should be over here
        this.$store.dispatch("auth/logout");
        this.$store.state.SessionExpired = true;

        this.$router.push("/user/login/login").catch(() => {});
      }
    }, 1000);
  }
};
</script>
<style lang="postcss" scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  width: 500px;
  box-shadow: 1px 2px 4px rgba(153, 155, 168, 0.12);
  border-radius: 4px;
}
.modal__title {
  color: #38404f;
}
</style>
