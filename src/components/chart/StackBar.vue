<template>
  <div>
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-legend />
      <v-stack-bar position="x*percent" color="y" :vStyle="stackBarStyle" />
    </v-chart>
  </div>
</template>

<script>

  const scale = [{
    dataKey: 'percent',
    min: 0,
    formatter: '.2%',
  }];

  export default {
    props: {
      data: {
        type: Array,
        default:()=>[],
      }
    },
    data() {
      return {
        scale,
        height: 395,
        stackBarStyle: {
          stroke: "#fff",
          lineWidth: 1,
        },
      };
    }
  };
</script>