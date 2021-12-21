import styled from 'styled-components';
import React from 'react';
import {useTags} from 'hooks/useTags';
import Icon from '../../components/Icon';

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
  value: number[],
  onChange: (value: number[]) => void;
}

// FC = FunctionComponent
const TagsSection: React.FC<Props> = (props) => {
  const {tags, addTag} = useTags();
  const selectedTagIds = props.value;

  const onToggleTag = (tagId: number) => {
    const index = selectedTagIds.indexOf(tagId);
    if (index >= 0) {
      // 如果 tag 已被选中，就复制所有没有被选中的 tag，作为新的 selectedTag
      props.onChange(selectedTagIds.filter(t => t !== tagId));
    } else {
      props.onChange([...selectedTagIds, tagId]);
    }
  };

  const getClass = (tagId: number) => tagId === -1 || selectedTagIds.indexOf(tagId) >= 0 ? 'selected' : '';

  return (
    <Wrapper>
      <ol>
        {tags.map(tag =>
          <li key={tag.id} onClick={() => onToggleTag(tag.id)}
              className={getClass(tag.id)}
          >
            <Icon name={tag.name} size={24}/>
          </li>
        )}
        <li onClick={addTag}
            className={getClass(-1)}>
          <Icon name='setting' size={24}/>
        </li>
      </ol>
    </Wrapper>
  );
};

export {TagsSection};
