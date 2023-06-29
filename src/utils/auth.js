export const BASE_URL = 'https://auth.nomoreparties.co/';

export const register = (email, password) => {
  return fetch(`${BASE_URL}signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then (response => {
    try {
      if (response.status === 200) {
        return response.json();
      }
    } 
    catch(err) {
        return (err);
      }
  })
  .then (res => {return res})
  .catch(e => console.log(e));
}

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then (response => {
    try {
      if (response.status === 200) {
        return response.json();
      }
    } 
    catch(err) {
        return (err);
      }
  })
  .then (res => {
    localStorage.setItem('token', res.token);
    return res;
  })
  .catch(e => console.log(e));
}





