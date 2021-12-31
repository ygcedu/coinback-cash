import styled from 'styled-components';
import React, {useEffect, useRef} from 'react';

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
    //direction: rtl;

    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    > li {
      flex-shrink: 0;
      text-align: center;
      padding: 8px 0;
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
        bottom: -8px;
        width: 100%;
        left: 50%;
        transform: translateX(-50%);
      }
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
  const scrollLeft = useRef(0);

  const container = useRef<HTMLUListElement>(null);
  const changeScrollDirection = (e: any) => {
    e.currentTarget.scrollLeft += e.deltaY;
    // if (!container.current) return;
    // container.current.scrollLeft += e.deltaY;
    // e.preventDefault();
  };

  useEffect(() => {
    if (container.current) {
      // props 变化导致页面重新渲染会导致滚动条位置重置
      container.current.scrollLeft = scrollLeft.current;
    }
  }, [selected]);

  const Content = () => {
    return (
      <ul ref={container} onWheel={changeScrollDirection}>
        {options.map((c, index) =>
          <li key={c} className={selected === c ? 'selected' : undefined}
              onClick={(e) => {
                props.onChange(c);
                // e.currentTarget.scrollIntoView({inline: 'nearest'});
                if (!container.current) return;
                scrollLeft.current = container.current.scrollLeft;
                // e.preventDefault();
                // e.stopPropagation();
              }}>
            <span>{props.map[index].value}</span>
          </li>
        )}
      </ul>
    );
  };

  const Wrapper = () => {
    switch (props.type) {
      case 'line':
        return (
          <LineWrapper>
            <Content/>
          </LineWrapper>
        );
      case 'bar':
      default:
        return (
          <BarWrapper>
            <Content/>
          </BarWrapper>
        );
    }
  };

  return <Wrapper></Wrapper>;
};

export {VerticalSelect};
