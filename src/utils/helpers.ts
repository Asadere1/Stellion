import { QSelectOption } from 'quasar';
import { format } from 'quasar';
const { capitalize } = format;

export const isFilename = (fname: string) => {
  if (!fname) {
    return false;
  }
  return (
    fname.indexOf('.') > 1 &&
    (fname.match(/\./g) || []).length === 1 &&
    fname.split('.')[1].length === 3
  );
};

export const StatusColorLookup = {
  1: 'positive',
  2: 'negative',
  3: 'warning',
};

export function validateEmail(email: string) {
  const re =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
  return re.test(email);
}

export const isValidUrl = (url: string) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // validate fragment locator
  return !!urlPattern.test(url);
};

export function optionsFromType(type: { [key: number]: string }) {
  const options = [
    { label: 'No Preference', value: '' },
    ...Object.keys(type)
      .filter((key) => !isNaN(parseInt(key)))
      .map((key) => {
        return {
          label: capitalize(type[+(key as string)].toLowerCase()),
          value: +(key as string),
        };
      }),
  ] as unknown as QSelectOption[];
  return options;
}
