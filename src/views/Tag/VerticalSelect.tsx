import styled from 'styled-components';
import React from 'react';

const BarWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background-color: #ffda44;

  > ul {
    display: flex;
    border: 1px solid #333;
    margin-bottom: 14px;
    border-radius: 8px;
    overflow: hidden;
    align-items: center;

    > li {
      width: 110px;
      text-align: center;
      padding: 0.4em 0;

      &.selected {
        background-color: #333;
        color: #ffda44;
      }

      &:not(:first-child) {
        border-left: 1px solid #333;
      }
    }
  }
`;

const LineWrapper = styled.section`
  font-size: 14px;

  > ul {
    display: flex;
    border-bottom: 1px solid #ddd;
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    white-space: nowrap;
    cursor: pointer;

    &::-webkit-scrollbar {
      //display: none; /* Chrome Safari */
    }

    > li {
      flex-shrink: 0;
      text-align: center;
      padding: 6px 0;
      margin: 0 12px;

      &.selected > span {
        position: relative;
      }

      &.selected > span::after {
        content: '';
        display: block;
        height: 3px;
        background: #333;
        position: absolute;
        bottom: -6px;
        width: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
`;

export type ObjectArray = { key: string, value: string }[]

type Props = {
  type?: 'bar' | 'line'
  value: string
  map: ObjectArray
  onChange: (value: string) => void
}

const VerticalSelect: React.FC<Props> = (props) => {
  const options = props.map.map(item => item.key);
  const selected = props.value;

  // todo:改变滚轮滚动方向
  // <ul id='scrollX' onWheel={changeScrollDirection}>
  // const changeScrollDirection = (e: WheelEvent) => {
  //   // e.currentTarget.scrollLeft -= e.deltaY;
  //   var container = document.getElementById('scrollX');
  //   let left = container!.scrollLeft;
  //   left -= e.deltaY;
  //   container!.scrollTo({
  //     top: 0,
  //     left,
  //   });
  //   console.log(document.getElementById('scrollX')!.scrollLeft);
  //   e.preventDefault();
  // };

  const Content = () => {
    return (
      <ul>
        {options.map((c, index) =>
          <li key={c} className={selected === c ? 'selected' : ''}
              onClick={(e) => {
                props.onChange(c);
                // fixme：pc 端鼠标点击后滚轮会跳转到头部
                e.stopPropagation();
                e.preventDefault();
              }}>
            <span>{props.map[index].value}</span>
          </li>
        )}
      </ul>
    );
  };

  return (
    props.type === 'line' ? (
      <LineWrapper>
        <Content/>
      </LineWrapper>
    ) : (
      <BarWrapper>
        <Content/>
      </BarWrapper>)
  );
};

export {VerticalSelect};
