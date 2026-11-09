import { useEffect, useState } from 'react'

function App() {
  const [courses, setCourses] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch('/api/v1/courses')
      .then(res => res.json())
      .then(data => {
        setCourses(data.items)
        setStatus('ok')
      })
      .catch(() => setStatus('error'))
  }, [])

  return (
    <div style={{ padding: '24px', fontFamily: 'Inter, system-ui' }}>
      <h1>Catálogo Comunitario</h1>
      {status === 'loading' && <p>Cargando cursos...</p>}
      {status === 'error' && <p>Error de conexión con el servidor.</p>}
      {status === 'ok' && (
        <ul>
          {courses.map(c => <li key={c.id}>{c.title} ({c.category})</li>)}
        </ul>
      )}
    </div>
  )
}

export default App
