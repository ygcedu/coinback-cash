import React, {useState} from 'react';
import Layout from 'components/Layout';
import Icon from 'components/Icon';
import {Input} from 'components/Input';
import {Category, TagItem, useTags} from '../hooks/useTags';
import {useHistory, useParams} from 'react-router-dom';
import styled from 'styled-components';
import {Topbar} from './Tag/Topbar';
import {Center} from '../components/Center';
import {defaultTags} from '../data/tags';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  flex-shrink: 0;
  background: white;
  padding: 0 16px;
  margin: 8px 0;
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

const Wrapper = styled.section`
  flex: 1;
  background: #FFFFFF;
  padding: 12px 16px;
  overflow: auto;

  > ol {
    display: grid;
    margin: 0 -12px;
    grid-template-columns:1fr 1fr 1fr 1fr 1fr;
    margin-left: auto;
    margin-right: auto;

    > li {
      display: flex;
      flex-direction: column;
      align-items: center;

      div {
        background: #f5f5f5;
        border-radius: 50%;
        font-size: 14px;
        margin: 8px 12px;
        width: 3em;
        height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &.selected div {
        background: #ffda44;
      }
    }
  }
`;

type Params = {
  category: Category
}

const categoryMap = {'expense': '支出', 'income': '收入'};

const Tag: React.FC = () => {
  const [newTag, setNewTag] = useState<TagItem>({
    id: 32,
    icon: 'youxi',
    name: '',
    category: 'expense'
  });
  const {addTag} = useTags();
  let {category} = useParams<Params>();

  const tagContent = () => (
    <InputWrapper>
      <Center className='round'>
        <Icon name={newTag.icon} size={20}/>
      </Center>
      <Input type="text" placeholder="请输入类别名称（不超过4个汉字）" value={newTag.name}
             onChange={(e) => {
               setNewTag({
                 id: newTag.id,
                 icon: newTag.icon,
                 name: e.target.value,
                 category
               });
             }}
      />
    </InputWrapper>
  );

  const history = useHistory();
  // fixme: 用户直接输入 url 访问页面，则没法回退
  const onClickBack = () => {
    history.goBack();
  };

  const onToggleTag = (tag: TagItem) => {
    setNewTag(tag);
  };

  const getClass = (name: string) => newTag.icon === name ? 'selected' : '';
  const tagGroup = defaultTags.filter(tag => tag.category === category);

  return (
    <MyLayout>
      <Topbar>
        <Icon name="left" size={24} onClick={onClickBack}/>
        <span>添加{categoryMap[category]}类别</span>
        <span onClick={() => {
          addTag(newTag);
          history.goBack();
        }}>完成</span>
      </Topbar>
      {tagContent()}
      <Wrapper>
        <ol>
          {tagGroup.map(tag =>
            <li key={tag.id} onClick={() => onToggleTag(tag as TagItem)}
                className={getClass(tag.name)}>
              <Center>
                <Icon name={tag.icon} size={24}/>
              </Center>
            </li>
          )}
        </ol>
      </Wrapper>
    </MyLayout>
  );
};

export {Tag};
