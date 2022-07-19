<template>
  <div class="container py-5">
    <!-- AdminUserForm -->
    <AdminUserForm
      :initial-user="user"
      @after-submit="handleAfterSubmit"
      :is-processing="isProcessing"
    />
  </div>
</template>

<script>
/*eslint-disable*/
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import AdminUserForm from "./../components/AdminUserForm";
import { Toast } from "./../utils/helpers";
export default {
  name: "AdminUserEdit",
  components: {
    AdminUserForm,
  },
  watch: {
    currentUser(user) {
      console.log("user", user);
      const { id } = this.$route.params;
      this.setUser(id);
    },
  },
  created() {
    const { id } = this.$route.params;
    this.setUser(id);
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    console.log("beforeRouteUpdate", id);
    this.setUser(id);
    next();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      user: {
        id: 0,
        image: "",
        name: "",
        email: "",
      },
      isProcessing: false,
    };
  },
  methods: {
    setUser(userId) {
      const { id, image, name, email } = this.currentUser;
      if (id.toString() !== userId.toString()) {
        this.$router.push({ name: "not-found" });
        return;
      }
      this.user.id = id;
      this.user.name = name;
      this.user.email = email;
      this.user.image = image;
    },
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true;
        const { data } = await usersAPI.update({
          userId: this.user.id,
          formData,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "成功更新使用者資料",
        });
        this.$router.push({ name: "user", params: { id: this.user.id } });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法更新使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script>