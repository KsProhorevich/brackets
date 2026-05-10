function check(str, bracketsConfig) {
  const stack = [];
  const bracketsMap = new Map();
  const openBrackets = new Set();
  const closeBrackets = new Set();

  bracketsConfig.forEach(([open, close]) => {
    bracketsMap.set(close, open);
    openBrackets.add(open);
    closeBrackets.add(close);
  });

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];

    if (openBrackets.has(char)) {
      if (char === bracketsMap.get(char)) {
        if (stack.length > 0 && stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          stack.push(char);
        }
      } else {
        stack.push(char);
      }
    } else if (closeBrackets.has(char)) {
      const expectedOpen = bracketsMap.get(char);
      if (stack.length === 0 || stack.pop() !== expectedOpen) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

module.exports = check;
