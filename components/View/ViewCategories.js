import React, { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import { deleteMenuCategory } from "../../firebaseFunction";

function ViewCategories(categories) {

  const deleteDoc = (doc) => {
    let tempDoc = (doc.nameBussiness + "_" + doc.categoryName).toLocaleUpperCase()
    deleteMenuCategory(tempDoc)
  }
  return (
    <div className="grid grid-cols-4 gap-5">
    {
        categories.value.map(doc => (
            <div className=" relative p-2 border border-white font-bold rounded-[12px]" key={doc.id}>
            <button className="absolute -right-2 -top-3" onClick={()=> deleteDoc(doc)}><ClearIcon color="error"/></button>
            {doc.categoryName}
            </div>
        ))
    }
     
    </div>
  );
}

export default ViewCategories;
