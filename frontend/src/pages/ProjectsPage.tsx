import { Link } from 'react-router'
import styles from './ProjectsPage.module.css'

interface ProjectSummary {
  id: string
  name: string
  description: string
  memberCount: number
  updatedLabel: string
}

const projects: readonly ProjectSummary[] = [
  {
    id: 'project-alpha',
    name: 'Project Alpha',
    description:
      'Theo dõi các đầu việc chính và phối hợp tiến độ của nhóm trong một không gian chung.',
    memberCount: 5,
    updatedLabel: 'Cập nhật hôm nay',
  },
  {
    id: 'website-redesign',
    name: 'Website Redesign',
    description:
      'Lập kế hoạch nội dung, thiết kế giao diện và chuẩn bị các hạng mục cho phiên bản mới.',
    memberCount: 3,
    updatedLabel: 'Cập nhật hôm qua',
  },
  {
    id: 'mobile-research',
    name: 'Mobile Research',
    description:
      'Tổng hợp phản hồi người dùng và sắp xếp các ý tưởng cần kiểm chứng trên thiết bị di động.',
    memberCount: 4,
    updatedLabel: 'Cập nhật 3 ngày trước',
  },
]

export function ProjectsPage() {
  return (
    <section className={styles.page} aria-labelledby="projects-title">
      <header className={styles.pageHeader}>
        <div className={styles.headingGroup}>
          <p className={styles.eyebrow}>Kanban Collaboration</p>
          <h1 id="projects-title">Projects</h1>
          <p className={styles.intro}>
            Chọn một project để xem board và tiếp tục công việc cùng nhóm.
          </p>
        </div>

        <button className={styles.createButton} type="button">
          <span aria-hidden="true">+</span>
          Create project
        </button>
      </header>

      {projects.length > 0 ? (
        <div className={styles.projectGrid} aria-label="Danh sách project">
          {projects.map((project) => (
            <article className={styles.projectCard} key={project.id}>
              <div>
                <h2>{project.name}</h2>
                <p className={styles.description}>{project.description}</p>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.projectMeta}>
                  <span>
                    {project.memberCount}{' '}
                    {project.memberCount === 1 ? 'member' : 'members'}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{project.updatedLabel}</span>
                </div>

                <Link
                  className={styles.boardLink}
                  to={`/projects/${project.id}/board`}
                >
                  Open board
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState} role="status">
          <h2>Chưa có project</h2>
          <p>Các project bạn tham gia sẽ xuất hiện tại đây.</p>
        </div>
      )}
    </section>
  )
}
