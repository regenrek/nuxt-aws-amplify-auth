<template>
  <div>
    <div class="flex bg-blue-200">
      <nav class="flex justify-center items-center py-4">
        <nuxt-link
          class="transition-colors duration-300 mx-2 lg:mx-4 xl:mx-6 uppercase hover:text-blue-600"
          to="/"
          >Home</nuxt-link
        >
        <nuxt-link
          v-if="!isAuthenticated"
          class="transition-colors duration-300 mx-2 lg:mx-4 xl:mx-6 uppercase hover:text-blue-600"
          to="/auth/login"
          >Login</nuxt-link
        >
        <nuxt-link
          v-else
          class="transition-colors duration-300 mx-2 lg:mx-4 xl:mx-6 uppercase hover:text-blue-600"
          to="#"
          >Hello {{ getUser }}</nuxt-link
        >
        <button
          class="transition-colors duration-300 mx-2 lg:mx-4 xl:mx-6 uppercase hover:text-blue-600"
          v-if="isAuthenticated"
          @click="logout"
        >
          Logout
        </button>
      </nav>
    </div>
    <Nuxt />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
    }),
    getUser() {
      return (
        this.$store.state.auth?.cognitoUser?.attributes?.email || 'Unknown User'
      )
    },
  },
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
