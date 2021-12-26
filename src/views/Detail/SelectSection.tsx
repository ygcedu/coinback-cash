import styled from 'styled-components';
import React, {useState} from 'react';
import {VerticalSelect} from '../Tag/VerticalSelect';
import Icon from '../../components/Icon';
import {Center} from '../../components/Center';

const Wrapper = styled.section`
  flex-shrink: 0;
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
  dateUnit: string
} | {
  listVisible: boolean
}

type Props = {
  category: string
  dateUnit: string
  listVisible: boolean
  onChange: (value: Value) => void
}

const categoryMap = {'expense': '支出', 'income': '收入'};
const dateCategoryMap = [
  {key: 'day', value: '日'},
  {key: 'week', value: '周'},
  {key: 'month', value: '月'},
  {key: 'year', value: '年'}
];

const SelectSection: React.FC<Props> = (props) => {
  type Keys = keyof typeof categoryMap
  const [dateCategory, setDateCategory] = useState(props.dateUnit);

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
      <VerticalSelect type='bar'
                      value={dateCategory}
                      map={dateCategoryMap}
                      onChange={(value) => {
                        setDateCategory(value);
                        props.onChange({dateUnit: value});
                      }}/>
    </Wrapper>
  );
};

export {SelectSection};
