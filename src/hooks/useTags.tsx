import {useEffect, useState} from 'react';
import {createId} from 'lib/createId';
import {useUpdate} from './useUpdate';
import {defaultTags} from '../data/tags';

export type Category = ('expense' | 'income');

export type TagItem = {
  id: number;
  icon: string;
  name: string;
  category: Category
}

const useTags = () => {
  const [tags, setTags] = useState<TagItem[]>([]);

  useEffect(() => {
    let localTags = JSON.parse(window.localStorage.getItem('tags') || '[]');
    if (localTags.length === 0) {
      localTags = defaultTags;
    }
    setTags(localTags);
  }, []);// 组件挂载时执行

  useUpdate(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags));
  }, [tags]);

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
  const updateTag = (id: number, {icon, name, category}: Omit<TagItem, 'id'>) => {
    // map() 不会改变原始数组
    setTags(tags.map(tag => tag.id === id ? {id, icon, name, category} : tag));
  };
  const deleteTag = (id: number) => {
    // filter 会返回一个新数组
    setTags(tags.filter(tag => tag.id !== id));
  };
  const addTag = ({icon, name, category}: Omit<TagItem, 'id'>) => {
    if (name !== null && name !== '') {
      setTags([...tags, {id: createId(), icon, name, category}]);
    }
  };
  const getIcon = (id: number) => {
    return tags.find(t => t.id === id);
    // return tag ? tag.icon : '';
  };
  const filterTag = (category: Category) => tags.filter(tag => tag.category === category);

  return {tags, getIcon, addTag, setTags, findTag, filterTag, updateTag, findTagIndex, deleteTag};
};

export {useTags};

// 改 tag
// 衣 => 衣服
// {amount:100, tags:[1]}

// tag: string => tag: {id: number; name: string}
