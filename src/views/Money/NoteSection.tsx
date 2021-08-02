import styled from 'styled-components';
import React, {useRef, useState} from 'react';

const Wrapper = styled.section`
  background: #f5f5f5;
  padding: 0 16px;
  font-size: 14px;

  > label {
    display: flex;
    align-items: center;

    > .x {
      margin-right: 16px;
      // 不换行
      white-space: nowrap;
    }

    > input {
      display: block;
      width: 100%;
      height: 72px;
      background: none;
      border: none;
    }
  }
`;

const NoteSection: React.FC = () => {
  const [note, setNote] = useState('');
  const refInput = useRef<HTMLInputElement>(null);

  // 非受控组件设值
  const onBlur = () => {
    if (refInput.current !== null) {
      console.log(refInput.current.value);
      setNote(refInput.current.value);
      // 类似于Vue的 <input v-model.lazy="value"/>;
    }
  };

  return (
    <Wrapper>
      <label>
        <span>备注</span>
        <input type="text" placeholder="在这里添加备注"
               ref={refInput}
               defaultValue={note}
               onBlur={onBlur}
        />
      </label>
    </Wrapper>
  );
};

export {NoteSection};