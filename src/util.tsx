const colors: string[] = [
  '#FFCA3A', 
  '#2978B5', 
  '#F76C5E', 
  '#FFB02E', 
  '#90BE6D', 
  '#7A4495', 
  '#606c38',
  '#2a9d8f',
  '#f28482',
  '#7678ed',
  '#34a0a4',
  '#ff7f51',
  '#ce4257',
  '#ff9b54',
  '#fb6f92',
  '#8ecae6',
  '#8a94db',
  '#ff7b00',
  '#6b4f99',
  '#c98bb9',
  '#deaaff',
  '#ff7480',
  '#a8dadc',
  '#f4a261',  
  '#2a6f97',  
  '#dc143c',
  '#dd5aad',
  '#f07272',
];

// 투명도 조절 위한 함수
const hexToRGBA = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  // return hexToRGBA(colors[randomIndex], 0.85); 
  return colors[randomIndex]
}

export { getRandomColor };