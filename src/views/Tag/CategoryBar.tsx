import styled from 'styled-components';
import React, {useState} from 'react';
import {Category} from 'hooks/useTags';

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  background-color: #ffda44;

  > ul {
    display: flex;
    width: 80%;
    border: 1px solid #333;
    margin-bottom: 14px;
    border-radius: 8px;
    overflow: hidden;
    align-items: center;

    > li {
      flex: 1;
      text-align: center;
      padding: 0.4em 0;

      &.selected {
        background-color: #333;
        color: white;
      }
    }
  }
`;

type Props = {
  value: Category,
  onChange: (value: Category) => void;
}

const CategoryBar: React.FC<Props> = (props) => {
  const categoryMap = {'expense': '支出', 'income': '收入'};
  type Keys = keyof typeof categoryMap
  const [categoryList] = useState<Keys[]>(['expense', 'income']);

  const category = props.value;// income 表示收入，expense 表示支出
  return (
    <Wrapper>
      <ul>
        {categoryList.map(c =>
          <li key={c} className={category === c ? 'selected' : ''}
              onClick={() => props.onChange(c)}>
            {categoryMap[c]}
          </li>
        )}
      </ul>
    </Wrapper>
  );
};

export {CategoryBar};
