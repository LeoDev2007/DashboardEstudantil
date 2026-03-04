import React from 'react'
import Drawner from './Drawner';
import styles from '../styles/Header.module.css'
import ToggleTheme from './ToggleTheme';

const Header = () => {
    
  return (
    <div>
        <nav className={styles.nav}>
            <div>
                {/* Drawner */}
                <Drawner />
               
            </div>
             <ToggleTheme />
        </nav>
    </div>
  )
}

export default Header