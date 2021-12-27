import dayjs from 'dayjs';
import {DateUnit} from '../hooks/useRecords';
import weekYear from 'dayjs/plugin/weekYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);
dayjs.extend(weekYear);

// dayjs.locale('en');
// 设置星期一为一周的第一天
dayjs.Ls.en.weekStart = 1;

const getGroup = (date: dayjs.Dayjs, dateUnit: DateUnit): { uid: string, title: string } => {
  let prefix: string;
  const now = getNowGroup();

  const current = (unit: DateUnit) => {
    if (unit === 'week') {
      return date.isSame(now.time, unit);
    } else {
      return date.isSame(now[unit], unit);
    }
  };

  const last = (unit: DateUnit) => {
    return date.isSame(now.time.startOf(unit).subtract(1, unit), unit);
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
        uid: date.format('YYYY-MM'),
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
        uid: year,
        title: prefix + '年'
      };
    case 'week':
      const weekNum = date.week().toString().padStart(2, '0');
      const wy = date.weekYear();
      const week = wy + '-' + weekNum;
      if (now[dateUnit] === week) {
        prefix = '本';
      } else if (last(dateUnit)) {
        prefix = '上';
      } else if (current('week')) {
        prefix = weekNum;
      } else {
        prefix = week;
      }
      return {
        uid: week,
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
        uid: date.format('YYYY-MM-DD'),
        title: prefix + '日'
      };
  }
};

const getNowGroup = () => {
  const now = dayjs();
  const week = now.weekYear() + '-' + now.week().toString().padStart(2, '0');
  const year = now.format('YYYY');
  const month = now.format('YYYY-MM');
  const day = now.format('YYYY-MM-DD');
  // debugger
  return {year, month, day, week, time: now};
};

// 计算日期间隔
const calcSections = (start: string, end: string, dateUnit: DateUnit) => {
  const {uid: startUid} = getGroup(dayjs(start), dateUnit);

  let result = [];
  let i = 0;
  let before;
  let id;
  do {
    // week or isoWeek?
    before = dayjs(end).startOf(dateUnit).subtract(i, dateUnit);
    const {uid, title} = getGroup(before, dateUnit);
    result.unshift({key: uid, value: title});
    id = uid;
    i++;
  } while (id !== startUid);

  return result;
};

const localTime = (date: dayjs.Dayjs) => {
  // format 默认会换算成当地时区时间
  return date.format('YYYY-MM-DDTHH:mm:ssZ[Z]');
};

const unitFormat = (date: dayjs.Dayjs, unit: DateUnit) => {
  switch (unit) {
    case 'year':
      return date.format('M月');
    case 'month':
      return date.format('D');
    case 'week':
      return date.format('MM-DD');
    case 'day':
    default:
      return date.format('HH时');
  }
};

export {getNowGroup, getGroup, calcSections, localTime, unitFormat};
