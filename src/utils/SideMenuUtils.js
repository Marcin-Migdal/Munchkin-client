import React from 'react'
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"

export const SideMenuData = [
  {
    page: 'Pokoje',
    path: '/rooms',
    icon: <AiIcons.AiFillHome />,
    className: 'nav-menu-item'
  },{
    page: 'Ustawienia',
    path: '/settings',
    icon: <IoIcons.IoIosSettings />,
    className: 'nav-menu-item'
  },
];