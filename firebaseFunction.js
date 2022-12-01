import db from "./firebaseConfig";
import { auth } from "./firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,updateDoc,arrayUnion,deleteDoc,onSnapshot
} from "firebase/firestore";
import { async } from "@firebase/util";

// --------------- AUTHENTICATION ---------------//
export const userExisted = async (objUser) => {
  const docRef = doc(db, "users", objUser.email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  }
  return false;
};
export const createUserWithEmailAndPassword = async (userObj) => {
  await setDoc(doc(db, "users", userObj.email), userObj);
};
export const loginUserWithEmailAndPassword = async (userObj) => {
  const q = query(
    collection(db, "users"),
    where("pwd", "==", userObj.pwd),
    where("email", "==", userObj.email)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
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

