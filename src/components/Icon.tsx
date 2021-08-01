import React from 'react';
// 使用 svg loader 后，x 变为一个对象而不是文件路径
require('icons/money.svg');// TreeShaking 不适用于 require，此处生效
require('icons/labels.svg');
require('icons/statistics.svg');

type Props = {
  name: string
}

const Icon = (props: Props) => {
  return (
    <svg className="icon">
      <use xlinkHref={'#' + props.name}/>
    </svg>
  );
};

export default Icon;