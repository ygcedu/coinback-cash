import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  align-items: center;

  > .x {
    margin-right: 16px;
    // 不换行
    white-space: nowrap;
  }

  > input {
    display: block;
    width: 100%;
    height: 72px;
    background: none;
    border: none;
  }
`;
type Props = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;// 继承一部分 input 的属性

const Input: React.FC<Props> = (props) => {

  const {label, ...rest} = props;
  return (
    <Label>
      <span>{props.label}</span>
      <input type={props.type}
             placeholder={props.placeholder}
             defaultValue={props.defaultValue}
             onBlur={props.onBlur}/>
    </Label>
  );
};

export {Input};