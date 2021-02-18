import React from 'react'
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import { links } from './linkUtils';

export const SideMenuData = [
  {
    page: 'rooms',
    path: links.rooms,
    icon: <AiIcons.AiFillHome />
  },{
    page: 'settings',
    path: links.settings,
    icon: <IoIcons.IoIosSettings />
  },
];