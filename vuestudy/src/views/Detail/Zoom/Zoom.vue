<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big" >
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask" ></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data(){
     return {
       viperIndex:0
     }
     },
    computed:{
      imgObj(){
        return this.skuImageList[this.viperIndex]||{}
      },
    },
    mounted() {
      this.$bus.$on('getIndex',(index)=>{
this.viperIndex=index
      })
    },
    methods:{
      handler(event){
let mask=this.$refs.mask
        let big=this.$refs.big
        let leftPage=event.offsetX-mask.offsetWidth/2
        let topPage=event.offsetY-mask.offsetHeight/2
        if(leftPage<0) leftPage=0
        if(leftPage>=mask.offsetWidth) leftPage=mask.offsetWidth
        if(topPage<0) topPage=0
        if(topPage>=mask.offsetHeight) topPage=mask.offsetHeight
        mask.style.left=leftPage+'px'
        mask.style.top=topPage+'px'
        big.style.left=-2*leftPage+'px'
        big.style.top=-2*topPage+'px'
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>