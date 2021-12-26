import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {DataUnit, Result, useRecords} from '../hooks/useRecords';
import {Category, useTags} from '../hooks/useTags';
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
    top: -30%;
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

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
  font-size: 18px;
  line-height: 20px;
  padding: 10px 16px;
  border-bottom: 1px solid #ddd;

  > .note {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }

  > .tag,
  > .note,
  > .amount {
    display: flex;
    align-items: center;
  }

  > .tag {
    justify-content: center;
    width: 1.8em;
    height: 1.8em;
    border-radius: 50%;
    background: #ffda44;
  }
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
  const [groupRecords, setGroupRecords] = useState<Result>([]);

  const categoryMap = {'expense': '支出', 'income': '收入'};
  type Keys = keyof typeof categoryMap
  const [categoryList] = useState<Keys[]>(['expense', 'income']);

  useEffect(() => {
    const gRecords = getRecords({
      category: selected.category as Category,
      dateUnit: selected.dateUnit as DataUnit,
      query: 5
    });

    setGroupRecords(gRecords);

  }, [selected, records]);// 不可变数据

  useEffect(() => {
    setValue(sections[sections.length - 1]?.key);
    setOptions(sections);
  }, [sections]);

  const {getIcon} = useTags();

  const selectedRecords = groupRecords.find((item) => item.uid === value);
  console.log(selectedRecords);

  const Detail = () => {
    let inner;
    if (selectedRecords === undefined) {
      inner = <Wrapper>
        <Icon name='nodata' size={100}/>
        暂无数据
      </Wrapper>;
    } else {
      // tagId: number
      // note: string
      // category: Category
      // amount: number
      // createdAt: string // ISO 8601
      inner = (
        <div className='details'>
          {selectedRecords.items.map((r, index) => {
            return <Item key={index}>
              <div className="tag">
                <Icon name={getIcon(r.tagId)} size={24}/>
              </div>
              {r.note && <div className="note">
                {r.note}
              </div>}
              <div className="amount">￥{r.amount}</div>
            </Item>;
          })}
        </div>
      );
    }

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
