import type { ReactNode } from 'react'
import styles from './PagePlaceholder.module.css'

interface PagePlaceholderProps {
  title: string
  description: string
  children?: ReactNode
}

export function PagePlaceholder({
  title,
  description,
  children,
}: PagePlaceholderProps) {
  return (
    <section className={styles.container}>
      <p className={styles.eyebrow}>Front-end scaffold</p>
      <h1>{title}</h1>
      <p className={styles.description}>{description}</p>
      {children}
    </section>
  )
}
