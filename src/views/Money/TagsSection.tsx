import styled from 'styled-components';
import React from 'react';
import {useTags} from 'hooks/useTags';
import Icon from '../../components/Icon';
import {Link} from 'react-router-dom';

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
      background: #f5f5f5;
      border-radius: 50%;
      font-size: 14px;
      margin: 8px 12px;
      width: 3em;
      height: 3em;
      display: flex;
      justify-content: center;
      align-items: center;

      &.selected {
        background: #ffda44;
      }
    }
  }
`;

type Props = {
  value: number,
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

  return (
    <Wrapper>
      <ol>
        {tags.map(tag =>
          <li key={tag.id} onClick={() => onToggleTag(tag.id)}
              className={getClass(tag.id)}
          >
            <Icon name={tag.icon} size={24}/>
          </li>
        )}
        <li>
          <Link to='/tags'>
            <Icon name='setting' size={24}/>
          </Link>
        </li>
      </ol>
    </Wrapper>
  );
};

export {TagsSection};
