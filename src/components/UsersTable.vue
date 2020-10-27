<template>
  <div class="users-table">
    <b-alert
      v-model="showErrorAlert"
      variant="danger"
    >
      {{ errorText }}
    </b-alert>
    <b-table
      id="users-table"
      striped
      :items="users"
      :fields="fields"
      :busy="loading"
    >
      <template #table-busy>
        <div class="text-center text-info my-2">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>
      <template #cell(name)="data">
        <router-link :to="{ name: 'user-page', params: { id: data.item.id } }" class="text-info">{{ data.value }}</router-link>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalUsers"
      per-page="5"
      aria-controls="users-table"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class UsersTable extends Vue {
  errorText: string = '';
  showErrorAlert: boolean = false;
  loading: boolean = false;
  fields: string[] = ['name', 'email', 'phone'];


  get users (): IUser[] {
    return this.$store.getters['users'];
  }

  get currentPage (): number {
    return this.$store.getters['currentPage'];
  }

  set currentPage (state) {
    this.$store.commit('setCurrentPage', { currentPage: state });
    this.fetchUsersData();
  }

  get totalUsers (): number {
    return this.$store.getters['totalUsers'];
  }

  async fetchUsersData () {
    try {
      this.loading = true;
      await this.$store.dispatch('getUsersData');
    } catch (e) {
      this.errorText = 'Ошибка загрузки пользователей. Обновите страницу';
      this.showErrorAlert = true;
    } finally {
      this.loading = false;
    }
  }

  mounted () {
    this.fetchUsersData();
  }
}
</script>

<style lang="scss" scoped>
  .users-table {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>
