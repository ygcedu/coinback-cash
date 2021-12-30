import styled from 'styled-components';
import React from 'react';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  input[type="date"] {
    text-align: center;
    position: relative;
    width: 100%;
    height: 100%;
    border: none;
    font-size: 13px;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background-color: transparent;
    color: transparent;
    opacity: 0;

    &::-webkit-calendar-picker-indicator {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      height: auto;
      color: transparent;
      background: transparent;
    }

    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      visibility: hidden;
    }

    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
  }
`;

type Props = {
  onChange: (value: string) => void
}


const DatePicker: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <input type='date' className='oneLine' onChange={(e) => {
        props.onChange(e.target.value);
      }}/>
    </Wrapper>
  );
};
export {DatePicker};
