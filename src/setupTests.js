// src/setupTests.js

import '@testing-library/jest-dom';

// Mock getSelection to prevent errors in tests
Object.defineProperty(window, 'getSelection', {
  value: jest.fn(() => ({
    removeAllRanges: jest.fn(),
    addRange: jest.fn(),
    toString: jest.fn(() => ''),
    focusNode: null,
    rangeCount: 0,
    getRangeAt: jest.fn(() => ({}))
  })),
  writable: true,
});


// List of warning/error messages to intentionally prevent from appearing in the test output
const MESSAGES_TO_IGNORE = [
  "When testing, code that causes React state updates should be wrapped into act(...):",
  "Error:",
  "The above error occurred"
];

// Override console.error to filter out specific messages
const originalError = console.error.bind(console.error);

console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.find(message => args.toString().includes(message));
  if (!ignoreMessage) originalError(...args);
};
