<template>
  <div>
    <h2>Login</h2>
    <form class="grid gap-y-4" @submit.prevent="signInUser">
      <div class="form-group">
        <input
          v-model="email"
          type="text"
          name="email"
          placeholder="email"
          class="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          :class="{ 'is-invalid': submitted && !email }"
        />
        <div v-show="submitted && !email" class="invalid-feedback">
          email is required
        </div>
      </div>
      <div class="form-group">
        <input
          v-model="password"
          placeholder="Password"
          type="password"
          name="password"
          class="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          :class="{ 'is-invalid': submitted && !password }"
        />
        <div v-show="submitted && !password" class="invalid-feedback">
          Password is required
        </div>
      </div>
      <div class="form-group">
        <button
          type="submit"
          class="flex-shrink-0 bg-purple-600 text-white text-base font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
        >
          Login
        </button>
      </div>

      <div>
        <pre>
          User: hello@regenrek.at
          Pass: Password#1234
        </pre>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      submitted: false,
    }
  },
  methods: {
    async signInUser() {
      this.showerr = ''
      this.loading = true
      try {
        const user = await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })
        if (user) {
          this.$router.push(`/`)
        }
      } catch (err) {
        console.debug('The error', err)
        this.showerr = err.code
      }
    },
  },
}
</script>

<style lang="postcss" scoped></style>
