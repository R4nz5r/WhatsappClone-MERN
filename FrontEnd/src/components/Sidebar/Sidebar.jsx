import React from "react";
import "./Sidebar.css";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import { Avatar, IconButton } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import SidebarChats from "../Sidebar Chats/SidebarChats";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <div className="sidebar__header">
        <Avatar src="https://scontent.fjsr11-1.fna.fbcdn.net/v/t39.30808-1/426764997_3685930491694792_3509009635225712527_n.jpg?stp=cp6_dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=w053Lzn6ia8AX8ZHR0N&_nc_ht=scontent.fjsr11-1.fna&oh=00_AfBDrBqx8zqzs6QnoJ5R-C7ScePIDBQSQQseRyzq0mMJTQ&oe=660DADF8"/>
        <div className="sidebar__headerRight">
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input type="text" placeholder="Search or start a new chat"/>
        </div>
      </div>

      <div className="sidebar__chats">
          <SidebarChats/>
          <SidebarChats/>
          <SidebarChats/>
      </div>
    </div>
  );
};

export default Sidebar;
