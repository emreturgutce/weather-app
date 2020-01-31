const form = document.querySelector('form');
const input = document.querySelector('input');
const error = document.querySelector('#error');
const txt = document.querySelector('#txt');

const fetchData = location => {
  txt.innerHTML = 'Loading...';
  fetch(`http://localhost:3000/weather?adress=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        error.innerHTML = data.error;
      }
      {
        txt.innerHTML = data.place + ' ' + data.forecast;
      }
    });
  });
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const location = input.value;
  fetchData(location);
});
