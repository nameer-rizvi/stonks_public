import { useState } from "react";
import { isString, isNumber, array as simpulArray } from "simpul";

export function useSorter({ array, initialState }) {
  initialState && !initialState.reverse && (initialState.reverse = false);

  const [sort, setSort] = useState(initialState);

  array.sort((a, b) => {
    a = a[sort.key];
    b = b[sort.key];
    return !a
      ? 1
      : !b
      ? -1
      : isString(a) && isString(b)
      ? a.localeCompare(b)
      : a - b;
  });

  sort.reverse && array.reverse();

  for (let i = array.length - 1; i >= 0; i--) {
    let value = array[i][sort.key];
    !value && simpulArray.changeIndex(array, i, array.length - 1);
  }

  return { sort, setSort };
}
