import {useEffect, useState} from 'react';
import {createId} from 'lib/createId';
import {useUpdate} from './useUpdate';

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
      localTags = [
        {id: createId(), icon: 'canyin', name: '餐饮', type: '', category: 'expense'},
        {id: createId(), icon: 'gouwu', name: '购物', type: '', category: 'expense'},
        {id: createId(), icon: 'riyong', name: '日用', type: '', category: 'expense'},
        {id: createId(), icon: 'jiaotong', name: '交通', type: '', category: 'expense'},
        {id: createId(), icon: 'shucai', name: '蔬菜', type: '', category: 'expense'},
        {id: createId(), icon: 'shuiguo', name: '水果', type: '', category: 'expense'},
        {id: createId(), icon: 'lingshi', name: '零食', type: '', category: 'expense'},
        {id: createId(), icon: 'yundong', name: '运动', type: '', category: 'expense'},
        {id: createId(), icon: 'yule', name: '娱乐', type: '', category: 'expense'},
        {id: createId(), icon: 'tongxun', name: '通讯', type: '', category: 'expense'},
        {id: createId(), icon: 'fushi', name: '服饰', type: '', category: 'expense'},
        {id: createId(), icon: 'meirong', name: '美容', type: '', category: 'expense'},
        {id: createId(), icon: 'zhufang', name: '住房', type: '', category: 'expense'},
        {id: createId(), icon: 'jujia', name: '居家', type: '', category: 'expense'},
        {id: createId(), icon: 'haizi', name: '孩子', type: '', category: 'expense'},
        {id: createId(), icon: 'zhangbei', name: '长辈', type: '', category: 'expense'},
        {id: createId(), icon: 'shejiao', name: '社交', type: '', category: 'expense'},
        {id: createId(), icon: 'lvxing', name: '旅行', type: '', category: 'expense'},
        {id: createId(), icon: 'yanjiu', name: '研究', type: '', category: 'expense'},
        {id: createId(), icon: 'shuma', name: '数码', type: '', category: 'expense'},
        {id: createId(), icon: 'yiliao', name: '医疗', type: '', category: 'expense'},
        {id: createId(), icon: 'shuji', name: '书籍', type: '', category: 'expense'},
        {id: createId(), icon: 'xuexi', name: '学习', type: '', category: 'expense'},
        {id: createId(), icon: 'chongwu', name: '宠物', type: '', category: 'expense'},
        {id: createId(), icon: 'lijin', name: '礼金', type: '', category: 'expense'},
        {id: createId(), icon: 'liwu', name: '礼物', type: '', category: 'expense'},
        {id: createId(), icon: 'bangong', name: '办公', type: '', category: 'expense'},
        {id: createId(), icon: 'weixiu', name: '维修', type: '', category: 'expense'},
        {id: createId(), icon: 'juanzeng', name: '捐赠', type: '', category: 'expense'},
        {id: createId(), icon: 'qinyou', name: '亲友', type: '', category: 'expense'},
        {id: createId(), icon: 'kuaidi', name: '快递', type: '', category: 'expense'},
        {id: createId(), icon: 'youxi', name: '游戏', type: '', category: 'expense'},
        {id: createId(), icon: 'gongzi', name: '工资', type: '', category: 'income'},
        {id: createId(), icon: 'jianzhi', name: '兼职', type: '', category: 'income'},
        {id: createId(), icon: 'licai', name: '理财', type: '', category: 'income'},
        {id: createId(), icon: 'lijin', name: '礼金', type: '', category: 'income'},
        {id: createId(), icon: 'qita', name: '其他', type: '', category: 'income'}
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
  const addTag = ({icon, name, category}: Omit<TagItem, 'id'>) => {
    if (name !== null && name !== '') {
      setTags([...tags, {id: createId(), icon, name, category}]);
    }
  };
  const getIcon = (id: number) => {
    return tags.filter(t => t.id === id)[0];
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
