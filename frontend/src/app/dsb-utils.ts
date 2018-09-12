export const baseImagePrefix = 'assets/images/';
export const baseAudioPrefix = 'assets/audio/';
export const baseVideoPrefix = 'assets/video/';

export const splitCamelCase = (camelCase) => {
  return (camelCase.replace(/([a-z])([A-Z])/, "$1 $2"));
};

export const titlecase = (value) => {
  return value.toLowerCase().split(' ').map(function (word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
};

export const charCount = (str: string, chr: string) => {
  let result = 0;
  for (let c of str) {if (c == chr) result ++};
  return(result);
};

export const flatten = function(arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};
