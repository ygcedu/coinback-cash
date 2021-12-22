import React, {useState} from 'react';
import Layout from 'components/Layout';
import Icon from 'components/Icon';
import {Input} from 'components/Input';
import {useTags} from '../hooks/useTags';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {Topbar} from './Tag/Topbar';
import {Center} from '../components/Center';

const InputWrapper = styled.div`
  background: white;
  padding: 0 16px;
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;

  .round {
    background-color: #ffda44;
    border-radius: 50%;
    width: 2.2em;
    height: 2.2em;
    margin-right: 16px;
  }

  label {
    flex: 1;
  }
`;

type Params = {
  category: '/new-pay' | '/new-income'
}

const Tag: React.FC = () => {
  const [newTag, setNewTag] = useState<{ icon: string, name: string, category: '-' | '+' }>({
    icon: 'canyin',
    name: '',
    category: '-'
  });
  const {addTag} = useTags();
  // id 重命名为 idString，隐式强调 id 的类型是 string 类型
  let {category: categoryStr} = useParams<Params>();

  const tagContent = () => (
    <div>
      <InputWrapper>
        <Center className='round'>
          <Icon name={newTag.icon} size={20}/>
        </Center>
        <Input type="text" placeholder="请输入类别名称（不超过4个汉字）" value={newTag.name}
               onChange={(e) => {
                 setNewTag({
                   icon: newTag.icon,
                   name: e.target.value,
                   category: categoryStr === '/new-pay' ? '-' : '+'
                 });
               }}
        />
      </InputWrapper>
    </div>
  );

  const history = useHistory();
  // fixme: 用户直接输入 url 访问页面，则没法回退
  const onClickBack = () => {
    history.goBack();
  };

  return (
    <Layout>
      <Topbar>
        <Icon name="left" size={24} onClick={onClickBack}/>
        <span>添加类别</span>
        <span onClick={() => addTag(newTag)}>完成</span>
      </Topbar>
      {tagContent()}
    </Layout>
  );
};

export {Tag};
