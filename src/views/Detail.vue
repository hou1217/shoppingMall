<template>
  <div class="container">
    <input type="hidden" id="id">
      <!-- 返回按钮 -->
      <a href="javascript:;" @click="goBack" class="rtn"></a>
      <!-- 指示器 -->
      <div class="indicator">
        {{currNum}}/5
      </div>
      <mt-swipe 
      :auto="0" 
      :show-indicators="false" 
      class="swipe"
      @change="handleChange">
        <mt-swipe-item v-for="(photo,index) in jsonData.photos" :key="index">
          <img :src="photo.url" alt="">
        </mt-swipe-item>
       
      </mt-swipe>
    <section class="good-item" v-show="isShow">
      <h1 class="item-name">
        {{jsonData.name}}
      </h1>
      <p class="item-desc">
        {{jsonData.desc}}
      </p>
      <span class="item-restTime">
        还剩下{{jsonData.restTime | formatDate}}
      </span>
      <div class="cards">

        <span v-for="(item,index) in jsonData.items" :key="index">
          <img v-if="item.type == 'kapian'" :src="item.icon">
          <img v-else :src="item.icon" class="card">
          <i v-if="item.type == 'kapian'">{{item.itemName}}</i>
          <em v-if="item.type == 'kapian'">x{{item.num}}</em>
          <em v-else class="gold">{{item.num}}</em>
        </span>
        
      </div>
     
    </section>
    <section class="content">
      <div class="top">
        
        <p><i class="line">——</i>&nbsp;&nbsp;&nbsp;图文详情&nbsp;&nbsp;&nbsp;<i class="line">——</i></p>
        
      </div>
      <div class="img-wrap">
        <img :src="pic.url" v-for="(pic,index) in jsonData.advPics" :key="index">
      </div>
    </section>
  </div>
</template>

<script type="text/javascript">
  import {dealTime} from '../assets/js/Date.js'
	export default{
	  name: 'Detail',
	  components:{
  
    },
    filters:{
      formatDate(time){
        return dealTime(time);
      }
    },
	  data(){
	    return {
        currNum:1,
        jsonData:{},
	      isShow:true,
	      
	    }
	  },
	  methods:{
      handleChange(index){
        this.currNum = index+1;
      },
      goBack(){
        this.$router.go(-1);
      },
	    getDetail(pay){
	      console.log("加载详情");
	      const options = {
          method: 'GET',
          url:this.$global.serverUrl+'/mall-app/mall/product/detail?goodId='+pay.kind
        };
        console.log(options);
        this.$axios(options).then((res) =>{
          console.log(res.data);
          this.jsonData = res.data.data;
        }).catch((error) => {
          console.log(error);
        });
      },
	  },
	  mounted(){
	    document.body.scrollTop = document.documentElement.scrollTop = 0;//滚动条回到顶部
      this.getDetail({
        kind:this.$route.query.goodId,
      });
	  },
	  destroyed(){
      console.log("detailPage destroyed");
    },
	}
</script>

<style scoped>
.top{
  text-align: center;
  background: #F4F6FA;
  width: 100%;
  height: 44px;
}
.top p{
  font-size: 15px;
  color: #8D93A4;
  
  padding-top:10px
}
.top p .line{
  color:#DCDEE6
}
.container{
  width: 100%;
  height: auto;
}
.swipe{
  width: 100%;
  height: 375px;
}
.rtn{
  background: url(../assets/images/fanhui.png) no-repeat;
  background-size: contain;
  width: 32px;
  height: 32px;
  display: block;
  position: absolute;
  left: 15px;
  top: 26px;
  z-index: 1;
}
.indicator{
  position: absolute;
  left:324px;
  top:342px;
  z-index: 1;
  color:#fff;
  font-size: 11px;
  background: rgba(0,0,0,0.40);
  width: 36px;
  height: 19px;
  line-height: 19px;
  text-align: center;
  border-radius: 50px;
}

.mint-swipe-items-wrap > div > img{
  width: 100%;
}
.good-item{
  padding: 15px;
}
.item-name{
  font-size: 18px;
  color: #303036;
  text-align: justify;
  line-height: 18px;
}
.item-desc{
  margin-top:7px;
  margin-bottom: 7px;
  font-size: 15px;
  color: #8D93A4;
  text-align: justify;
  line-height: 19px;
}
.item-restTime{
  font-size: 14px;
  color: #F2604D;
  text-align: justify;
  line-height: 14px;
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
  font-size: 14px;
  font-style: normal;
  color: #666;
  line-height: 16px;
}
.cards span .gold {
  color:#FDC223;
}
.content{
    width: 100%;
    margin-top: 17px;
    
}
.content .img-wrap img{
    display: block;
    width: 100%;
    height: 100%;
}


</style>