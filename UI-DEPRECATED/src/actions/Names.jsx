import Axios from 'axios';

const host = 'http://api.nawikurdi.com';
export function loadNames(params) {
  return new Promise((resolve, reject) => {
    Axios.get(`${host}?${params}`).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function getAllNamesWithLimit(limit, offset) {
  return new Promise((resolve, reject) => {
    Axios.get(`${host}/${limit}/${offset}`).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function getAllNamesWithLimitAndSearch(limit, offset, searchValue, dropdwon) {
  return new Promise((resolve, reject) => {
    Axios.get(`${host}/${limit}/${offset}/${searchValue}/${dropdwon}`).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function addNewName(name) {
  return new Promise((resolve, reject) => {
    Axios.post(`${host}/`, name).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}

export function getRecordCount() {
  return new Promise((resolve, reject) => {
    Axios.get(`${host}/records`).then((result) => {
      resolve(result);
    }).catch((error) => {
      reject(error);
    });
  });
}
