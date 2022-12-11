import db from "./firebaseConfig";
import { auth } from "./firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,updateDoc,arrayUnion,deleteDoc,onSnapshot, serverTimestamp, FieldValue, arrayRemove
} from "firebase/firestore";

// --------------- AUTHENTICATION ---------------//
// Check if the user email  existed => return true if exist
export const userExisted = async (objUser) => {
  const docRef = doc(db, "users", objUser.email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    alert("User Existed")
    return true;
  }
  return false;
};
// Check if the bussiness name existed return empty array if it is not exist
export const bussinessNameExisted = async (objUser) => {
  const q = query(collection(db, "users"), where("nameBussiness", "==", objUser.nameBussiness)); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc=>doc.data())
}
// Create user, and schema for the database
export const createUserWithEmailAndPassword = async (userObj) => {
  await setDoc(doc(db, "users", userObj.email), userObj);
  await setDoc(doc(db, "payments", userObj.nameBussiness), {name: userObj.nameBussiness, orders:[], countTicket: 0});
  await setDoc(doc(db, "historyOrder", userObj.nameBussiness), {name: userObj.nameBussiness, orders:[]});
};
// Login with user email and pwd
export const loginUserWithEmailAndPassword = async (userObj) => {
  const q = query(
    collection(db, "users"),
    where("pwd", "==", userObj.pwd),
    where("email", "==", userObj.email)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {alert("User name or Password invalid");return null};
  return querySnapshot.docs[0].data();
};

// --------------- MENU CATEGORIES ---------------//
// Every bussiness have the collection are named their bussiness + name category that they create
export const addMenuCategories = async (categoriesObj) => {
  await setDoc(
    doc(db, "categories", categoriesObj.nameBussinessMenu),
    categoriesObj.model
  );
};
// Get all categories base on their name
export const getMenuCategory = async (nameBussiness) => {
  const q = query(collection(db, "categories"), where("nameBussiness", "==", nameBussiness)); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc=>doc.data())
};

// The categories is an  array, can't ovewrite it, so add it toward to the end of the array
export const updateMenuCategory = async (nameBussiness, menu) => {
  const docRef = doc(db, "categories", nameBussiness);
  await updateDoc(docRef, {
    category: arrayUnion(menu)
});
}
//  Delete category
export const deleteMenuCategory = async (docName) => {
  await deleteDoc(doc(db, "categories", docName));
}
// Listen for the data change, then update current value ==> make it real time update
export const dataChange = (nameBussiness) => {
  const q = query(collection(db, "categories"), where("nameBussiness", "==", nameBussiness)); 
  onSnapshot(q, (querySnapshot) => {  
    return true;
  });
  return false;
}
// Update the model detail, then save to database
export const saveModelToDataBase = async (nameCategory, sectionToppings) => {
  const frankDocRef = doc(db, "categories", nameCategory);
  await updateDoc(frankDocRef, {
    "model" : sectionToppings
});
  console.log("save");
}
//  Delete Item
export const deleteItem = async (name) => {
  await deleteDoc(doc(db, "menus", name));
}
//  Save item to database
export const saveItemToDataBase = async (nameBussinessCategory, item) => {
await setDoc(
  doc(db, "menus", nameBussinessCategory),
  item
);
console.log("Success");
}
// Get menu of each items were created
export const getMenu = async (nameBussinessCategory) => {
  const q = query(collection(db, "menus"), where("category", "==", nameBussinessCategory)); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc=>doc.data())
};
// add more topping or ingredient to the database
export const getUpdateModel = async (nameBussiness) => {
  const q = query(collection(db, "categories"), where("nameBussiness", "==", nameBussiness)); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc=>doc.data())
};

// --------------- PAYMENT ---------------//
// Use when customer paymen, increase number of ticket in database and store it.
export const addPayment = async (order) => {
  let ticketNum = 1;
  if (order.order.orderNum !== undefined) ticketNum = order.order.orderNum
  const docRef = doc(db, "payments", order.bussiness);
  await updateDoc(docRef, {
    "countTicket": ticketNum,
});
  await updateDoc(docRef, {
    orders: arrayUnion(order)
});
};
// Get all report, tickets of selling
export const getPaymentRecord = async (order) => {
  const q = query(collection(db, "payments"), where("name", "==", order.bussiness)); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc=>doc.data())
};
//  After order completely done, all order is stranfer from payment, to history order.
export const getHistoryOrder = async (order) => {
  const q = query(collection(db, "historyOrder"), where("name", "==", order.bussiness)); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc=>doc.data())
};
export const transferPaymentRecordToHist = async (obj) => {
  const docRef = doc(db, "historyOrder", obj.name);
  await updateDoc(docRef, {
    orders: arrayUnion(obj.obj)
});
}
// Delete payment from payment because it was transfered to history order
export const deletePaymentRecord = async (obj) => {
  const q = doc(db, "payments", obj.name);
  await updateDoc(q, {
    orders: arrayRemove(obj.obj)
});
}


