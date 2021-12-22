import React from 'react';
import Layout from 'components/Layout';
import Icon from 'components/Icon';
import {Button} from 'components/Button';
import {Input} from 'components/Input';
import {Center} from 'components/Center';
import {Space} from 'components/Space';
import {useTags} from '../hooks/useTags';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {Topbar} from './Tag/Topbar';

type Params = {
  id: string
}

const InputWrapper = styled.div`
  background: white;
  padding: 0 16px;
  margin-top: 8px;
`;

const Tag: React.FC = () => {
  const {findTag, updateTag, deleteTag} = useTags();
  // id 重命名为 idString，隐式强调 id 的类型是 string 类型
  let {id: idString} = useParams<Params>();
  const tag = findTag(parseInt(idString));
  const tagContent = (tag: { id: number, name: string }) => (
    <div>
      <InputWrapper>
        <Input label="标签名" type="text" placeholder="标签名" value={tag.name}
               onChange={(e) => {
                 updateTag(tag.id, {name: e.target.value});
               }}
        />
      </InputWrapper>
      <Center>
        <Space/>
        <Space/>
        <Space/>
        <Button onClick={() => {
          deleteTag(tag.id);
          // window.history.back();
        }}>删除标签</Button>
      </Center>
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
        <Icon name="left" onClick={onClickBack}/>
        <span>编辑标签</span>
        <span/>
      </Topbar>
      {tag ? tagContent(tag) : <Center>tag 不存在</Center>}
    </Layout>
  );
};

export {Tag};
