import db from "./firebaseConfig";
import { auth } from "./firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,updateDoc,arrayUnion,deleteDoc,onSnapshot, serverTimestamp
} from "firebase/firestore";

// --------------- AUTHENTICATION ---------------//
export const userExisted = async (objUser) => {
  const docRef = doc(db, "users", objUser.email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    alert("User Existed")
    return true;
  }
  return false;
};
export const createUserWithEmailAndPassword = async (userObj) => {
  await setDoc(doc(db, "users", userObj.email), userObj);
  await setDoc(doc(db, "payments", userObj.nameBussiness), {name: userObj.nameBussiness, orders:[]});
};
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
export const addMenuCategories = async (categoriesObj) => {
  await setDoc(
    doc(db, "categories", categoriesObj.nameBussinessMenu),
    categoriesObj.model
  );
  console.log("Success");
};

export const getMenuCategory = async (nameBussiness) => {
  const q = query(collection(db, "categories"), where("nameBussiness", "==", nameBussiness)); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc=>doc.data())
};

export const updateMenuCategory = async (nameBussiness, menu) => {
  const docRef = doc(db, "categories", nameBussiness);
  await updateDoc(docRef, {
    category: arrayUnion(menu)
});
}
export const deleteMenuCategory = async (docName) => {
  await deleteDoc(doc(db, "categories", docName));
}
export const dataChange = (nameBussiness) => {
  const q = query(collection(db, "categories"), where("nameBussiness", "==", nameBussiness)); 
  onSnapshot(q, (querySnapshot) => {  
    return true;
  });
  return false;
}
export const saveModelToDataBase = async (nameCategory, sectionToppings) => {
  const frankDocRef = doc(db, "categories", nameCategory);
  await updateDoc(frankDocRef, {
    "model" : sectionToppings
});
  console.log("save");
}

export const saveItemToDataBase = async (nameBussinessCategory, item) => {
await setDoc(
  doc(db, "menus", nameBussinessCategory),
  item
);
console.log("Success");
}
export const getMenu = async (nameBussinessCategory) => {
  const q = query(collection(db, "menus"), where("category", "==", nameBussinessCategory)); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc=>doc.data())
};
export const getUpdateModel = async (nameBussiness) => {
  console.log("Line 90");
  const q = query(collection(db, "categories"), where("nameBussiness", "==", nameBussiness)); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc=>doc.data())
};

// --------------- PAYMENT ---------------//
export const addPayment = async (order) => {
  const docRef = doc(db, "payments", order.bussiness);
  await updateDoc(docRef, {
    orders: arrayUnion(order)
});
  console.log("Success");
};

export const getPaymentRecord = async (order) => {
  const q = query(collection(db, "payments"), where("name", "==", order.bussiness)); 
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc=>doc.data())
};



