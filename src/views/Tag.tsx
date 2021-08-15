import React from 'react';
import {useParams} from 'react-router-dom';
import {useTags} from '../useTags';

type Params = {
  fuck: string
}

const Tag: React.FC = () => {
  const {tags} = useTags();
  let {fuck} = useParams<Params>();
  const tag = tags.filter(tag => tag.id === parseInt(fuck))[0];
  return (
    <div>{tag.name}</div>
  );
};

export {Tag};