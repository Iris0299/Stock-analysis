async function getGroups(url = '', token) {
  const response = await fetch(url, {
    method: 'GET', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }, 
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}

async function postGroups(url = '', token, data= {}) {
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }, 
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data) 
  });
  return response.json(); 
}

async function getStockFromGroups(url = '', token) {
  const response = await fetch(url, {
    method: 'GET', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }, 
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return response.json(); 
}

async function postStockFromGroups(url = '', token, data= {}) {
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }, 
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json(); 
}

async function postExpected(url = '', token, data= {}) {
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    }, 
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json(); 
}

async function postLogin(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  return response.json(); 
}

export {getGroups, postGroups,getStockFromGroups, postStockFromGroups, postLogin, postExpected}
