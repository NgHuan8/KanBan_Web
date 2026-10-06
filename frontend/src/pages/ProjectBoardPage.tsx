import { Link, useParams } from 'react-router'
import styles from './ProjectBoardPage.module.css'

interface BoardColumn {
  id: string
  title: string
}

const columns: readonly BoardColumn[] = [
  { id: 'todo', title: 'To do' },
  { id: 'in-progress', title: 'In progress' },
  { id: 'done', title: 'Done' },
]

export function ProjectBoardPage() {
  const { projectId } = useParams()

  return (
    <section className={styles.page} aria-labelledby="board-title">
      <header className={styles.pageHeader}>
        <Link className={styles.backLink} to="/projects">
          <span aria-hidden="true">←</span>
          Back to projects
        </Link>

        <div className={styles.headingGroup}>
          <p className={styles.eyebrow}>Project workspace</p>
          <h1 id="board-title">Board</h1>
          <p className={styles.intro}>
            Organize work across each stage of your project.
          </p>
          {projectId ? (
            <p className={styles.projectMeta}>
              Project: <span>{projectId}</span>
            </p>
          ) : null}
        </div>
      </header>

      <div className={styles.boardViewport}>
        <section className={styles.board} aria-label="Kanban board">
          {columns.map((column) => (
            <section
              className={styles.column}
              key={column.id}
              aria-labelledby={`${column.id}-title`}
            >
              <header className={styles.columnHeader}>
                <h2 id={`${column.id}-title`}>{column.title}</h2>
                <span className={styles.taskCount} aria-label="0 tasks">
                  0
                </span>
              </header>

              <div className={styles.columnBody}>
                <p>No tasks yet</p>
              </div>
            </section>
          ))}
        </section>
      </div>
    </section>
  )
}
