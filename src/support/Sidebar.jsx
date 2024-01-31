import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsFileMedical}
 from 'react-icons/bs'
 import { Link } from 'react-router-dom'

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsFileMedical  className='icon_header'/> ADMIN
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/doctors">
                    <BsFillArchiveFill className='icon'/> Doctors
                </Link>  
            </li>
            <li className='sidebar-list-item'>
                <Link to="/patients">
                    <BsFillGrid3X3GapFill className='icon'/> Patients
                </Link>  
            </li>
            <li className='sidebar-list-item'>
                <Link to="/records">
                    <BsMenuButtonWideFill className='icon'/> Records
                </Link>  
            </li>
            <li className='sidebar-list-item'>
                <Link to="/admin">
                    <BsFillGearFill className='icon'/> Admin Users
                </Link>  
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar