import React, {useState} from 'react';
import {Category, useTags} from 'hooks/useTags';
import styled from 'styled-components';
import Icon from 'components/Icon';
import {Link, useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/Button';
import {Topbar} from './Tag/Topbar';
import {Center} from '../components/Center';
import {VerticalSelect} from './Tag/VerticalSelect';

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

    > .divide {
      flex: 1;
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
  position: relative;
  animation: animate 1s ease;
  overflow: hidden;

  // fixme: 此动画在 pc 端（屏幕较宽时），效果较差！
  @keyframes animate {
    from {
      left: 100vw;
    }
    to {
      left: 0;
    }
  }

  button {
    width: 100%;
    height: 56px;
    font-size: 16px;
    background: white;
    border-radius: 0;
    box-shadow: 0 0 3px rgb(0 0 0 / 25%);
    color: #606266;
  }

  .placeholder {
    width: 24px;
  }
`;

function Tags() {
  const {deleteTag, filterTag} = useTags();
  const history = useHistory();
  // fixme: 用户直接输入 url 访问页面，则没法回退
  const onClickBack = () => {
    history.goBack();
  };

  const {category: type} = useParams<{ category: Category }>();
  const [category, setCategory] = useState<Category>(type);
  const tagGroup = filterTag(category);

  return (
    <Wrapper>
      <Topbar>
        <Center onClick={onClickBack}>
          <Icon name="left" size={24}/>返回
        </Center>
        <span>类别设置</span>
        <Center style={{opacity: 0}}>
          <Icon name="left" size={24}/>占位
        </Center>
      </Topbar>
      <VerticalSelect value={category}
                      map={{expense: '支出', income: '收入'}}
                      onChange={(category) => {
                        setCategory(category as Category);
                      }}/>
      <TagList>
        {tagGroup.map(tag =>
          <li key={tag.id}>
            <Icon name="remove" size={24} onClick={() => {
              deleteTag(tag.id);
              // window.history.back();
            }}></Icon>
            <div className='divide'>
              <Center>
                <Icon name={tag.icon} size={24}/>
                <span className="oneLine">{tag.name}</span>
              </Center>
            </div>
            <Icon name="drag" size={24}></Icon>
          </li>
        )}
      </TagList>
      <Link to={`/tags/${category}/new`}>
        <Button>+ 添加类别</Button>
      </Link>
    </Wrapper>
  );
};

export default Tags;
