import Layout from '../components/Layout';
import React, {useRef, useState} from 'react';
import {CategorySection} from './Money/CategorySection';
import styled from 'styled-components';
import {RecordItem, useRecords} from '../hooks/useRecords';
import {useTags} from '../hooks/useTags';
import day from 'dayjs';
import Icon from '../components/Icon';
import {Topbar} from './Tag/Topbar';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;

  .details {
    // 只中间区域滚动
    flex: 1;
    overflow-y: auto;

    .scroll-snap {
      display: flex;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      font-size: 16px;
      position: relative;
      //scroll-behavior: smooth;

      &::-webkit-scrollbar {
        display: none;
      }

      > .delete {
        white-space: nowrap;
        border: 0;
        color: #fff;
        background-color: #eb4646;
        width: 4em;
        height: calc(30px + 20px);
        padding: 10px;
        position: absolute;
        left: 100%;
        outline: 0;
      }

      > .content {
        flex: 0 0 100%;
        scroll-snap-align: start;
      }

      > .space {
        flex: 0 0 4em;
        scroll-snap-align: end;
      }
    }
  }
`;

const CategoryWrapper = styled.div`
  background: #ffda44;
`;

const Item = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background: white;
  font-size: 16px;
  line-height: 20px;
  padding: 10px 16px;
  border-bottom: 1px solid #ddd;

  > .note {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
    flex: 1;
  }

  > .tag,
  > .amount {
    display: flex;
    align-items: center;
  }

  > .tag {
    flex-shrink: 0;
    justify-content: center;
    width: 30px;
    height: 30px;
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
  header {
    justify-content: center;
    font-size: 20px;
    letter-spacing: 0.2em;
    padding-bottom: 0;
  }
`;

const week = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];

function Details() {
  const [category, setCategory] = useState<'expense' | 'income'>('expense');
  const {records, removeRecord} = useRecords();
  const {getIcon} = useTags();
  const hash: { [K: string]: RecordItem[] } = {};
  const selectedRecords = records.filter(r => r.category === category);

  selectedRecords.forEach(r => {
    const key = day(r.createdAt).format('MM月DD日') + ' ' + week[day(r.createdAt).day()];
    if (!(key in hash)) {
      hash[key] = [];
    }
    hash[key].unshift(r);
  });

  // Object.entries 把对象变成数组
  const array = Object.entries(hash).sort((a, b) => {
    if (a[0] === b[0]) return 0;
    if (a[0] > b[0]) return -1;
    if (a[0] < b[0]) return 1;
    return 0;
  });

  const container = useRef<Array<HTMLDivElement | null>>([]);

  return (
    <MyLayout>
      <Wrapper>
        <Topbar>币归记账</Topbar>
      </Wrapper>
      <CategoryWrapper>
        <CategorySection value={category}
                         onChange={value => setCategory(value)}/>
      </CategoryWrapper>
      <div className='details'>
        {array.map(([date, records], i) =>
          <div key={i}>
            <Header>{date}</Header>
            <div>
              {records.map((r, index) => {
                const tag = getIcon(r.tagId);
                return (
                  <div className='scroll-snap' key={r.id} ref={el => container.current.push(el)}
                       onTouchStart={(e) => {
                         container.current.forEach((item) => {
                           if (item && e.currentTarget !== item) {
                             // item.scrollLeft = 0;
                             item.scroll({
                               left: 0,
                               behavior: 'smooth'
                             });
                           }
                         });
                       }}>
                    <button className="delete" onClick={() => {
                      removeRecord(r.id);
                    }}>删除
                    </button>
                    <Item className='content'>
                      <div className="tag">
                        <Icon name={tag && tag.icon} size={20}/>
                      </div>
                      <div className="note oneLine">
                        {r.note === '' ? (tag && tag.name) : r.note}
                      </div>
                      <div className="amount">{category === 'expense' ? '-' : '+'}{r.amount}</div>
                    </Item>
                    <s className="space"></s>
                  </div>
                );
              })}
            </div>
          </div>)}
      </div>
    </MyLayout>
  );
}

export default Details;
