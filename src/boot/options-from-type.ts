import { boot } from 'quasar/wrappers';
import { QSelectOption } from 'quasar';

export default boot(({ app }) => {
  app.directive('options-from-type', {
    beforeMount: (_, binding, vnode) => {
      const options = [
        { label: 'No Preference', value: '' },
        ...(
          Object.keys(binding.value) as Array<keyof typeof binding.value>
        ).map((key) => {
          return {
            label: binding.value[key],
            value: +(key as string),
          };
        }),
      ] as unknown as QSelectOption[];

      if (vnode?.el?.__vueParentComponent?.props?.selectOptions) {
        vnode.el.__vueParentComponent.props.selectOptions = options;
      }
    },
    updated: (_, binding, vnode) => {
      const options = [
        { label: 'No Preference', value: '' },
        ...(
          Object.keys(binding.value) as Array<keyof typeof binding.value>
        ).map((key) => {
          return {
            label: binding.value[key],
            value: +(key as string),
          };
        }),
      ] as unknown as QSelectOption[];

      if (vnode?.el?.__vueParentComponent?.props?.selectOptions) {
        vnode.el.__vueParentComponent.props.selectOptions = options;
      }
    },
  });
});
