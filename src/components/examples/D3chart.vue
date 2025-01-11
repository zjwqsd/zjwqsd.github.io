<template>
  <div ref="chart" style="width: 400px; height: 300px;"></div>
</template>

<script>
import * as d3 from 'd3';

export default {
  data() {
    return {
      dataset: [10, 20, 30, 40, 50]
    };
  },
  mounted() {
    // 确保 DOM 渲染完成后再执行 D3 渲染
    this.$nextTick(() => {
      this.buildChart();
    });
  },
  methods: {
    buildChart() {
      // 获取 DOM 元素引用
      const svg = d3.select(this.$refs.chart)
        .append('svg')
        .attr('width', 400)
        .attr('height', 300);

      // 输出调试信息
      console.log('SVG element created:', svg);

      // 创建矩形并绑定数据
      svg.selectAll('rect')
        .data(this.dataset)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 40)
        .attr('y', d => 300 - d)
        .attr('width', 30)
        .attr('height', d => d)
        .attr('fill', 'steelblue');

      // 输出调试信息
      console.log('Rectangles added:', this.dataset);
    }
  }
};
</script>

<style scoped>
rect {
  transition: all 0.3s ease;
}

rect:hover {
  fill: orange;
}
</style>
