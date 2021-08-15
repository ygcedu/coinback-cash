import {useState} from 'react';
import {createId} from 'lib/createId';

const defaultTags = [
  {id: createId(), name: '衣'},
  {id: createId(), name: '食'},
  {id: createId(), name: '住'},
  {id: createId(), name: '行'}
];

const useTags = () => {
  const [tags, setTags] = useState<{ id: number; name: string }[]>(defaultTags);
  const findTag = (id: number) => tags.filter(tag => tag.id === id)[0];
  const findTagIndex = (id: number) => {
    let result = -1;
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].id === id) {
        result = i;
        break;
      }
    }
    return result;
  };
  const updateTag = (id: number, obj: { name: string }) => {
    // 1. 获取你要改的 tag 的下标
    const index = findTagIndex(id);
    // vue：tags.splice(index: 1,{id: id,name: obj.name})
    // 2. 深拷贝 tags 得到 tagsClone
    const tagsClone = JSON.parse(JSON.stringify(tags));
    // 3. 把 tagsClone 的第 index 删掉，换成 {id:id, name: obj.name}
    tagsClone.splice(index, 1, {id: id, name: obj.name});
    // React 的 useState 发现如果传入的 tags 地址没有变，就不做任何处理
    setTags(tagsClone); // 不可变数据 tag，newTags
  };
  return {tags, setTags, findTag, updateTag, findTagIndex};
};

export {useTags};

// 改 tag
// 衣 => 衣服
// {amount:100, tags:[1]}

// tag: string => tag: {id: number; name: string}
