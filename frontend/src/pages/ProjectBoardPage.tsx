import { useParams } from 'react-router'
import { PagePlaceholder } from '../components/PagePlaceholder'

export function ProjectBoardPage() {
  const { projectId } = useParams()

  return (
    <PagePlaceholder
      title="Project Board"
      description={`Kanban board placeholder cho project ${projectId ?? ''}.`}
    />
  )
}
