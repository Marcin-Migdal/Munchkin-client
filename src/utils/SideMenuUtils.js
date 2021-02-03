import React from 'react'
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import { links } from './linkUtils';

export const SideMenuData = [
  {
    page: 'Pokoje',
    path: links.rooms,
    icon: <AiIcons.AiFillHome />,
    className: 'nav-menu-item'
  },{
    page: 'Ustawienia',
    path: links.settings,
    icon: <IoIcons.IoIosSettings />,
    className: 'nav-menu-item'
  },
];