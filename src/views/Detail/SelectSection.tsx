import styled from 'styled-components';
import React, {useState} from 'react';
import {SelectBar} from '../Tag/SelectBar';

const Wrapper = styled.section`
  font-size: 18px;
  background-color: #ffda44;

  > ul {
    display: flex;

    > li {
      width: 50%;
      //text-align: center;
      padding: 16px 0;
      line-height: 1em;

      &.selected > span {
        position: relative;

        &::after {
          content: '';
          display: block;
          height: 3px;
          background: #333;
          position: absolute;
          bottom: -16px;
          width: 2.8em;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    > li:first-child {
      text-align: right;
      padding-right: 18px;
    }

    > li:nth-child(2) {
      text-align: left;
      padding-left: 18px;
    }
  }
`;

type Value = {
  category: string
} | {
  date: string
}

type Props = {
  category: string
  date: string
  onChange: (value: Value) => void
}

const categoryMap = {'expense': '支出', 'income': '收入'};
const dateCategoryMap = {'week': '周', 'month': '月', 'year': '年'};

const SelectSection: React.FC<Props> = (props) => {
  type Keys = keyof typeof categoryMap
  const [categoryList] = useState<Keys[]>(['expense', 'income']);
  const [dateCategory, setDateCategory] = useState(props.date);

  return (
    <Wrapper>
      <ul>
        {categoryList.map(c =>
          <li key={c} className={props.category === c ? 'selected' : ''}
              onClick={() => props.onChange({category: c})}>
            <span>{categoryMap[c]}</span>
          </li>
        )}
      </ul>
      <SelectBar value={dateCategory}
                 map={dateCategoryMap}
                 onChange={(value) => {
                   setDateCategory(value);
                   props.onChange({date: value});
                 }}/>
    </Wrapper>
  );
};

export {SelectSection};
