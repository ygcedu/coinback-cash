import styled from 'styled-components';
import React, {useState} from 'react';

const Wrapper = styled.section`
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

type Props = {
  value: string
  map: { [key: string]: string }
  onChange: (value: string) => void
}

const SelectBar: React.FC<Props> = (props) => {
  const [options] = useState<string[]>(Object.keys(props.map));
  const selected = props.value;

  return (
    <Wrapper>
      <ul>
        {options.map(c =>
          <li key={c} className={selected === c ? 'selected' : ''}
              onClick={() => props.onChange(c)}>
            {props.map[c]}
          </li>
        )}
      </ul>
    </Wrapper>
  );
};

export {SelectBar};
