const progress = document.querySelector('.progress');
console.log(progress);
const points = ['1 Million', '500,000', '250,000', '100,000', '50,000', '25,000', '16,000', '8000', '4000', '2000', '1000', '500', '300', '200', '100']

for (let index = 0; index < points.length; index++) {
  const element = document.createElement('p');
  element.textContent = `${15 - index} ${points[index]}`;
  element.className = `progress-point`;
  progress.appendChild(element);
}