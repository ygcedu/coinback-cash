import dayjs from 'dayjs';
import {DataUnit} from '../hooks/useRecords';

const getGroup = (time: string, dateUnit: DataUnit): { group: string, title: string } => {
  let prefix: string;
  const date = dayjs(time);
  const now = getNowGroup();

  const current = (unit: DataUnit) => {
    return date.isSame(now[unit], unit);
  };

  const last = (unit: DataUnit) => {
    return date.isSame(now.time.subtract(1, unit), unit);
  };

  const year = date.format('YYYY');

  switch (dateUnit) {
    case 'month':
      if (current(dateUnit)) {
        prefix = '本';
      } else if (last(dateUnit)) {
        prefix = '上';
      } else if (current('year')) {
        prefix = date.format('MM');
      } else {
        prefix = year + '-' + date.format('MM');
      }
      return {
        group: date.format('YYYY-MM'),
        title: prefix + '月'
      };
    case 'year':
      if (current(dateUnit)) {
        prefix = '今';
      } else if (last(dateUnit)) {
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
      } else if (last(dateUnit)) {
        prefix = '上';
      } else if (current('year')) {
        prefix = weekNum;
      } else {
        prefix = year + '-' + weekNum;
      }
      return {
        group: week,
        title: prefix + '周'
      };
    case 'day':
    default:
      if (current(dateUnit)) {
        prefix = '今';
      } else if (last(dateUnit)) {
        prefix = '昨';
      } else {
        prefix = date.format('MM月DD');
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

// 计算日期间隔
const getScope = (start: string, end: string, dateUnit: DataUnit) => {
  const {group: startGroup} = getGroup(start, dateUnit);
  const {group: endGroup} = getGroup(end, dateUnit);
  return {
    start: startGroup,
    end: endGroup
  };
};

export {getNowGroup, getGroup, getScope};
