import {useEffect, useRef, useState} from 'react';
import {createId} from 'lib/createId';

const defaultTags = [
  {id: createId(), name: '衣'},
  {id: createId(), name: '食'},
  {id: createId(), name: '住'},
  {id: createId(), name: '行'}
];

const useTags = () => {
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    console.log('after mount');
    setTags(JSON.parse(window.localStorage.getItem('tags') || '[]'));
    console.log('get item');
  }, []);// 第一次渲染

  const count = useRef(0);

  useEffect(() => {
    count.current += 1;
    console.log('count: ' + count.current);
  });

  // 每次数据变化都会触发
  useEffect(() => {
    console.log('tags changed');
    if (count.current > 1) {
      console.log('set item');
      console.log(JSON.stringify(tags));
      window.localStorage.setItem('tags', JSON.stringify(tags));
    }
  }, [tags]);// 不可变数据

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
  const updateTag = (id: number, {name}: { name: string }) => {
    // map() 不会改变原始数组
    setTags(tags.map(tag => tag.id === id ? {id, name} : tag));
  };
  const deleteTag = (id: number) => {
    // filter 会返回一个新数组
    setTags(tags.filter(tag => tag.id !== id));
  };
  const addTag = () => {
    const tagName = window.prompt('新标签的名称为');
    if (tagName !== null) {
      setTags([...tags, {id: createId(), name: tagName}]);
    }
  };
  return {tags, addTag, setTags, findTag, updateTag, findTagIndex, deleteTag};
};

export {useTags};

// 改 tag
// 衣 => 衣服
// {amount:100, tags:[1]}

// tag: string => tag: {id: number; name: string}
