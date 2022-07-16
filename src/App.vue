<template>
  <div id="house-plant">
    <NavbarHome />
<main class="mt-5 bg-white">
    <router-view/>
    </main>
  </div>
</template>

<script>
/*eslint-disable*/
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarHome from './components/NavbarHome'

export default {
  name: 'App',
  components: {
    NavbarHome,
  }
}
</script>
