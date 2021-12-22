import Layout from '../components/Layout';
import React, {useState} from 'react';
import styled from 'styled-components';
import {CategorySection} from './Money/CategorySection';
import {NoteSection} from './Money/NoteSection';
import {NumberPadSection} from './Money/NumberPadSection';
import {TagsSection} from './Money/TagsSection';
import {useRecords} from '../hooks/useRecords';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  position: relative;
  animation: animate 0.25s ease;

  @keyframes animate {
    from {
      bottom: -100vh;
    }
    to {
      bottom: 0;
    }
  }
`;

type Category = ('-' | '+');

const defaultFormData = {
  tagId: -2,
  note: '',
  category: '-' as Category,
  amount: 0
};

const CategoryWrapper = styled.div`
  background: #ffda44;
`;

// todo: 一行显示备注和数字面板输出值（需要重新设计 NoteSection 和 NumberPadSection 组件）
// const Line = styled.div`
//   display: flex;
// `;

function Money() {
  const [selected, setSelected] = useState(defaultFormData);

  const {addRecord} = useRecords();
  const onChange = (obj: Partial<typeof selected>) => {
    setSelected({...selected, ...obj});
  };

  const submit = () => {
    if (addRecord(selected)) {
      alert('保存成功');
      setSelected(defaultFormData);
    }
  };

  return (
    <MyLayout scrollTop={9999}>
      <CategoryWrapper>
        <CategorySection value={selected.category}
                         onChange={category => onChange({category})}/>
      </CategoryWrapper>
      <TagsSection value={selected.tagId}
                   onChange={tagId => onChange({tagId})}/>
      <div>
        <NoteSection value={selected.note}
                     onChange={note => onChange({note})}/>
        <NumberPadSection value={selected.amount}
                          onChange={amount => onChange({amount})}
                          onOk={submit}/>
      </div>
    </MyLayout>
  );
}

export default Money;
