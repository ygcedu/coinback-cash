import {useEffect, useState} from 'react';
import {useUpdate} from './useUpdate';
import {Category} from './useTags';
import dayjs from 'dayjs';
import {calcSections, getGroup, unitFormat} from '../lib/date';
import {ObjectArray} from '../views/Tag/VerticalSelect';

export type RecordItem = {
  tagId: number
  note: string
  category: Category
  amount: number
  createdAt: string // ISO 8601
}

export type DateUnit = 'day' | 'week' | 'month' | 'year'

export type Group = {
  category: Category
  dateUnit: DateUnit
  query?: number
}

// 忽略 RecordItem 中的 createdAt 属性
type NewRecordItem = Omit<RecordItem, 'createdAt'>
export type Result = { uid: string, title: string, total?: number, items: RecordItem[] }[];
export type RankList = { tagId: number, value: number, percent: number }[];

export const useRecords = () => {
  let [records, setRecords] = useState<RecordItem[]>([]);
  const [sections, setSections] = useState<ObjectArray>([]);

  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem('records') || '[]'));
  }, []);// 组件挂载时执行

  useUpdate(() => {
    window.localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

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

  const getRecords = ({category, dateUnit}: Group) => {
    const newList = records.filter(r => r.category === category)
      .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {
      return [] as Result;
    }
    // 按照开始结束时间，计算所有时间区段
    const sec = calcSections(newList[newList.length - 1].createdAt, newList[0].createdAt, dateUnit);
    setSections(sec);

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

  const getKvPairs = (records: RecordItem[], uuid: string, dateUnit: DateUnit) => {
    let unit: DateUnit;
    let span: number;
    let start: dayjs.Dayjs;
    switch (dateUnit) {
      case 'year':
        unit = 'month';
        span = 12;
        start = dayjs(uuid);
        break;
      case 'month':
        unit = 'day';
        span = dayjs(uuid).daysInMonth();
        start = dayjs(uuid);
        break;
      case 'week':
        const [year, week] = uuid.split('-');
        start = dayjs(year).week(parseInt(week)).startOf('week');
        unit = 'day';
        span = 7;
        break;
      default:
        unit = 'day';
        span = 1;
        start = dayjs(uuid);
        break;
    }
    const bucket: { keys: string[], values: number[], ranks: RankList } = {
      keys: [],
      values: [],
      ranks: []
    };
    let nexts: dayjs.Dayjs[] = [];
    for (let i = 0; i < span; i++) {
      nexts.unshift(start.add(i, unit));
    }

    let i = 0;
    let tags: { [tagId: string]: number } = {};

    nexts.forEach((item) => {
      let sum = 0;
      for (i; i < records.length; i++) {
        console.log(records[i].createdAt, item.format('YYYY-MM-DD'));
        if (dayjs(records[i].createdAt).valueOf() >= item.valueOf()) {
          sum += records[i].amount;
          const total = tags[records[i].tagId];
          if (total === undefined) {
            tags[records[i].tagId] = records[i].amount;
          } else {
            tags[records[i].tagId] = total + records[i].amount;
          }
        } else {
          break;
        }
      }
      bucket.keys.unshift(unitFormat(item, dateUnit));
      bucket.values.unshift(sum);
    });

    const total = bucket.values.reduce((sum, value) => {return sum += value;}, 0);

    const ranks = Object.keys(tags).reduce((rankList: RankList, tagId: string) => {
      const value = tags[tagId];
      const item = {tagId: parseInt(tagId), value, percent: value / total};
      const index = rankList.findIndex((item, index) => item.value < value);

      if (index === -1) {
        rankList.push(item);
      } else {
        rankList.splice(index, 0, item);
      }
      return rankList;
    }, []);

    bucket.ranks = ranks;
    return bucket;
  };

  return {records, sections, addRecord, getRecords, getKvPairs};
};
