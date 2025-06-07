import { useLocation } from 'react-router-dom';
import '../Styles/HeaderComponent.css'
import { Link } from 'react-router-dom'

export function HeaderComponent() {
    const location = useLocation();
    const navItems = ['Home', 'Taskleap', 'Activity', 'TaskVault'];

    return (
        <div className='header-component-container'>
            <span>Productivity Dashboard</span>
            <ul className="nav-list-container">
                {location.pathname.toLocaleLowerCase() === '/home' ? null : navItems.map((label, index) => {
                    const path = `/${label.toLowerCase()}`;
                    const isActive = location.pathname === path;
                    return (
                        <li key={index} className={isActive ? 'active' : ''}>
                            <Link to={path}>{label}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}


// import { React, useState } from 'react'
// import '../Styles/HeaderComponent.css'
// import { Link } from 'react-router-dom'

// export function HeaderComponent() {
//     const [activeIndex, setActiveIndex] = useState(0);

//     return (
//         <div className='header-component-container'>
//             <span>Productivity Dashboard</span>

//             <ul className="nav-list-container">
//                 {['Home', 'Taskleap', 'Unknown 1', 'Unknown 2', 'Unknown 3'].map((label, index) => (
//                     <li
//                         key={index}
//                         className={activeIndex === index ? 'active' : ''}
//                         onClick={() => setActiveIndex(index)}
//                     >
//                         {console.log(index)}
//                         <Link to={`/${label.toLowerCase()}`}>{label}</Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }