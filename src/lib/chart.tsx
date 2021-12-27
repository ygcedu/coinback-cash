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
      axisLine: {
        lineStyle: {color: '#ddd'}
      },
      axisLabel: {
        formatter: '{value}',
        color: '#8d8d8d',
      }
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [{
      symbol: 'circle',// 实心圆
      symbolSize: 6,
      itemStyle: {
        borderWidth: 1,
        color: (node: any) => node.value === 0 ? '#fff' : color,
        borderColor: '#8d8d8d',
      },
      lineStyle: {width: 1, color: '#8d8d8d'},
      data: values,
      type: 'line',
      smooth: false,
      markLine: {
        symbol: ['none', 'none'],
        data: [{
          name: '平均线',
          type: 'average',
        }, {
          name: '最大值',
          type: 'max',
          lineStyle: {type: 'solid'},
          label: {
            show: true,
            position: 'end',
          }
        }],
        lineStyle: {width: 1, color: '#8d8d8d'},
        silent: true,
        animation: false
      }
    }]
  };
}
