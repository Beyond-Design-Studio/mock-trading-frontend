const toFixed = (num: number, fixed:number): number => {
  const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  const number = num.toString().match(re)![0];

  if (number) {
    return parseFloat(number);
  } else {
    return num;
  }
}

export default toFixed
