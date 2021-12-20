import {useEffect, useState} from 'react';
import {createId} from 'lib/createId';
import {useUpdate} from './useUpdate';

const useTags = () => {
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    let localTags = JSON.parse(window.localStorage.getItem('tags') || '[]');
    if (localTags.length === 0) {
      localTags = [
        {id: createId(), name: 'canyin'},
        {id: createId(), name: 'gouwu'},
        {id: createId(), name: 'riyong'},
        {id: createId(), name: 'jiaotong'},
        {id: createId(), name: 'shucai'},
        {id: createId(), name: 'shuiguo'},
        {id: createId(), name: 'lingshi'},
        {id: createId(), name: 'yundong'},
        {id: createId(), name: 'yule'},
        {id: createId(), name: 'tongxun'},
        {id: createId(), name: 'fushi'},
        {id: createId(), name: 'meirong'},
        {id: createId(), name: 'zhufang'},
        {id: createId(), name: 'jujia'},
        {id: createId(), name: 'haizi'},
        {id: createId(), name: 'zhangbei'},
        {id: createId(), name: 'shejiao'},
        {id: createId(), name: 'lvxing'},
        {id: createId(), name: 'yanjiu'},
        {id: createId(), name: 'shuma'},
        {id: createId(), name: 'yiliao'},
        {id: createId(), name: 'shuji'},
        {id: createId(), name: 'xuexi'},
        {id: createId(), name: 'chongwu'},
        {id: createId(), name: 'lijin'},
        {id: createId(), name: 'liwu'},
        {id: createId(), name: 'bangong'},
        {id: createId(), name: 'weixiu'},
        {id: createId(), name: 'juanzeng'},
        {id: createId(), name: 'qinyou'},
        {id: createId(), name: 'kuaidi'},
        {id: createId(), name: 'youxi'},
        {id: createId(), name: 'setting'},
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
    if (tagName !== null && tagName !== '') {
      setTags([...tags, {id: createId(), name: tagName}]);
    }
  };
  const getName = (id: number) => {
    const tag = tags.filter(t => t.id === id)[0];
    return tag ? tag.name : '';
  };
  return {tags, getName, addTag, setTags, findTag, updateTag, findTagIndex, deleteTag};
};

export {useTags};

// 改 tag
// 衣 => 衣服
// {amount:100, tags:[1]}

// tag: string => tag: {id: number; name: string}
