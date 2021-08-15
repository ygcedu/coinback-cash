import {useEffect, useRef} from 'react';

export const useUpdate = (fn: () => void, deps: any[]) => {
  const count = useRef(0);

  useEffect(() => {
    count.current += 1;
    console.log('count: ' + count.current);
  });

  // 每次数据变化都会触发
  useEffect(() => {
    console.log('tags changed');
    if (count.current > 1) {
      fn();
    }
  }, deps);// 不可变数据
};