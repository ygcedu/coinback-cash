import React, {useState} from 'react';
import {Wrapper} from './NumberPadSection/Wrapper';
import {generateOutput} from './NumberPadSection/generateOutput';
import Icon from '../../components/Icon';

type Props = {
  value: number,
  onChange: (value: number) => void,
  onOk?: () => void;
}

const NumberPadSection: React.FC<Props> = (props) => {
  // const output = props.value.toString();
  const [output, _setOutput] = useState(props.value.toString());
  const setOutput = (output: string) => {
    let newOutput: string;
    if (output.length > 16) {
      newOutput = output.slice(0, 16);
    } else if (output.length === 0) {
      newOutput = '0';
    } else {
      newOutput = output;
    }
    _setOutput(newOutput);
    props.onChange(parseFloat(newOutput));
  };
  const onClickButtonWrapper = (e: React.MouseEvent) => {
    const text = (e.target as SVGUseElement | HTMLButtonElement).getAttribute('value');
    if (text === null) {return;}
    if (text === 'ok') {
      if (props.onOk) {
        props.onOk();
      }
      return;
    }
    if ('0123456789.'.split('').concat(['delete', 'clear']).indexOf(text) >= 0) {
      setOutput(generateOutput(text, output));
    }
  };

  return (
    <Wrapper>
      <div className="output">
        {output}
      </div>
      <div className="pad clearfix" onClick={onClickButtonWrapper}>
        <button value='1'>1</button>
        <button value='2'>2</button>
        <button value='3'>3</button>
        <button value='delete'>
          <Icon name="delete" value='delete' size={24}/>
        </button>
        <button value='4'>4</button>
        <button value='5'>5</button>
        <button value='6'>6</button>
        <button value='clear'>清空</button>
        <button value='7'>7</button>
        <button value='8'>8</button>
        <button value='9'>9</button>
        <button value='ok' className="ok highlight">完成</button>
        <button value='0' className="zero">0</button>
        <button value='.' className="dot">.</button>
      </div>
    </Wrapper>
  );
};
export {NumberPadSection};
