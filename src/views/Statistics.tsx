import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {DataUnit, useRecords} from '../hooks/useRecords';
import {Category} from '../hooks/useTags';
import Icon from '../components/Icon';
import {SelectSection} from './Detail/SelectSection';
import cs from 'classnames';
import Nav from '../components/Nav';
import {VerticalSelect} from './Tag/VerticalSelect';

const MyLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Main = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;

  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: none;
    z-index: 1;
  }

  > ul.category-list {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    transition: all 0.25s linear;
    top: -17%;
    z-index: 2;

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
      top: 0;

      & + .mask {
        display: block;
      }
    }
  }

  .details {
    flex-grow: 1;
    overflow-y: auto;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #ccc;
`;

const defaultSelected = {
  category: 'expense',
  dateUnit: 'week',
  listVisible: false
};

function Statistics() {
  const [selected, setSelected] = useState(defaultSelected);
  type Selected = Partial<typeof selected>;

  const onChange = (obj: Selected) => {
    setSelected({...selected, ...obj});
  };

  const {records, sections, getRecords} = useRecords();
  // 选中的日期分段值
  const [value, setValue] = useState(sections[sections.length - 1]?.value || '');
  const [options, setOptions] = useState(sections);

  const categoryMap = {'expense': '支出', 'income': '收入'};
  type Keys = keyof typeof categoryMap
  const [categoryList] = useState<Keys[]>(['expense', 'income']);

  useEffect(() => {
    getRecords({
      category: selected.category as Category,
      dateUnit: selected.dateUnit as DataUnit,
      query: 5
    });

  }, [selected, records]);// 不可变数据

  useEffect(() => {
    setValue(sections[sections.length - 1]?.value);
    setOptions(sections);
  }, [sections]);

  const Detail = () => {
    let inner;
    if (true) {
      inner = <Wrapper>
        <Icon name='nodata' size={100}/>
        暂无数据
      </Wrapper>;
    } else {}

    return (
      <div className='details'>{inner}</div>
    );
  };

  return (
    <MyLayout>
      <SelectSection category={selected.category}
                     dateUnit={selected.dateUnit}
                     listVisible={selected.listVisible}
                     onChange={value => onChange(value)}/>
      <Main>
        <ul className={cs('category-list', selected.listVisible ? 'show' : undefined)}>
          {categoryList.map(c =>
            <li key={c} className={selected.category === c ? 'selected' : ''}
                onClick={() => onChange({category: c, listVisible: false})}>
              <Icon name={c} size={24}/>
              <span>{categoryMap[c]}</span>
              <Icon name='check' size={24}/>
            </li>
          )}
        </ul>
        <div className='mask' onClick={() => {onChange({listVisible: false});}}/>
        <VerticalSelect type='line'
                        value={value}
                        map={options}
                        onChange={value => {setValue(value);}}/>
        <Detail/>
        <Nav/>
      </Main>
    </MyLayout>
  );
}

export default Statistics;
