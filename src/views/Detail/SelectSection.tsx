import styled from 'styled-components';
import React, {useState} from 'react';
import {SelectBar} from '../Tag/SelectBar';
import Icon from '../../components/Icon';
import {Center} from '../../components/Center';

const Wrapper = styled.section`
  font-size: 14px;
  background-color: #ffda44;
  display: flex;
  flex-direction: column;

  .category {
    text-align: center;
    padding: 20px 0 14px 0;

    > div {
      display: inline-block;
    }

    svg {
      margin-left: 0.5em;
    }
  }
`;

type Value = {
  category: string
} | {
  date: string
} | {
  listVisible: boolean
}

type Props = {
  category: string
  date: string
  listVisible: boolean
  onChange: (value: Value) => void
}

const categoryMap = {'expense': '支出', 'income': '收入'};
const dateCategoryMap = {'week': '周', 'month': '月', 'year': '年'};

const SelectSection: React.FC<Props> = (props) => {
  type Keys = keyof typeof categoryMap
  const [dateCategory, setDateCategory] = useState(props.date);

  return (
    <Wrapper>
      <div className='category'>
        <Center onClick={() => {
          props.onChange({listVisible: !props.listVisible});
        }}>
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
    </Wrapper>
  );
};

export {SelectSection};
