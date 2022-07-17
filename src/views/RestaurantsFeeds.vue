<template>
  <div class="container py-5">
    <NavTabs />

    <h1 class="mt-5">
      最新動態
    </h1>
    <hr>
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
      </div>
      <div class="col-md-6">
        <!-- 最新評論 NewestComments-->
        <h3>最新評論</h3>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import NavTabs from "./../components/NavTabs";
import NewestRestaurants from "./../components/NewestRestaurants";
import NewestComments from "./../components/NewestComments";
import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import SpinnerBig from "./../components/SpinnerBig";
export default {
  name: "RestaurantsFeed",
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
    SpinnerBig,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    async fetchFeeds() {
      try {
        this.isLoading = true;
        const response = await restaurantsAPI.getFeeds();
        const { restaurants, comments } = response.data;
        this.restaurants = restaurants;
        this.comments = comments.filter(
          (comment) => comment.Restaurant && comment.text
        );
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得最新動態，請稍後再試",
        });
      }
    },
  },
};
</script>
