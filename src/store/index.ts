import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    currentUser: {},
    currentUserTodos: [],
    currentPage: 1,
    currentLimit: 5,
    totalUsers: 0
  },
  mutations: {
    setUsers (state, { users }) {
      state.users = users;
    },
    setTotalUsers (state, { totalUsers }) {
      state.totalUsers = totalUsers;
    },
    setCurrentPage (state, { currentPage }) {
      state.currentPage = currentPage;
    },
    setCurrentUser (state, { user }) {
      state.currentUser = user;
    },
    setCurrentUserTodos (state, { todos }) {
      state.currentUserTodos = todos;
    },
  },
  actions: {
    async getUsersData ({ commit, dispatch, getters }) {
      const data = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${getters.currentPage}&_limit=${getters.currentLimit}`);
      commit('setTotalUsers', { totalUsers: Number(data.headers.get('x-total-count')) });
      commit('setUsers', { users: await data.json() });
    },
    async getOneUser ({ commit, dispatch, getters }, { userId }) {
      const data = await fetch(`https://jsonplaceholder.typicode.com/users?id=${userId}`);

      //@TODO Не нашел способа получить 1 конкретного юзера, но так можно достать массив с 1 конкретным юзером
      const usersArray = await data.json();
      commit('setCurrentUser', { user: usersArray[0] });
    },
    async getOneUserTodos ({ commit, dispatch, getters }, { userId }) {
      const userTodos = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
      commit('setCurrentUserTodos', { todos: await userTodos.json() });
    },
  },
  getters: {
    users: state => { return state.users },
    currentPage: state => state.currentPage,
    currentLimit: state => state.currentLimit,
    totalUsers: state => state.totalUsers,
    currentUser: state => state.currentUser,
    currentUserTodos: state => state.currentUserTodos,
  }
})
