import { NavLink, Outlet } from 'react-router'
import styles from './Layout.module.css'

export function PublicLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <NavLink className={styles.brand} to="/">
            Kanban Collaboration
          </NavLink>
          <nav className={styles.nav} aria-label="Điều hướng công khai">
            <NavLink
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }
              to="/login"
            >
              Đăng nhập
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.activeLink : ''}`
              }
              to="/register"
            >
              Đăng ký
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
