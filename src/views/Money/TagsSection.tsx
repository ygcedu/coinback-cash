import styled from 'styled-components';
import React from 'react';
import {Category, useTags} from 'hooks/useTags';
import Icon from '../../components/Icon';
import {Link} from 'react-router-dom';
import {Center} from '../../components/Center';

const Wrapper = styled.section`
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

type Props = {
  value: number,
  category: Category,
  onChange: (value: number) => void;
}

// FC = FunctionComponent
const TagsSection: React.FC<Props> = (props) => {
  const {tags} = useTags();
  const selectedTagId = props.value;

  const onToggleTag = (tagId: number) => {
    props.onChange(tagId);
  };

  const getClass = (tagId: number) => selectedTagId === tagId ? 'selected' : '';

  const tagGroup = tags.filter(tag => tag.category === props.category);

  return (
    <Wrapper>
      <ol>
        {tagGroup.map(tag =>
          <li key={tag.id} onClick={() => onToggleTag(tag.id)}
              className={getClass(tag.id)}>
            <Center>
              <Icon name={tag.icon} size={24}/>
            </Center>
            {tag.name}
          </li>
        )}
        <li>
          <Link to={'/tags/' + props.category}>
            <Center>
              <Icon name='setting' size={24}/>
            </Center>
          </Link>
          设置
        </li>
      </ol>
    </Wrapper>
  );
};

export {TagsSection};
