import {useState} from 'react';
import {Id} from './lib/Id';

const useTags = () => {
  const [tags, setTags] = useState<{ id: number; name: string }[]>([
    // {id: createId(), name: '衣'},
    {id: (new Id).value, name: '衣'},
    {id: (new Id).value, name: '食'},
    {id: (new Id).value, name: '住'},
    {id: (new Id).value, name: '行'}
  ]);
  return {tags, setTags};
};

export {useTags};

// 改 tag
// 衣 => 衣服
// {amount:100, tags:[1]}

// tag: string => tag: {id: number; name: string}
