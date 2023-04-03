import { boot } from 'quasar/wrappers';
import numeral from 'numeral';
import { Currencies, CurrencyTypes } from 'src/utils/Models';
import { useDataStore } from 'stores/data-store';
const store = useDataStore();

export default boot(({ app }) => {
  app.directive(
    'currency',
    (
      el: HTMLElement,
      binding: { value: { currency: CurrencyTypes; amount: number } }
    ) => {
      const currencySymbol =
        Currencies[binding.value.currency || store.globalCurrency];
      const formattedCurrency = numeral(binding.value.amount).format(
        `${currencySymbol}0,0.00`
      );
      el.innerHTML = formattedCurrency;
    }
  );
});
