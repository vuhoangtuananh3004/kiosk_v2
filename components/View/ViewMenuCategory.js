import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SetUpModel from "../Model/SetUpModel";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import CreateItem from "../Items/CreateItem";
import { useDispatch, useSelector } from "react-redux";
import { loadItemModel } from "../../Features/itemSlice";
import DisplayMenu from "./DisplayMenu";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import db from "../../firebaseConfig";
import { getMenus } from "../../Features/menuSlice";

function ViewMenuCategory({ view, setView }) {
  //  When all categories were add => display on the vertical bar.
  const station = useSelector((state) => state.station.station);
  const [editMode, setEditMode] = useState(false);
  const [itemMode, setItemMode] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const menu = useSelector((state) => state.menu.menu);
  //  use realtime update the category whenever user add new category
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "menus"),
        where("category", "==", view.nameBussiness + view.categoryName)
      );
      onSnapshot(q, (querySnapshot) => {
        dispatch(getMenus(view.nameBussiness + view.categoryName));
      });
    }
  }, [dispatch, user, view.categoryName, view.nameBussiness]);

  // Each category have create model mode, and create item mode ==> select which mode want to be used
  const changeItemMode = () => {
    dispatch(loadItemModel(view.model));
    setItemMode(true);
  };
  if (!view || !user) return <>Loading......</>;
  return (
    <div className="flex h-full w-full p-5">
      {editMode ? (
        <SetUpModel setEditMode={setEditMode} view={view} setView={setView} />
      ) : itemMode ? (
        <CreateItem setItemMode={setItemMode} view={view} setView={setView} />
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {!menu ? (
            <> </>
          ) : (
            menu.map((doc) => <DisplayMenu key={doc.name} doc={doc} />)
          )}
          {station == "MANAGER" ? (
            <>
              <div className="flex flex-col justify-center items-center w-[200px] h-[200px] rounded-[24px] p-2 border-4 border-dashed border-white bg-white/20 text-[48px] hover:bg-slate-900/50 cursor-pointer">
                <StorageOutlinedIcon
                  fontSize="inherit"
                  onClick={() => setEditMode(true)}
                />
                <span className="text-sm">Create model</span>
              </div>
              <div className="flex flex-col justify-center items-center w-[200px] h-[200px] rounded-[24px] p-2 border-4 border-dashed border-white bg-white/20 text-[48px] hover:bg-slate-900/50 cursor-pointer">
                <AddCircleOutlineIcon
                  fontSize="inherit"
                  onClick={changeItemMode}
                />
                <span className="text-sm">Create item</span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewMenuCategory;
