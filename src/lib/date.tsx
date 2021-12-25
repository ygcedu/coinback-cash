import dayjs from 'dayjs';
import {DataUnit} from '../hooks/useRecords';

const getGroup = (time: string, dateUnit: DataUnit): { group: string, title: string } => {
  let prefix: string;
  const date = dayjs(time);
  const now = getNowGroup();

  const current = () => {
    return date.isSame(now[dateUnit], dateUnit);
  };

  const last = () => {
    return date.isSame(now.time.subtract(1, dateUnit), dateUnit);
  };

  switch (dateUnit) {
    case 'month':
      if (current()) {
        prefix = '本';
      } else if (last()) {
        prefix = '上';
      } else {
        prefix = date.format('MM');
      }
      return {
        group: date.format('YYYY-MM'),
        title: prefix + '月'
      };
    case 'year':
      const year = date.format('YYYY');
      if (current()) {
        prefix = '今';
      } else if (last()) {
        prefix = '去';
      } else {
        prefix = year;
      }
      return {
        group: year,
        title: prefix + '年'
      };
    case 'week':
      const weekNum = date.isoWeek().toString().padStart(2, '0');
      const weekYear = date.isoWeekYear();
      const week = weekYear + '-' + weekNum;
      if (now[dateUnit] === week) {
        prefix = '本';
      } else if (last()) {
        prefix = '上';
      } else {
        prefix = weekNum;
      }
      return {
        group: week,
        title: prefix + '周'
      };
    case 'day':
    default:
      if (current()) {
        prefix = '今';
      } else if (last()) {
        prefix = '昨';
      } else {
        prefix = date.format('DD');
      }
      return {
        group: date.format('YYYY-MM-DD'),
        title: prefix + '日'
      };
  }


};

const getNowGroup = () => {
  const now = dayjs();
  const week = now.isoWeekYear() + '-' + now.isoWeek().toString().padStart(2, '0');
  const year = now.format('YYYY');
  const month = now.format('YYYY-MM');
  const day = now.format('YYYY-MM-DD');
  return {year, month, day, week, time: now};
};

export {getNowGroup, getGroup};
