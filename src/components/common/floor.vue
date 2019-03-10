<template>
  <div>
    <div class="floor">
      <div class="floor-irregular">
        <div class="floor-one">
          <img :src="floorData0.image" width="100%" />
        </div>
        <div>
          <div class="floor-two">
            <img :src="floorData1.image" width="100%" />
          </div>
          <div>
            <img :src="floorData2.image" width="100%" />
          </div>
        </div>
      </div>
    </div>
    <div class="floor-regular">
      <div v-for="(item, index) in floorData.slice(3)" :key="index">
        <img :src="item.image" width="100%" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['floorData'],
    data() {
      return {
        floorData0: {},
        floorData1: {},
        floorData2: {}
      }
    },
    created() {
      
    },
    watch: {
      floorData:function(val) {
        console.log(this.floorData);
        this.floorData0 = this.floorData[0];
        this.floorData1 = this.floorData[1];
        this.floorData2 = this.floorData[2];
      }
    }
  }
</script>

<style scoped>
  .recommand-item {
    width: 99%;
    border-right: 1px solid #eee;
    text-align: center;
  }
  .floor-irregular {
    display: flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .floor-irregular div {
    width: 10rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
  .floor-one {
    border-right: 1px solid #ddd;
  }
  .floor-two {
    border-bottom: 1px solid #ddd;
  }
  .floor-regular {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
  }
  .floor-regular div {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #ddd;
  }
  .floor-regular div:nth-child(odd) {
    border-right: 1px solid #ddd;
  }
</style>