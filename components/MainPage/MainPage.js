import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ImgBackground from "../Img/ImgBackground";
import NavBarTop from "../NavBar/NavBarTop";
import OrderShow from "../OrderShow/OrderShow";
import NavBarSlide from "../NavBar/NavBarSlide";
import NavBarContext from "../Context/NavBarContext";
import MenuSlide from "../Menu/MenuSlide";
import ViewAddCategories from "../View/ViewAddCategories";
import { getMenuCategories } from "../../Features/menuSlice";
import { dataChange } from "../../firebaseFunction";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import db from "../../firebaseConfig"
import ViewMenuCategory from "../View/ViewMenuCategory";

function MainPage() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.menu.isLoading)
  const handle = useFullScreenHandle();
  const [viewAddMenuSection] = ["ADD_MENU_SECTION"];
  const [view, setView] = useState();
  const [openNavBarSlide, setNavBarSlide] = useState(false);
  const [category, setCategoryName] = useState()
  const router = useRouter();
  const user = useSelector((state) => state.account.user);


  useEffect(() => {
    if (!user) {router.replace("/")}
  },[router, user]);

  useEffect(()=> {
    if (user){
      const q = query(collection(db, "categories"), where("nameBussiness", "==", user.nameBussiness)); 
      onSnapshot(q, (querySnapshot) => {
        dispatch(getMenuCategories(user.nameBussiness))
      });
    }
  },[user])


  return (
    <FullScreen handle={handle}>
      <div className="flex flex-col h-screen w-screen text-white">
        <NavBarContext.Provider
          value={{ openNavBarSlide, setNavBarSlide, setView }}
        >
          <ImgBackground />
          <NavBarTop handle={handle} />
          {openNavBarSlide ? <NavBarSlide /> : <></>}

          <div className="flex flex-row justify-between h-full w-full">
            <div className="flex flex-col h-full w-3/4">
              <MenuSlide />
              <ViewMenuCategory view={view}/>
              {view === viewAddMenuSection ? <ViewAddCategories nameBussiness={user.nameBussiness}/> : <></>}
            </div>
            <div className="flex h-full w-1/4">
              <OrderShow />
            </div>
          </div>
        </NavBarContext.Provider>
      </div>
    </FullScreen>
  );
}

export default MainPage;

// <div>
// <button className="z-10" type="submit" onClick={handle.enter}>
//   FullScreen
// </button>
// </div>
