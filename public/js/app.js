const form = document.querySelector('form');
const input = document.querySelector('input');
const error = document.querySelector('#error');
const txt = document.querySelector('#txt');

const fetchData = location => {
  txt.innerHTML = '';
  error.innerHTML = '';
  txt.innerHTML = 'Loading...';

  fetch(`/weather?adress=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        error.innerHTML = data.error;
      } else {
        txt.innerHTML =
          'The weather in ' +
          data.place +
          ' is ' +
          data.forecast +
          ' and ' +
          data.temperature +
          ' and chance of rain is  ' +
          data.prob +
          '%';
      }
    });
  });
};

form.addEventListener('submit', e => {
  e.preventDefault();
  const location = input.value;
  fetchData(location);
});
