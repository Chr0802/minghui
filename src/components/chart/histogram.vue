<template>
  <div :style="{ padding: '0' }">
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale" >
      <v-tooltip :crosshairs="false" :inPlot="false" position="top" />
      <v-axis dataKey="value" />
      <v-bar position="value*count" />
    </v-chart>
  </div>
</template>

<script>
  const DataSet = require('@antv/data-set');

  const scale = [{
    dataKey: 'value',
    nice: false,
    min: 0,
    tickInterval: 1,
    
  }, {
    dataKey: 'count',
    min:0 ,
  }];

  const formatter = val => {
    if ((val % 2)) {
     return val;
    }
    return '';
  };

  export default {
    data() {
      return {
        scale,
        height: 200,
        label: { formatter: formatter },
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