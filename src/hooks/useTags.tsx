import {useEffect, useState} from 'react';
import {createId} from 'lib/createId';
import {useUpdate} from './useUpdate';

export type Category = ('expense' | 'income');

export type TagItem = {
  id: number
  icon: string
  name: string
  category: Category
}

const useTags = () => {
  const [tags, setTags] = useState<TagItem[]>([]);

  useEffect(() => {
    let localTags = JSON.parse(window.localStorage.getItem('tags') || '[]');
    if (localTags.length === 0) {
      localTags = [
        {id: 1, icon: 'jucan', name: '聚餐', category: 'expense'},
        {id: 2, icon: 'gouwu', name: '购物', category: 'expense'},
        {id: 3, icon: 'riyong', name: '日用', category: 'expense'},
        {id: 4, icon: 'jiaotong', name: '交通', category: 'expense'},
        {id: 8, icon: 'yundong', name: '运动', category: 'expense'},
        {id: 9, icon: 'yule', name: '娱乐', category: 'expense'},
        {id: 11, icon: 'fushi', name: '服饰', category: 'expense'},
        {id: 13, icon: 'zhufang', name: '住房', category: 'expense'},
        {id: 15, icon: 'yuer', name: '育儿', category: 'expense'},
        {id: 18, icon: 'lvxing', name: '旅行', category: 'expense'},
        {id: 20, icon: 'shuma', name: '数码', category: 'expense'},
        {id: 21, icon: 'yiliao', name: '医疗', category: 'expense'},
        {id: 22, icon: 'shuji', name: '书籍', category: 'expense'},
        {id: 24, icon: 'chongwu', name: '宠物', category: 'expense'},
        {id: 33, icon: 'gongzi', name: '工资', category: 'income'},
        {id: 34, icon: 'jianzhi', name: '兼职', category: 'income'},
        {id: 35, icon: 'licai', name: '理财', category: 'income'},
        {id: 36, icon: 'lijin', name: '红包', category: 'income'},
        {id: 37, icon: 'qita', name: '其他', category: 'income'},
      ];
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
  const addTag = ({id, icon, name, category}: TagItem) => {
    if (name !== null && name !== '') {
      const index = tags.findIndex(item => item.id === id);
      if (index === -1) {
        setTags([...tags, {id, icon, name, category}]);
      } else {
        setTags([...tags, {id: createId(), icon, name, category}]);
      }
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
