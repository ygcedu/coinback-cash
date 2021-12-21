import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';

const Label = styled.label`
  display: flex;
  align-items: center;

  > span {
    // 不换行
    white-space: nowrap;
  }

  > input {
    display: block;
    width: 100%;
    height: 44px;
    background: none;
    border: none;
  }
`;
type Props = {
  label: string;
  icon?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;// 继承一部分 input 的属性

const Input: React.FC<Props> = (props) => {

  const {label, children, ...rest} = props;

  const Inner = () => {
    let inner;
    if (props.icon) {
      inner = <>
        <Icon name={props.icon} size={24}/>
        <span>{props.label}</span>
      </>;
    } else {
      inner = <span>{props.label}</span>;
    }
    return inner;
  };

  return (
    <Label>
      <Inner/>
      {/*将 input 全部原生属性自动添加进来*/}
      <input {...rest}/>
    </Label>
  );
};

export {Input};
