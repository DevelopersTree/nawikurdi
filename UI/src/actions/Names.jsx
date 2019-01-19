import Axios from 'axios';
var host = "http://localhost:3001";
export function getAllNamesWithLimit(limit,offset){
  return new Promise((resolve, reject) => {
    Axios.get(`${host}/${limit}/${offset}`).then((result) => {
      resolve(result);
    }).catch((error) => {
      console.log(error);
      reject(error);
    })
  })
}

//search
export function getAllNamesWithLimitAndSearch(limit,offset,searchValue,dropdwon){
  return new Promise((resolve, reject) => {
    Axios.get(`${host}/${limit}/${offset}/${searchValue}/${dropdwon}`).then((result) => {
      resolve(result);
    }).catch((error) => {
      console.log(error);
      reject(error);
    })
  })
}

//addnewname
export function addNewName(name){
  return new Promise((resolve, reject) => {

    Axios.post(`${host}/addNewName`, name ).then((result) => {
      resolve(result)
    }).catch((error) => {
      alert(error);
      reject(error)
    })
  })

}

// count all name
export function getCountAllNames(){
  return new Promise((resolve, reject) => {
    Axios.get(`${host}/numberOffRecord`).then((result) => {
      resolve(result)
    }).catch((error) => {
      console.log(error);
      reject(error)
    })
  })
}
