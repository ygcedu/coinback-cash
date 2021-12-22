import {useEffect, useState} from 'react';
import {createId} from 'lib/createId';
import {useUpdate} from './useUpdate';

const useTags = () => {
  const [tags, setTags] = useState<{ id: number; icon: string; name: string }[]>([]);

  useEffect(() => {
    let localTags = JSON.parse(window.localStorage.getItem('tags') || '[]');
    if (localTags.length === 0) {
      localTags = [
        {id: createId(), icon: 'canyin', name: '餐饮'},
        {id: createId(), icon: 'gouwu', name: '购物'},
        {id: createId(), icon: 'riyong', name: '日用'},
        {id: createId(), icon: 'jiaotong', name: '交通'},
        {id: createId(), icon: 'shucai', name: '蔬菜'},
        {id: createId(), icon: 'shuiguo', name: '水果'},
        {id: createId(), icon: 'lingshi', name: '零食'},
        {id: createId(), icon: 'yundong', name: '运动'},
        {id: createId(), icon: 'yule', name: '娱乐'},
        {id: createId(), icon: 'tongxun', name: '通讯'},
        {id: createId(), icon: 'fushi', name: '服饰'},
        {id: createId(), icon: 'meirong', name: '美容'},
        {id: createId(), icon: 'zhufang', name: '住房'},
        {id: createId(), icon: 'jujia', name: '居家'},
        {id: createId(), icon: 'haizi', name: '孩子'},
        {id: createId(), icon: 'zhangbei', name: '长辈'},
        {id: createId(), icon: 'shejiao', name: '社交'},
        {id: createId(), icon: 'lvxing', name: '旅行'},
        {id: createId(), icon: 'yanjiu', name: '研究'},
        {id: createId(), icon: 'shuma', name: '数码'},
        {id: createId(), icon: 'yiliao', name: '医疗'},
        {id: createId(), icon: 'shuji', name: '书籍'},
        {id: createId(), icon: 'xuexi', name: '学习'},
        {id: createId(), icon: 'chongwu', name: '宠物'},
        {id: createId(), icon: 'lijin', name: '礼金'},
        {id: createId(), icon: 'liwu', name: '礼物'},
        {id: createId(), icon: 'bangong', name: '办公'},
        {id: createId(), icon: 'weixiu', name: '维修'},
        {id: createId(), icon: 'juanzeng', name: '捐赠'},
        {id: createId(), icon: 'qinyou', name: '亲友'},
        {id: createId(), icon: 'kuaidi', name: '快递'},
        {id: createId(), icon: 'youxi', name: '游戏'}
      ];
    }
    setTags(localTags);
  }, []);// 组件挂载时执行

  useUpdate(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags));
  }, tags);

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
  const updateTag = (id: number, {icon, name}: { icon: string, name: string }) => {
    // map() 不会改变原始数组
    setTags(tags.map(tag => tag.id === id ? {id, icon, name} : tag));
  };
  const deleteTag = (id: number) => {
    // filter 会返回一个新数组
    setTags(tags.filter(tag => tag.id !== id));
  };
  const addTag = ({icon, name}: { icon: string, name: string }) => {
    if (name !== null && name !== '') {
      setTags([...tags, {id: createId(), icon, name}]);
    }
  };
  const getIcon = (id: number) => {
    const tag = tags.filter(t => t.id === id)[0];
    return tag ? tag.icon : '';
  };
  return {tags, getIcon, addTag, setTags, findTag, updateTag, findTagIndex, deleteTag};
};

export {useTags};

// 改 tag
// 衣 => 衣服
// {amount:100, tags:[1]}

// tag: string => tag: {id: number; name: string}
