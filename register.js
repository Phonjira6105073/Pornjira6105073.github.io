// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKpvYDlylXTYDEtCciaTqw1bq41S9OOQU",
  authDomain: "week14-2bd65.firebaseapp.com",
  projectId: "week14-2bd65",
  storageBucket: "week14-2bd65.appspot.com",
  messagingSenderId: "130645145022",
  appId: "1:130645145022:web:3046d06e0222c66b0775ef",
  measurementId: "G-TRX3P7SM14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import{getDatabase, ref, get, set, child, update, remove, onValue, onChildAdded, onChildChanged, onChildRemoved}
from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";

;
const db = getDatabase();

// // References
var sid = document.getElementById("sid");
var name = document.getElementById("name");
var lastanme = document.getElementById("surname");
var btn_insert = document.getElementById("btn_insert");
var btn_select = document.getElementById("btn_select");
var btn_update = document.getElementById("btn_update");
var btn_delete = document.getElementById("btn_delete");
var btn_all = document.getElementById("btn_all");



// insert function
function insertData(){

    set(ref(db,"Student/"+sid.value),{
        name: name.value,
        lastname: lastanme.value
      
    })
    .then(()=>{
        location.reload(); 
        // alert("data stored successfully");
       
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
   
}


// SELECT DATA 
function selectData(){
    
  const dbref = ref(db);
  get(child(dbref,"Student/"+sid.value)).then((snapshot) =>{
      if(snapshot.exists()){
  
          let std_id = sid.value
          let name = snapshot.val().name;
          let lastname = snapshot.val().lastname;
          
          // alert(std_id+ " " +name+" "+ lastname)
          showIteminList(std_id, name,lastname)
      }
      else{
          alert("No data dound");
          
      }
  })
  .catch((error) =>{
      alert("unsuccessful, error"+error);
  });
}

function removeAll(){
  document.getElementById("lists").innerHTML = "";
}
function showIteminList(sid, name,lastname){
  removeAll()
  addItemToList(sid, name,lastname)
}
let stdNo = 0;
function addItemToList(sid, name,lastname){
 
  var ul = document.getElementById('lists');
  var header = document.createElement('h2');

  var _sid = document.createElement('li');
  var _name = document.createElement('li');
  var _lastname = document.createElement('li');
  
  header.innerHTML = 'Student-'+(++stdNo);



  _sid.innerHTML = 'ID: '+sid;
  _name.innerHTML = 'Name: '+name;
  _lastname.innerHTML = 'LASTNAME: '+lastname;
 
  ul.appendChild(header);
  ul.appendChild(_sid);
  ul.appendChild(_name);    
  ul.appendChild(_name);
  ul.appendChild(_lastname);

}

// UPDATE DATA 
function updateData(){
  update(ref(db,"Student/"+sid.value),{
      name: name.value,
      lastname: lastanme.value,

  })
  .then(()=>{
      // alert("data update successfully");
      location.reload();
      
  })
  .catch((error)=>{
      alert("unsccessful, error" + error);
  })
}
//DELTE

function deleteData(){
  remove(ref(db,"Student/"+sid.value))
  .then(()=>{
      alert("data delete successfully");
      location.reload();
  })
  .catch((error)=>{
      alert("unsccessful, error" + error);
  })
}

function selectAll(){
  
  const dbRef = ref(db, 'Student/');
  onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;       
          let std_name = childSnapshot.val().name;
          let std_lastname = childSnapshot.val().lastname;
         

          addItemToList(childKey, std_name, std_lastname);
          // window.addEventListener('load',FetchAllData)
      });
  }, {
  onlyOnce: true
  });
  
}


btn_insert.addEventListener('click',insertData);
btn_select.addEventListener('click',selectData);
btn_update.addEventListener('click',updateData);
btn_delete.addEventListener('click',deleteData);
btn_all.addEventListener('click',selectAll);