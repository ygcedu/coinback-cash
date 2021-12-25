import styled from 'styled-components';
import React, {useState} from 'react';

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
        color: white;
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

    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }

    > li {
      min-width: 3em;
      text-align: center;
      padding: 6px 0;

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

type Props = {
  type?: 'bar' | 'line'
  value: string
  map: { [key: string]: string }
  onChange: (value: string) => void
}

const VerticalSelect: React.FC<Props> = (props) => {
  const [options] = useState<string[]>(Object.keys(props.map));
  const selected = props.value;

  const Content = () => {
    return (
      <ul>
        {options.map(c =>
          <li key={c} className={selected === c ? 'selected' : ''}
              onClick={() => props.onChange(c)}>
            <span>{props.map[c]}</span>
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
