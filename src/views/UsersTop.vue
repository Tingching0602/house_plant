<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <UsersProfilingCard
        v-for="user in users"
        :key="user.id"
        :initial-user="user"
      />
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import NavTabs from "./../components/NavTabs";
import UsersProfilingCard from "./../components/UsersProfilingCard";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
export default {
  name: "UsersTops",
  components: {
    NavTabs,
    UsersProfilingCard,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const { data } = await usersAPI.getTopUsers();
        this.users = data.users;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法載入美食達人，請稍後再試",
        });
      }
    },
  },
};
</script>