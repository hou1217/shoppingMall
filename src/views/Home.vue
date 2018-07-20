<template>
  <div class="indexContainer">
    <div class="top_menu_bar">
      <div class="top_menu_list">
        <router-link 
        :to="{path:item.url,query:{category:item.type}}" 
        class="btn"
        v-for='(item,index) in navbar' 
        :key="index" >
          {{item.type}}
        </router-link>
      </div>
    </div>
    <div id="content0" ref="content0" class="content0" >
      
      <div id="content1" ref="content1">
        <content id="pageletListContent" class="feed-list-container">
          <transition enter-active-class="bounceInLeft" leave-active-class="bounceOutRight">
            <ul class="list-content animated">
              
              <li v-for="(item,index) in goodsList" :key="index" @click="getIntoDetail(item.goodId)">
                <!-- <router-link :to="{
                  path:'/detail',
                  query:{goodId:item.goodId}
                  }" class="article_link clearfix "> -->
                <a href="javascript:;" class="article_link clearfix ">
                  <div class="list_img_holder">
                    <img :src="item.pic">
                    <span class="rest-number">仅剩{{item.restNum}}件</span>
                  </div>
                  <div class="item_info">
                    <p class="name">
                      {{item.name}}
                    </p>
                    <p class="rest-time">
                      还剩{{item.restTime | formatDate}}
                    </p>
                    <p class="cards">

                      <span v-for="(icon,index) in item.items" :key="index">
                        <img v-if="icon.type == 'kapian'" :src="icon.icon">
                        <img v-else :src="icon.icon" class="card">
                        <!-- <i v-if="icon.type == 'kapian'">{{icon.itemName}}</i> -->
                        <em v-if="icon.type == 'kapian'">x{{icon.num}}</em>
                        <em v-else class="gold">{{icon.num}}</em>
                      </span>
                      
                    </p>
                  </div>
                </a>
                <!-- </router-link> -->
              </li>
              
            </ul>
          </transition>
          <div class="list_bottom">
            <section class="loadmoretip" v-show="!loaded">
              <a href="#">加载中...</a>
            </section>
            <section class="loadmoretip" v-show="noMore">
              <a href="#">没有更多了</a>
            </section>
            <section class="loadmoretip" v-show="noData">
              <a href="#">暂无数据</a>
            </section>
            
          </div>
        </content>
      </div>
    </div>
  </div>
</template>

<script>
//自己封装的函数方法
import {getScrollTop,getScrollHeight,getWindowHeight,ajaxJSON} from '../assets/js/MobileFun.js'
import {dealTime} from '../assets/js/Date.js'

export default {
  name: 'Home',
  components:{
    'headers':Headers,
//  'pullRefresh':PullRefresh,
  },
  filters:{
    formatDate(time){
      return dealTime(time);
    }
  },
  
  
  methods:{
    getIntoDetail(id){
      //进入详情
      this.$router.push('/detail?goodId='+id);
    },
    loadMore() {
      this.loading = true;
      // 加载更多的数据
      console.log("加载更多数据");
      this.loadMoreDatas({
        kind:this.$route.query.category,
      });
      
    },
    
  	tabScroll(){
  	  if(document.body){
        document.addEventListener("scroll",this.handleScroll);
  	  }
    },
    handleScroll(){
      // 判断是否滚动到底部  
      if(getScrollTop() + getWindowHeight() >= (getScrollHeight() - 80) && !this.noData ) {    
        // 如果开关打开则加载数据  
        if(this.sw==true){  
          // 将开关关闭  
          this.sw = false; 
         
          // 加载更多的数据
          this.loadMoreDatas({
            kind:this.$route.query.category,
          },false);
        }  
      }  
    },
   
    loadNavBar(){
      console.log("加载导航栏完毕");
      this.navbar = [
        {
          url:'/home/recommend',
          type:'推荐'
        },
        {
          url:'/home/phone',
          type:'手机'
        },
        {
          url:'/home/ornament',
          type:'饰品'
        },
        {
          url:'/home/electrical',
          type:'家电'
        },
        {
          url:'/home/furnishing',
          type:'家居'
        },
        {
          url:'/home/wash',
          type:'洗护'
        },
      ];
    },
    getDatas(pay){
      //滚动条回到顶部
      this.loaded = false;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      if(this.flag2){
        this.flag2 = false;
        //console.log(new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds());
        console.log("加载列表完毕");
        //ajax
        const options = {
          method: 'GET',
          url:this.$global.serverUrl+"/mall-app/mall/product/list?category="+pay.kind
        };
        console.log(options);
        this.$axios(options).then((res) =>{
            console.log(res.data);
            //当没有数据或者数据为0的时候，显示'暂无数据'，'加载中'不显示
            if(!res.data.data || res.data.data.length == 0){
              this.noData = true;
              
            }
            
            this.goodsList = res.data.data;
            console.log(this.goodsList);
            this.loaded = true;
            //本地session存储
            sessionStorage.setItem("data",JSON.stringify(this.goodsList));  
        }).catch((error) =>{
          console.log(error);
        });
        this.flag2 = true;
        
      }
     
    },
    loadMoreDatas(payload,mode){
      this.loaded = false;
      this.noMore = false;
      this.noData = false;
      const options = {
        method: 'GET',
        url:this.$global.serverUrl+"/mall-app/mall/product/list?category="+payload.kind+"&cursor=''"
      };
      console.log(options);
      this.$axios(options).then((res) =>{
        console.log(res.data); 
        
        // 将新获取的数据加入到vue中的data，就会反应到视图中了
        let _this = this;
        if(res.data.data){
          if(res.data.data.length == 0){
            setTimeout(function(){
             
              _this.noMore = true;
            },700);
          }
          this.loaded = true;
          console.log("在原数组后面添加新数据");
          this.goodsList = this.goodsList.concat(res.data.data);
        }
        // 数据更新完毕，将开关打开  
        this.sw = true; 
        
      }).catch((error) =>{  
        console.log(error);  
      });  
     
    }

  },
  
  mounted(){
    //加载完成后执行
    this.loadNavBar();
    this.getDatas({
      kind:this.$route.query.category,
    });
//  console.log(this.$route.query.type);
     this.tabScroll();
    // this.touchStart();
    // this.touchMove();
    // this.touchEnd();
  },
  beforeDestroy(){
    //销毁前
    window.removeEventListener("scroll",this.handleScroll);
  },
  destroyed(){
    //销毁后
    console.log("homePage destroyed");
    
  },
  watch:{
    //监听路由的type类型改变
    '$route'(to,from){
        this.sw = true;
        this.noMore = false;
        this.loaded = false;
        this.noData = false;
        //console.log(this.loaded);
        //console.log(from.name);
        //console.log(to.name);
        //console.log(this.goodsList);
        
        //特殊情况判断：如果是从home页进入详情页或者从详情页进入home页都不加载新的数据
        if(from.name === 'Detail' && to.name === 'Home'){
          console.log('从详情页返回home页！');
          //打开开关
          this.loaded = true;
          this.sw = true;
          return false;
        }else if(to.name === 'Detail' && from.name === 'Home'){
          console.log('从home页进入详情页！');
          //关闭开关
          this.sw = false;
          return false;
        }
        //根据路由的type类型从而加载新的数据
        this.getDatas({
          kind:this.$route.query.category,
        });
        
        //滚动条回到顶部
        //document.body.scrollTop = document.documentElement.scrollTop = 0;
        //this.first = window.location.search.substring(6);
      
      
    },
  },
  data () {
    return {
      goodsList:[],//商品数据列表
      loading:false,

      isRotate:false,
      flag3:true,
      tips:false,
      newsNums:0,
      flag1:true,
      flag2:true,
      isDesc:false,
      noMore : false,
      loaded: false,
      noData:false, 
      
      status1:true,
      status2:false,
      status3:false,
      //first:window.location.search.substring(6),
      sw:true,
      isdrag : false,
      NowTop : 100,
      flag   : false,
      moveY : 0,
      toTop : 0,
      disEndY : 0,
      disX : 0,
      disY : 0,
      //频道列表
      navbar:[],
        
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  .top_menu_bar .top_menu_list .btn.router-link-active{
    color:#2CBE61;
    border-bottom:2px solid #2CBE61;
  }
  
  content.feed-list-container .list_img_holder {
    max-height: 172px;
    overflow: hidden;
    position: relative;
    background: url(../assets/images/wallan.png) #efefef no-repeat center center;
    background-size: 50%;
  }
  content.feed-list-container .list_img_holder span{
    padding: 5.5px 6.5px;
    background: #F2604D;
    border-radius: 0 4px 0 0;
    text-align: center;
    position: absolute;
    top: 0;
    right: 0;
   
    color: #fff;
    font-size: 12px;
  }

  .cards{
    margin-top: 3px;
  }
  .cards span{
    display: inline-block;
    margin-right: 10px;
  }
  .cards span img{
    margin-bottom:-3px;
    width: 16px;
    height: 16px;
  }
  .cards span img.card{
    margin-bottom:-2px;
  }
  .cards span i{
    padding-left: 3px;
    font-size: 12px;
    font-style: normal;
    color: #343C4F;
    line-height: 12px;
  }
  .cards span em{
    padding-left: 3px;
    font-size: 16px;
    font-style: normal;
    color: #343C4F;
    line-height: 16px;
  }
  .cards span .gold {
    color:#FDC223;
  }


</style>
