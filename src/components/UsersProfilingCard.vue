<template>
  <div class="col-3">
    <router-link :to="{ name: 'user', params: { id: user.id } }">
      <img :src="user.image | emptyImage" width="140px" height="140px" />
    </router-link>
    <h2>{{ user.name }}</h2>
    <span class="badge badge-secondary"
      >追蹤人數：{{ user.FollowerCount }}</span
    >
    <p class="mt-3">
      <button
        type="button"
        class="btn btn-danger"
        v-if="user.isFollowed"
        @click.stop.prevent="deleteFollowed(user.id)"
      >
        取消追蹤
      </button>
      <button
        type="button"
        class="btn btn-primary"
        v-else
        @click.stop.prevent="addFollowed(user.id)"
      >
        追蹤
      </button>
    </p>
  </div>
</template>

<script>
/*eslint-disable*/
import { emptyImageFilter } from "./../utils/mixins";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
export default {
  name: "UserProfilingCard",
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: this.initialUser,
    };
  },
  methods: {
    async addFollowed(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId });
        if (data.status !== "success") {
          throw new Error("data.message");
        }
        this.user = {
          ...this.user,
          isFollowed: true,
          FollowerCount: this.user.FollowerCount + 1,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法追蹤，請稍後再試",
        });
      }
    },
    async deleteFollowed(userId) {
      try {
        const { data } = await usersAPI.deleteFollowing({ userId });
        if (data.status !== "success") {
          throw new Error("data.message");
        }
        this.user = {
          ...this.user,
          isFollowed: false,
          FollowerCount: this.user.FollowerCount - 1,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法追蹤，請稍後再試",
        });
      }
    },
  },
};
</script>