<template>
  <div class="user">
    <b-alert
      v-model="showErrorAlert"
      variant="danger"
    >
      {{ errorText }}
    </b-alert>
    <div class="back-link">
      <router-link class="text-info" :to="{ name: 'home' }">←	Назад</router-link>
    </div>
    <div class="text-center text-info my-2" v-if="isUserLoading || isTodosLoading">
      <b-spinner class="align-middle"></b-spinner>
    </div>
    <b-card :title="currentUser.name" v-if="!isUserLoading && !isTodosLoading">
      <b-card-text>
        <b-list-group>
          <b-list-group-item v-for="todo in currentUserTodos" :key="todo.id">
            <b-form-checkbox disabled :checked="todo.completed">{{ todo.title }}</b-form-checkbox>
          </b-list-group-item>
        </b-list-group>
      </b-card-text>
    </b-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class User extends Vue {
  errorText: string = '';
  showErrorAlert: boolean = false;
  // Два загрузчика, в теории для расширения :) например под таски пользователя показывать превьюхи, пока данные еще тянутся
  // Вроде такого https://i.ytimg.com/vi/eGaQkuZKPvA/maxresdefault.jpg
  isUserLoading: boolean = false;
  isTodosLoading: boolean = false;

  get currentUser (): IUser {
    return this.$store.getters['currentUser'];
  }

  get currentUserTodos (): IToDo[] {
    return this.$store.getters['currentUserTodos'];
  }

  async fetchUserData () {
    try {
      this.isUserLoading = true;
      await this.$store.dispatch('getOneUser', {
        userId: this.$route.params.id
      });
    } catch (e) {
      this.errorText = 'Ошибка загрузки пользователя';
      this.showErrorAlert = true;
    } finally {
      this.isUserLoading = false;
    }

    try {
      // В теории тасков может быть много, и их загрузка долгая - так что отдельно их подтянем с загрузчиком
      this.isTodosLoading = true;
      await this.$store.dispatch('getOneUserTodos', {
        userId: this.$route.params.id
      });
    } catch (e) {
      this.errorText = 'Ошибка загрузки задач пользователя';
      this.showErrorAlert = true;
    } finally {
      this.isTodosLoading = false;
    }
  }

  mounted () {
    this.fetchUserData();
  }
}
</script>

<style lang="scss" scoped>
  .user {
    max-width: 500px;
    margin: 0 auto;
  }

  .back-link {
    margin: 15px 0;
  }
</style>
