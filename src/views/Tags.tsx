import React from 'react';
import {useTags} from 'hooks/useTags';
import styled from 'styled-components';
import Icon from 'components/Icon';
import {Link, useHistory} from 'react-router-dom';
import {Button} from 'components/Button';
import {Topbar} from './Tag/Topbar';
import {Center} from '../components/Center';

const TagList = styled.ol`
  font-size: 16px;
  background: white;
  height: 100%;
  overflow-y: auto;

  > li {
    border-bottom: 1px solid #d5d5d9;
    line-height: 20px;
    margin-left: 16px;
    display: flex;
    align-items: center;

    svg {
      margin: 10px 10px 10px 0;
    }

    // Link 就是一个 a 标签
    > a {
      flex: 1;
      padding: 12px 16px 12px 0;
      display: flex;
      justify-content: space-between; // 左右分开
      align-items: center; // 上下居中
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  > button {
    width: 100%;
    height: 56px;
    font-size: 16px;
    background: white;
    border-radius: 0;
    box-shadow: 0 0 3px rgb(0 0 0 / 25%);
    color: #606266;
  }

  .placeholder {
    width: 44px;
  }

  header {
    font-size: 16px;
    background-color: #ffda44;
  }
`;

function Tags() {
  const {tags, addTag} = useTags();
  const history = useHistory();
  // fixme: 用户直接输入 url 访问页面，则没法回退
  const onClickBack = () => {
    history.goBack();
  };

  return (
    <Wrapper>
      <Topbar>
        <Center onClick={onClickBack}>
          <Icon name="left" size={24}/>返回
        </Center>
        <span>类别设置</span>
        <span className='placeholder'/>
      </Topbar>
      <TagList>
        {tags.map(tag =>
          <li key={tag.id}>
            <Icon name="remove" size={24}></Icon>
            <Link to={'/tags/' + tag.id}>
              <Center>
                <Icon name={tag.name} size={24}/>
                <span className="oneLine">{tag.name}</span>
              </Center>
            </Link>
            <Icon name="drag" size={24}></Icon>
          </li>
        )}
      </TagList>
      <Button onClick={addTag}>+ 添加标签</Button>
    </Wrapper>
  );
}

export default Tags;
