import { Navigate, Route, Routes } from 'react-router'
import { AppLayout } from '../layouts/AppLayout'
import { PublicLayout } from '../layouts/PublicLayout'
import { LoginPage } from '../pages/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProfilePage } from '../pages/ProfilePage'
import { ProjectBoardPage } from '../pages/ProjectBoardPage'
import { ProjectsPage } from '../pages/ProjectsPage'
import { RegisterPage } from '../pages/RegisterPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/projects" replace />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route
          path="/projects/:projectId/board"
          element={<ProjectBoardPage />}
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
