import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import TopNav from './components/Navigation/TopNav'
import LoginPage from './pages/Login/LoginPage'
import './App.css'

// 인증이 필요한 라우트를 보호하는 컴포넌트
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      {isAuthenticated && <TopNav />}
      <main className={isAuthenticated ? "main-content" : ""}>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          } />
          <Route path="/" element={
            <ProtectedRoute>
              <h1>메인 페이지</h1>
            </ProtectedRoute>
          } />
          <Route path="/basic-data/measurement/pending" element={
            <ProtectedRoute><h1>확정대기</h1></ProtectedRoute>
          } />
          <Route path="/basic-data/measurement/confirmed" element={
            <ProtectedRoute><h1>확정완료</h1></ProtectedRoute>
          } />
          <Route path="/basic-data/measurement/general" element={
            <ProtectedRoute><h1>일반계량</h1></ProtectedRoute>
          } />
          <Route path="/basic-data/ecoas/collection" element={
            <ProtectedRoute><h1>수집/운반관리표</h1></ProtectedRoute>
          } />
          <Route path="/basic-data/ecoas/supply" element={
            <ProtectedRoute><h1>공급/폐기관리표</h1></ProtectedRoute>
          } />
          <Route path="/basic-data/tax-invoice/purchase" element={
            <ProtectedRoute><h1>매입 세금계산서 관리</h1></ProtectedRoute>
          } />
          <Route path="/basic-data/tax-invoice/sales" element={
            <ProtectedRoute><h1>매출 세금계산서 관리</h1></ProtectedRoute>
          } />
          {/* 기본 리다이렉트 */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
