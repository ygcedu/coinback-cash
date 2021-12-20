import styled from 'styled-components';
import React, {ChangeEventHandler} from 'react';
import {Input} from 'components/Input';

const Wrapper = styled.section`
  background: #f3f3f3;
  padding: 14px 16px;
  font-size: 14px;
`;

type Props = {
  value: string,
  onChange: (value: string) => void;
}

const NoteSection: React.FC<Props> = (props) => {
  const note = props.value;

  // 受控组件设值
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <Wrapper>
      <Input type="text" label="备注" value={note} onChange={onChange}
             placeholder="请填写备注"/>
    </Wrapper>
  );
};

export {NoteSection};
