 <template>
  <div id="app">
    <!--<transition>-->
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view> 
    <!--</transition>-->
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style>
  @import './assets/css/style.css';
  @import './assets/css/animate.css';
  /* .router-link-exact-active{
  color:#00D8B7 !important;
} */
</style>
