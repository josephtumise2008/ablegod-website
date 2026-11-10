import { useEffect, useState } from 'react'

/**
 * Very small router: the shop lives at "/" and the admin preview at "/admin".
 * Moving between them with navigate() keeps the app's state (no page reload).
 */
const listeners = new Set()

export function navigate(path) {
  if (path === window.location.pathname) return
  window.history.pushState({}, '', path)
  window.scrollTo(0, 0)
  listeners.forEach((listener) => listener(path))
}

export function usePath() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onChange = () => setPath(window.location.pathname)
    listeners.add(setPath)
    window.addEventListener('popstate', onChange)
    return () => {
      listeners.delete(setPath)
      window.removeEventListener('popstate', onChange)
    }
  }, [])

  return path
}

/** Link that changes page without reloading. */
export function handleNavClick(event, path) {
  // Let the browser handle new-tab clicks (Cmd/Ctrl/middle click).
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
  event.preventDefault()
  navigate(path)
}
