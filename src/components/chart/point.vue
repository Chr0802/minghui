<template>
  <div>
    <v-chart :forceFit="true" height="400" :data="data">
      <v-tooltip :showTitle="false" :crosshairs="tooltipCrosshairs" :itemTpl="tooltipItemTpl" />
      <v-axis />
      <v-point position="x*y" :size="4" :opacity="0.65" :tooltip="pointTooltip" shape="circle" />
    </v-chart>
  </div>
</template>

<script>
export default {
  mounted() {
  },
  props:{
    data:{
      type:Array,
      default:()=>[],
    }
  },
  data() {
    return {
      height: 330,
      pointTooltip: ['name*x*y', (name, x, y) => {
        return {
          name: name,
          value: x + ', ' + y
        };
      }],
      tooltipCrosshairs: { type: 'cross' },
      tooltipItemTpl: `
        <li data-index={index} style="margin-bottom:4px;">
          <span style="background-color:{color};" class="g2-tooltip-marker"></span>
          {name}<br />{value}
        </li>
      `,
    };
  }
};
</script>
