import React, { useContext, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { TbScooter } from "react-icons/tb";
import { MdOutlineFavorite } from "react-icons/md";
import { BiMessageSquareDots } from "react-icons/bi";
import { RiChatHistoryLine } from "react-icons/ri";
import { TbScript } from "react-icons/tb";
import { Button } from "./ui/button";
import { useUser } from "@/features/UserContext";
import { AuthContext } from "@/features/AuthContext";
import graphic from "../assets/graphic.jpg"

function Sidebar({ onSelect }) {
  const menuItems = [
    { id: 1, img: <MdSpaceDashboard />, name: "Dashboard" },
    { id: 2, img: <TbScooter />, name: "Food Order" },
    { id: 3, img: <BiMessageSquareDots />, name: "Message" },
    { id: 4, img: <RiChatHistoryLine />, name: "Order History" },
  ];

  const [selected, setSelected] = useState("Dashboard");
    const {user} = useUser();
    const {isLoggedIn} = useContext(AuthContext)

  const handleClick = (item) => {
    setSelected(item);
    onSelect(item);
  };
  return (
    <div className="w-[15%] h-screen pt-5 sticky flex flex-col justify-between border-r-2  border-zinc-150    text-xl font-['Test_Founders_Grotesk_X']  text-black bg-[#FFBC0D]  ">
      <div className="items flex justify-center mt-5">
        <ul className="flex flex-col gap-6">
          {menuItems.map((item, id) => (
            <li
              className={`cursor-pointer  pl-9 pr-9 pt-1 pb-2 rounded-md flex items-center gap-2 transition-all duration-300   ${
                selected === item.name
                  ? "bg-[#FEFDF8] text-black shadow-lg"
                  : ""
              } `}
              key={id}
              onClick={() => handleClick(item.name)}
            >
              {" "}
              {item.img}
              {item.name}
            </li>
          ))}
          { user?.role === "admin" && isLoggedIn &&
            <li
              className={`cursor-pointer  pl-9 pr-9 pt-1 pb-2 rounded-md flex items-center gap-2   ${
                selected === "Bills"
                  ? "bg-[#FEFDF8] text-black shadow-lg "
                  : ""
              } `}
              onClick={() => handleClick("Bills")}
            >
              {" "}
              <TbScript />
              Bills
            </li>
          }
        </ul>
      </div>
      {/* <div className="Upgrade   ml-4 mr-4  ">
        <div className=" rounded-2xl  bg-[#FEFDF8] text-black w-full">
          <div className=" pt-2 mb-2 pl-6 flex flex-col " >
          <h1>Upgrade your Account for Exciting Offers!</h1>
          <Button className="w-20 bg-[#ff9d00] text-[#F0F2FF] cursor-pointer hover:bg-[#f5b802] ">
            Upgrade
          </Button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;
