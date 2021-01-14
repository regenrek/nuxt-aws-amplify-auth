<template>
  <div class="flex min-h-screen">
    <div class="w-full flex items-center justify-center">
      <NjSignIn />
    </div>
  </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    if (store.getters['auth/isAuthenticated']) {
      return redirect('/')
    }
  },
}
</script>
