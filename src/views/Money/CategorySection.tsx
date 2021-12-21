import styled from 'styled-components';
import React, {useState} from 'react';

const Wrapper = styled.section`
  font-size: 18px;

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

type Props = {
  value: '-' | '+',
  onChange: (value: '-' | '+') => void;
}

const CategorySection: React.FC<Props> = (props) => {
  const categoryMap = {'-': '支出', '+': '收入'};
  type Keys = keyof typeof categoryMap
  const [categoryList] = useState<Keys[]>(['-', '+']);

  const category = props.value;// + 表示收入，-表示支出
  return (
    <Wrapper>
      <ul>
        {categoryList.map(c =>
          <li key={c} className={category === c ? 'selected' : ''}
              onClick={() => props.onChange(c)}>
            <span>{categoryMap[c]}</span>
          </li>
        )}
      </ul>
    </Wrapper>
  );
};

export {CategorySection};
