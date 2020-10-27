<template>
  <div class="home">
    <users-table />
  </div>
</template>

<script>
import UsersTable from '@/components/UsersTable.vue'

export default {
  name: 'Home',
  components: {
    UsersTable
  }
}
</script>
