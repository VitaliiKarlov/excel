import { $ } from '../../core/dom';

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    const colId = $parent.data.col;
    const type = $resizer.data.resize;
    let delta = 0;
    let minSizeCell = 0;

    const parentStyle = $parent.getStyle;
    const minValue =
      type === 'col'
        ? parseInt(parentStyle.minWidth, 10)
        : parseInt(parentStyle.minHeight, 10);

    const line =
      type === 'col'
        ? $.create('div', 'long-down-line')
        : $.create('div', 'long-right-line');

    $resizer.css({ opacity: 1 });
    $resizer.append(line);

    const selectText = document.body.onselectstart;
    document.body.onselectstart = () => false;
    document.body.style.cursor = 'default';

    document.onmousemove = (moveEvent) => {
      if (type === 'col') {
        delta = moveEvent.clientX - coords.right;
        minSizeCell = (coords.width - minValue) * -1;

        if (delta < minSizeCell) {
          $resizer.css({ right: `${coords.width - minValue}px` });
        } else {
          $resizer.css({ right: `${-delta - 5}px` });
        }
      } else {
        delta = moveEvent.clientY - coords.bottom;
        minSizeCell = (coords.height - minValue) * -1;

        if (delta < minSizeCell) {
          $resizer.css({ bottom: `${coords.height - minValue}px` });
        } else {
          $resizer.css({ bottom: `${-delta - 5}px` });
        }
      }
    };

    document.onmouseup = () => {
      let value = 0;

      $resizer.css({ opacity: '' });
      document.body.onselectstart = selectText;
      document.body.style.cursor = 'auto';

      line.remove();

      if (type === 'col') {
        $resizer.css({ right: 0 });
        $root.findAll(`[data-col="${colId}"]`).forEach((el) => {
          const $elem = $(el);

          value =
            delta < minSizeCell
              ? coords.width - minSizeCell * -1
              : coords.width + delta;

          $elem.css({ width: `${value}px` });
        });
      } else {
        $resizer.css({ bottom: '-1px' });

        value =
          delta < minSizeCell
            ? coords.height - minSizeCell * -1
            : coords.height + delta;

        $parent.css({ height: `${value}px` });
      }

      resolve({
        id: $parent.data[type],
        type,
        value,
      });

      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
}
