import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';
import {Category} from './useTags';
import dayjs from 'dayjs';
import {getGroup, getScope} from '../lib/date';

export type RecordItem = {
  tagId: number
  note: string
  category: Category
  amount: number
  createdAt: string // ISO 8601
}

export type DataUnit = 'day' | 'week' | 'month' | 'year'

export type Group = {
  category: Category
  dateUnit: DataUnit
  query?: number
}

// 忽略 RecordItem 中的 createdAt 属性
type NewRecordItem = Omit<RecordItem, 'createdAt'>

export const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);

  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'));
  }, []);// 组件挂载时执行

  useUpdate(() => {
    window.localStorage.setItem('records', JSON.stringify(records));
  }, records);

  const addRecord = (newRecord: NewRecordItem) => {
    if (newRecord.amount <= 0) {
      alert('请输入金额');
      return false;
    }
    if (newRecord.tagId < 0) {
      alert('请选择标签');
      return false;
    }
    const record = {...newRecord, createdAt: (new Date()).toISOString()};
    setRecords([...records, record]);
    return true;
  };

  const getRecords = ({category, dateUnit, query = 0}: Group) => {
    type Result = { uid: string, title: string, total?: number, items: RecordItem[] }[];

    const newList = records.filter(r => r.category === category)
      .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {
      return [] as Result;
    }

    const scopes = getScope(newList[newList.length - 1].createdAt, newList[0].createdAt, dateUnit);
    console.log(...scopes);

    const {title, uid} = getGroup(dayjs(newList[0].createdAt), dateUnit);

    const result: Result = [{
      uid,
      title,
      items: [newList[0]]
    }];

    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      const {title, uid} = getGroup(dayjs(current.createdAt), dateUnit);

      if (uid === last.uid) {
        last.items.push(current);
      } else {
        result.push({
          uid,
          title,
          items: [current]
        });
      }
    }

    result.forEach(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  };

  return {records, addRecord, getRecords};
};
