import React from 'react';
import cs from 'classnames';
import styled from 'styled-components';

const Svg = styled.svg<{ size: number }>(props => ({
  width: props.size,
  height: props.size,
  fill: props.color
}));

type Props = {
  name?: string
  value?: string
  color?: string
  size?: number
} & React.SVGAttributes<SVGElement>

const Icon = (props: Props) => {
  // children, className 需要排除在外
  const {name, color, size, children, className, ...attributes} = props;
  return (
    // <svg className={`icon ${className ? className : ''}`} {...rest}>
    <Svg size={size!} color={color} aria-hidden="true"
         className={cs('icon', className)} {...attributes}>
      {name && <use xlinkHref={'#icon-' + name}/>}
    </Svg>
  );
};

Icon.defaultProps = {
  size: 16,
};

export default Icon;
