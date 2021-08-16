import {useEffect, useRef} from 'react';

export const useUpdate = (fn: () => void, deps: any[]) => {
  const count = useRef(0);

  useEffect(() => {
    count.current += 1;
  });

  // 每次数据变化都会触发
  useEffect(() => {
    if (count.current > 1) {
      fn();
    }
  }, deps);// 不可变数据
};