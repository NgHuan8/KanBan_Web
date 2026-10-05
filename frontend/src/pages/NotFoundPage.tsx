import { Link } from 'react-router'
import { PagePlaceholder } from '../components/PagePlaceholder'

export function NotFoundPage() {
  return (
    <PagePlaceholder title="404" description="Không tìm thấy trang được yêu cầu.">
      <p>
        <Link to="/projects">Quay lại Projects</Link>
      </p>
    </PagePlaceholder>
  )
}
