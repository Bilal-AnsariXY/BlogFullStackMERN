import React, { useState } from "react";
import { useAuth } from "../contest/Authprovider.jsx";
import Sidebar from "../dashboard/Sidebar.jsx";
import MyProfile from "../dashboard/Myprofile.jsx";
import CreateBlog from "../dashboard/CreateBlog.jsx";
import Myblogs from "../dashboard/Myblogs.jsx";
import Updateblog from "../dashboard/Updateblog.jsx";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Dashbord() {
  const { setMyPro, myPro } = useAuth();
  const [updateId,setUpdateId] = useState("");
  const [component, setComponent] = useState("my blogs");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!myPro) {
    return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;
  }
  if(myPro.role === 'user'){
    return <p className="text-center mt-10 text-gray-500">you are not the admin</p>;

  }
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top bar for small devices */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar on mobile (above content) or fixed on desktop */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Mobile & Desktop Sidebar */}
        <div
          className={`bg-gray-200 p-4 transition-all duration-300 border-b md:border-b-0 md:border-r border-gray-300
            ${isSidebarOpen ? "block" : "hidden"} md:block md:w-1/4`}
        >
          <Sidebar
            myPro={myPro}
            component={component}
            setComponent={(comp) => {
              setComponent(comp);
              setIsSidebarOpen(false); // close sidebar after selecting on mobile
            }}
            setMyPro={setMyPro}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-auto bg-white">
          {component === "my profile" && <MyProfile myPro={myPro} />}
          {component === "create blog" && <CreateBlog myPro={myPro} setComponent={setComponent} />}
          {(component === "update blog" || component === "update") && <Updateblog updateId={updateId} setUpdateId={setUpdateId} myPro={myPro} setComponent = {setComponent} />}
          {component === "my blogs" && <Myblogs updateId={updateId} setUpdateId={setUpdateId} myPro={myPro} setComponent = {setComponent}/>}
        </div>
      </div>
    </div>
  );
}
