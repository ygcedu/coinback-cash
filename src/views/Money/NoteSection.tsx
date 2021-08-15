import styled from 'styled-components';
import React, {useRef} from 'react';
import {Input} from 'components/Input';

const Wrapper = styled.section`
  background: #f5f5f5;
  padding: 0 16px;
  font-size: 14px;
`;

type Props = {
  value: string,
  onChange: (value: string) => void;
}

const NoteSection: React.FC<Props> = (props) => {
  const note = props.value;
  const refInput = useRef<HTMLInputElement>(null);

  // 非受控组件设值
  const onBlur = () => {
    if (refInput.current !== null) {
      console.log(refInput.current.value);
      props.onChange(refInput.current.value);
      // 类似于Vue的 <input v-model.lazy="value"/>;
    }
  };

  return (
    <Wrapper>
      <Input>

      </Input>
    </Wrapper>
  );
};

export {NoteSection};