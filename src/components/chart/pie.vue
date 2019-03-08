<template>
  <div :style="{ padding: '0' }">
    <h4 :style="{ marginBottom: '20px' }">{{ title }}</h4>
    <v-chart
      height="300"
      :data="data"
      :forceFit="true"
      :scale="scale">
      <v-axis />
      <v-legend dataKey="item" />
      <v-tooltip :showTitle="false" dataKey="item*percent" />
      <v-pie
        position="percent"
        color="item"
        :vStyle="pieStyle"
        :label="labelConfig"
      />
      <v-coord type="theta" />
    </v-chart>
  </div>
</template>

<script>
const scale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%',
}];
export default {
  name: 'pie',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default:()=>[]
    }
  },
  data() {
    return {
      scale,
      pieStyle: {
        stroke: "#fff",
        lineWidth: 1
      },
      labelConfig: ['percent', {
        offset: -40,
        textStyle: {
          rotate: 7,
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'rgba(0, 0, 0, .45)'
        }
      }],
    };
  }
};
</script>
