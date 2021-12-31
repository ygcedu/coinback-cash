let tagId = parseInt(window.localStorage.getItem('tagIdMax') || '100');
let recordId = parseInt(window.localStorage.getItem('recordIdMax') || '100');

const createId = (name: 'tag' | 'record'): number => {
  switch (name) {
    case 'record':
      recordId += 1;
      window.localStorage.setItem('recordIdMax', JSON.stringify(recordId));
      return recordId;
    case 'tag':
      tagId += 1;
      window.localStorage.setItem('tagIdMax', JSON.stringify(tagId));
      return tagId;
  }

};

export {createId};
