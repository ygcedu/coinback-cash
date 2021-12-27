import {EChartOption} from 'echarts';

export const defaultOption = (keys: any[], values: any[], name: string): EChartOption => {
  const color = '#ffda44';
  return {
    grid: {
      left: 0,
      right: 0
    },
    xAxis: {
      type: 'category',
      data: keys,
      axisTick: {alignWithLabel: true},
      axisLine: {lineStyle: {color: '#ddd'}},
      axisLabel: {
        formatter: function (value: string, index: number) {
          return value.substr(5);
        }
      }
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [{
      symbol: 'circle',// 实心圆
      symbolSize: 15,
      itemStyle: {borderWidth: 1, color: '#bbb', borderColor: '#bbb'},
      // lineStyle: {width: 10},
      data: values,
      type: 'line',
      smooth: true
    }],
    tooltip: {
      show: true,
      triggerOn: 'click',
      position: 'top',
      formatter: '{c}',
      extraCssText: 'box-shadow: 2px 2px 3px #666'
    },
  };
};
