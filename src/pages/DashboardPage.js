import { Page } from '../core/Page';
import { $ } from '../core/dom';
import { createRecordsTable } from './dashboard.functions';

export class DashboardPage extends Page {
  getRoot() {
    const id = Date.now().toString();
    return $.create('div', 'db').html(/* html */ `
      <div class="db__header">
        <h1>Панель управления excel</h1> 
      </div>

      <div class="db__new">
        <div class="db__view">
          <a href="#excel/${id}" class="db__create">
            Новая<br />таблица
          </a>
        </div>
      </div>

      <div class="db__table db__view">
        ${createRecordsTable()}
      </div>
    `);
  }
}
