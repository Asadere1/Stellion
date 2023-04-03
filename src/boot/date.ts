import { boot } from 'quasar/wrappers';
import { DateTime } from 'luxon';

export default boot(({ app }) => {
  app.directive('date', (el: HTMLElement, binding) => {
    const dt = DateTime.fromMillis(binding.value * 1000);
    el.innerHTML = dt.toFormat('dd MMMM, yyyy');
  });
});
