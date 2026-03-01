import React, { useState, useEffect } from 'react'

function Result({ result, onBack, onRespin }) {
  const [animating, setAnimating] = useState(true)

  useEffect(() => {
    setAnimating(true)
    const timer = setTimeout(() => setAnimating(false), 600)
    return () => clearTimeout(timer)
  }, [result])

  if (!result) {
    return (
      <div className="result">
        <div className="result-card">
          <div className="result-emoji">😅</div>
          <h2>No matches!</h2>
          <p className="result-sub">Try loosening your filters a bit.</p>
        </div>
        <button className="pick-btn" onClick={onBack}>← Try again</button>
      </div>
    )
  }

  const { pick, allMatches } = result

  return (
    <div className="result">
      <div className={`result-card ${animating ? 'result-animate' : ''}`}>
        <div className="result-emoji">🎉</div>
        <h2 className="result-name">{pick.name}</h2>
        <div className="result-tags">
          <span className="result-tag">{pick.cuisine}</span>
          <span className="result-tag">{pick.dining === 'in' ? '🏠 In' : pick.dining === 'out' ? '🍴 Out' : '🏠🍴 Either'}</span>
          <span className="result-tag">{pick.weather.map(w => {
            if (w === 'hot') return '☀️'
            if (w === 'mild') return '🌤️'
            if (w === 'cold') return '❄️'
            if (w === 'rainy') return '🌧️'
            return w
          }).join(' ')}</span>
        </div>
      </div>

      {allMatches.length > 1 && (
        <p className="result-alt">
          {allMatches.length - 1} other option{allMatches.length - 1 !== 1 ? 's' : ''} matched too
        </p>
      )}

      <div className="result-actions">
        <button className="pick-btn" onClick={onRespin}>
          🎲 Spin again
        </button>
        <button className="pick-btn secondary" onClick={onBack}>
          ← Change filters
        </button>
      </div>
    </div>
  )
}

export default Result
