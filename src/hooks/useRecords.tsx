import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';

// type NewRecordItem = {
//   tagIds: number[]
//   note: string
//   category: '+' | '-'
//   amount: number
// }

// type RecordItem = NewRecordItem & {
//   createdAt: string // ISO 8601
// }

type RecordItem = {
  tagIds: number[]
  note: string
  category: '+' | '-'
  amount: number
  createdAt: string // ISO 8601
  updatedAt: string
}

// 忽略 RecordItem 中的 createdAt 属性
type NewRecordItem = Omit<RecordItem, 'createdAt' | 'updatedAt'>

export const useRecords = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);

  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'));
  }, []);// 组件挂载时执行

  useUpdate(() => {
    window.localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  const addRecord = (newRecord: NewRecordItem) => {
    const record = {...newRecord, createdAt: (new Date()).toISOString()};
    setRecords([...records, record]);
  };

  return {records, addRecord};
};