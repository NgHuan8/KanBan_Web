import type { ReactNode } from 'react'
import styles from '../styles/AuthForm.module.css'

type AuthPageLayoutProps = {
  children: ReactNode
  description: string
  title: string
  titleId: string
}

export function AuthPageLayout({
  children,
  description,
  title,
  titleId,
}: AuthPageLayoutProps) {
  return (
    <section className={styles.authPage} aria-labelledby={titleId}>
      <aside className={styles.brandPanel} aria-label="Kanban Collaboration">
        <div>
          <div className={styles.brandHeading}>
            <span className={styles.brandMark} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>Kanban Collaboration</span>
          </div>
          <p className={styles.brandEyebrow}>Realtime teamwork</p>
          <p className={styles.brandTitle}>Move work forward, together.</p>
          <p className={styles.brandDescription}>
            Plan projects, share progress, and keep your team aligned in one
            clear workspace.
          </p>
        </div>

        <div className={styles.boardPreview} aria-hidden="true">
          <div className={styles.previewColumn}>
            <span className={styles.previewColumnTitle}>To do</span>
            <span className={styles.previewCard} />
            <span className={styles.previewCardShort} />
          </div>
          <div className={styles.previewColumn}>
            <span className={styles.previewColumnTitle}>Doing</span>
            <span className={styles.previewCardAccent} />
            <span className={styles.previewCard} />
          </div>
          <div className={styles.previewColumn}>
            <span className={styles.previewColumnTitle}>Done</span>
            <span className={styles.previewCardShort} />
          </div>
        </div>

        <p className={styles.brandFootnote}>Plan · Collaborate · Deliver</p>
      </aside>

      <div className={styles.formPanel}>
        <div className={styles.formHeader}>
          <p className={styles.formEyebrow}>Welcome</p>
          <h1 className={styles.formTitle} id={titleId}>
            {title}
          </h1>
          <p className={styles.formDescription}>{description}</p>
        </div>
        {children}
      </div>
    </section>
  )
}
