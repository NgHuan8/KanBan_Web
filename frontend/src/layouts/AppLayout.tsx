import { NavLink, Outlet } from 'react-router'
import styles from './Layout.module.css'

export function AppLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <NavLink className={styles.brand} to="/projects">
            Kanban Collaboration
          </NavLink>
          <nav className={styles.nav} aria-label="Điều hướng ứng dụng">
            <NavLink
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }
              to="/projects"
            >
              Projects
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }
              to="/profile"
            >
              Profile
            </NavLink>
          </nav>
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}
