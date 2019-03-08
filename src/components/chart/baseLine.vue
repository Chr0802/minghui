<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-legend />
      <v-line position="month*value" color="item" />
      <v-point position="month*value" color="item" :size="4" :vStyle="style" :shape="'circle'" />
    </v-chart>
  </div>
</template>

<script>
const scale = [{
  dataKey: 'month',
  min: 0,
  max: 1,
},{
  dataKey: 'value',
  min: 0,
  formatter: '.2%',
}];
export default {
  data() {
    return {
      scale,
      height: 300,
      style: { stroke: '#fff', lineWidth: 1 },
    };
  },
  props:{
    data:{
      type:Array,
      default:[]
    }
  }
};
</script>
