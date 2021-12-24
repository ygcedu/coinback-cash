import styled from 'styled-components';
import React, {useState} from 'react';
import {SelectBar} from '../Tag/SelectBar';
import Icon from '../../components/Icon';
import {Center} from '../../components/Center';
import cs from 'classnames';

const Wrapper = styled.section`
  font-size: 14px;
  background-color: #ffda44;
  display: flex;
  flex-direction: column;
  position: relative;

  .category {
    text-align: center;
    padding: 20px 0;

    > div {
      display: inline-block;
    }

    svg {
      margin-left: 0.5em;
    }
  }

  > ul.category-list {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    transition: all 0.25s linear;

    > li {
      //text-align: center;
      padding: 16px 0;
      line-height: 1em;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ddd;
      padding: 10px 20px;

      span {
        flex: 1;
        margin-left: 10px;
      }

      svg:first-child {
        color: #ffc144;
      }

      svg:last-child {
        opacity: 0;
      }

      &.selected > :last-child {
        opacity: 1;
      }
    }

    &.show {
      top: 100%;
    }

    &.hidden {
      top: -100%;
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
  const [visible, setVisible] = useState(false);

  const showSelector = () => {
    setVisible(!visible);
  };

  return (
    <Wrapper>
      <div className='category'>
        <Center onClick={showSelector}>
          {categoryMap[props.category as Keys]}
          <Icon name='down' size={16}/>
        </Center>
      </div>
      <SelectBar value={dateCategory}
                 map={dateCategoryMap}
                 onChange={(value) => {
                   setDateCategory(value);
                   props.onChange({date: value});
                 }}/>
      <ul className={cs('category-list', visible ? 'show' : 'hidden')}>
        {categoryList.map(c =>
          <li key={c} className={props.category === c ? 'selected' : ''}
              onClick={() => props.onChange({category: c})}>
            <Icon name={c} size={24}/>
            <span>{categoryMap[c]}</span>
            <Icon name='check' size={24}/>
          </li>
        )}
      </ul>
    </Wrapper>
  );
};

export {SelectSection};
