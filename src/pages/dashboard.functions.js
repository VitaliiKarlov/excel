import { storage } from '../core/utils';

function toHTML(key) {
  const { title, opendDate } = storage(key);
  const id = key.split(':')[1];
  return /* html */ `
    <li class="db__record">
      <a href="#excel/${id}">${title}</a>
      <strong>
        ${new Date(opendDate).toLocaleDateString()}
        ${new Date(opendDate).toLocaleTimeString()}
      </strong>
    </li>
  `;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < window.localStorage.length; i++) {
    const key = window.localStorage.key(i);
    if (key.includes('excel')) {
      keys.push(key);
    }
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();

  if (keys.length === 0) {
    return '<h2 style="text-align: center">Еще не создано ни одной таблицы</h2>';
  }

  return /* html */ `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `;
}
