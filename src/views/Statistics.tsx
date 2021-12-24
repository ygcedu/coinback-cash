import React, {useState} from 'react';
import styled from 'styled-components';
import {RecordItem, useRecords} from '../hooks/useRecords';
import {useTags} from '../hooks/useTags';
import day from 'dayjs';
import Icon from '../components/Icon';
import {SelectSection} from './Detail/SelectSection';
import cs from 'classnames';
import Layout from '../components/Layout';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
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

const Header = styled.h3`
  font-size: 16px;
  line-height: 20px;
  padding: 10px 16px;
  font-weight: normal;
`;

const Wrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 2;

  .mask {
    position: fixed;
    // fixme: pc 端显示，100% 对 fixed 不起作用
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 9;
    display: none;
  }

  // fixme: 记录条数多时，会遮住底部导航栏中间的圆形记账图标
  > ul.category-list {
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    transition: all 0.25s linear;
    z-index: 10;
    top: -17%;

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

    // fixme: 移动过程不要遮盖上面的节点（目前不会遮盖）
    &.show {
      top: 0;

      // fixme: 手机端滑动时，遮罩层不会跟着滑动
      & + .mask {
        display: block;
      }
    }
  }
`;

const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];

const defaultSelected = {
  category: 'expense',
  date: 'week',
  listVisible: false
};

function Statistics() {
  const [selected, setSelected] = useState(defaultSelected);

  const onChange = (obj: Partial<typeof selected>) => {
    setSelected({...selected, ...obj});
  };

  const {records} = useRecords();
  const {getIcon} = useTags();
  const hash: { [K: string]: RecordItem[] } = {};
  const selectedRecords = records.filter(r => r.category === selected.category);

  selectedRecords.forEach(r => {
    const key = day(r.createdAt).format('MM月DD日') + ' ' + week[day(r.createdAt).day()];
    if (!(key in hash)) {
      hash[key] = [];
    }
    hash[key].push(r);
  });

  // Object.entries 把对象变成数组
  const array = Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) return 0;
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    return 0;
  });

  const categoryMap = {'expense': '支出', 'income': '收入'};
  type Keys = keyof typeof categoryMap
  const [categoryList] = useState<Keys[]>(['expense', 'income']);

  return (
    <MyLayout>
      <SelectSection category={selected.category}
                     date={selected.date}
                     listVisible={selected.listVisible}
                     onChange={value => onChange(value)}/>
      <Wrapper>
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
        <div className='mask'/>
        {array.map(([date, records], i) =>
          <div key={i}>
            <Header>{date}</Header>
            <div>
              {records.map((r, index) => {
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
          </div>)}
      </Wrapper>
    </MyLayout>
  );
}

export default Statistics;
