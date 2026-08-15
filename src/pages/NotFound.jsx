import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <section className="not-found section">
      <div className="wrap not-found-inner">
        <p className="eyebrow">404</p>
        <h1 className="nf-title">Nothing built here yet.</h1>
        <p className="nf-sub">
          This page doesn't exist — or it moved. Head back to the work you were
          probably looking for.
        </p>
        <Link to="/" className="btn btn-primary">Back to the homepage</Link>
      </div>
    </section>
  )
}
