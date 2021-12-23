import React, {useState} from 'react';
import Layout from 'components/Layout';
import Icon from 'components/Icon';
import {Input} from 'components/Input';
import {Category, TagItem, useTags} from '../hooks/useTags';
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
  category: Category
}

const categoryMap = {'expense': '支出', 'income': '收入'};

const Tag: React.FC = () => {
  const [newTag, setNewTag] = useState<Omit<TagItem, 'id'>>({
    icon: 'canyin',
    name: '',
    category: 'expense'
  });
  const {addTag} = useTags();
  let {category} = useParams<Params>();

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
                   category
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
        <span>添加{categoryMap[category]}类别</span>
        <span onClick={() => addTag(newTag)}>完成</span>
      </Topbar>
      {tagContent()}
    </Layout>
  );
};

export {Tag};
