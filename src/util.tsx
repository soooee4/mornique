const colors: string[] = [
  '#FFCA3A', 
  '#2978B5', 
  '#F76C5E', 
  '#FFB02E', 
  '#90BE6D', 
  '#7A4495', 
  '#CCCCCC'  
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export { getRandomColor };