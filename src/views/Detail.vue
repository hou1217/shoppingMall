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
      <div class="img-wrap">
        <img :src="jsonData.advPic">
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
        day:0,
        hour:0,
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
          url:this.$global.serverUrl+'/mall-app/mall/product/detail?goodId=5b50367241eeba3394ad691e'
        };
        console.log(options);
        this.$axios(options).then((res) =>{
          console.log(res.data);
        }).catch((error) => {
          console.log(error);
        });
        this.jsonData = {
          "advPic":"http://p93yanyc8.bkt.clouddn.com/80ea6cdb-b960-4938-b368-54ac8d7d1a55",
          "desc":"山寨机就是牛",
          "name":"iphone",
          "photos":[
            {"url":"http://p93yanyc8.bkt.clouddn.com/36a7ed40-b361-4f33-9277-75af4cbd58e0"},
            {"url":"http://p93yanyc8.bkt.clouddn.com/a9a2bf45-db93-421f-aef1-aadc50a2ae91"},
            {"url":"http://p93yanyc8.bkt.clouddn.com/36a7ed40-b361-4f33-9277-75af4cbd58e0"},
            {"url":"http://p93yanyc8.bkt.clouddn.com/a9a2bf45-db93-421f-aef1-aadc50a2ae91"},
            {"url":"http://p93yanyc8.bkt.clouddn.com/36a7ed40-b361-4f33-9277-75af4cbd58e0"},
          ],
          "restTime":1532848337,
          "items":[
            {"icon":"http://p93yanyc8.bkt.clouddn.com/219c6973-fa55-42cd-b73a-ff781e4248c6","itemName":"卡片","num":3,"type":"kapian"},
            {"icon":"http://p93yanyc8.bkt.clouddn.com/e81ead5e-214f-464e-8056-6889acc6b178","itemName":"金币","num":5,"type":"gold"}
          ]
        }
        console.log(this.jsonData);
        
        this.day = dealTime(this.jsonData.restTime).dayTime;
        this.hour = dealTime(this.jsonData.restTime).hourTime;
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
  font-size: 16px;
  font-style: normal;
  color: #343C4F;
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