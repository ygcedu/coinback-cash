import Layout from '../components/Layout';
import React, {useState} from 'react';
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
  }
`;

const CategoryWrapper = styled.div`
  background: #ffda44;
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
  const {records} = useRecords();
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
                return <Item key={index}>
                  <div className="tag">
                    <Icon name={tag && tag.icon} size={24}/>
                  </div>
                  {r.note && <div className="note">
                    {r.note}
                  </div>}
                  <div className="amount">{category === 'expense' ? '-' : '+'}{r.amount}</div>
                </Item>;
              })}
            </div>
          </div>)}
      </div>
    </MyLayout>
  );
}

export default Details;
