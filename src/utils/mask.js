export const maskNumber = (number) => {
    return number.toString().slice(-4).padStart(number.toString().length, '*');
  };