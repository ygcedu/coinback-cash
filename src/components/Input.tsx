import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  align-items: center;

  > span {
    margin-right: 16px;
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
} & React.InputHTMLAttributes<HTMLInputElement>;// 继承一部分 input 的属性

const Input: React.FC<Props> = (props) => {

  const {label, children, ...rest} = props;
  return (
    <Label>
      <span>{props.label}</span>
      {/*将 input 全部原生属性自动添加进来*/}
      <input {...rest}/>
    </Label>
  );
};

export {Input};
