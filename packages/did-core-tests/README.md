# @transmute/did-core-tests

This module provides did method agnostic tests for [did-core](https://www.w3.org/TR/did-core).

### Generate JSON Test Cases

1. Click on the "Collapse Sidebar" arrow (left arrow at bottom left of screen).

2. Click on "ReqList" button at top-right of screen. The list is generated
   from the spec text.

3. Copy this script into developer console:

```js
console.log(
  JSON.stringify(
    Array.from(document.querySelectorAll('.reqlist > li')).map(
      (li) => li.textContent
    )
  )
);
```

Save the file to `__fixtures__`

### Generate Test Files

```
npm run build
```

### Implement the tests

Copy files from `__generated__` to `__tests__`.

You may need to break down test cases... if its been a long time since the tests were generated... you may need to manually review the differences in `__generated__`, and make substantial adjustments as spec text changes.

### Run Tests

```
npm run test
```
