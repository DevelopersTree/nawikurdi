import Axios from 'axios';

//home
export function getCountAllNames(){
  return new Promise((resolve, reject) => {
    Axios.get('http://localhost:3001/numberOffRecord').then((result) => {
      resolve(result)
    }).catch((error) => {
      alert(error);
      reject(error)
    })
  })
}

export function getAllNamesWithLimit(limit,offset){
  return new Promise((resolve, reject) => {
    // alert(`http://localhost:3001/All/${limit}/${offset}`+"");
    Axios.get(`http://localhost:3001/${limit}/${offset}`).then((result) => {
      resolve(result);
    }).catch((error) => {
      alert(error);
      reject(error);
    })
  })
}

//search
export function getAllNamesWithLimitAndSearch(limit,offset,searchValue,dropdwon){
  return new Promise((resolve, reject) => {
    Axios.get(`http://localhost:3001/${limit}/${offset}/${searchValue}/${dropdwon}`).then((result) => {
      resolve(result);
    }).catch((error) => {
      alert(error);
      reject(error);
    })
  })
}

//addnewname
export function addNewName(name){
  return new Promise((resolve, reject) => {

    Axios.post('http://localhost:3001/addNewName', name ).then((result) => {
    // Axios.post('http://localhost:3001/addNewName',{sendName:name.sendName,meaningSendName:name.meaningSendName,gender:name.gender} ).then((result) => {
      resolve(result)
      // alert(result+" "+name.sendName);
    }).catch((error) => {
      alert(error);
      reject(error)
    })
  })

}
