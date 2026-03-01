import React, { useState } from 'react'

const WEATHER_OPTIONS = [
  { value: 'hot', label: '☀️ Hot', },
  { value: 'mild', label: '🌤️ Mild' },
  { value: 'cold', label: '❄️ Cold' },
  { value: 'rainy', label: '🌧️ Rainy' },
]

const DINING_OPTIONS = [
  { value: 'any', label: '🤷 Either' },
  { value: 'in', label: '🏠 Eating In' },
  { value: 'out', label: '🍴 Going Out' },
]

function Picker({ meals, onPick }) {
  const [weather, setWeather] = useState('')
  const [cuisine, setCuisine] = useState('')
  const [dining, setDining] = useState('any')

  const cuisines = [...new Set(meals.map(m => m.cuisine))].sort()

  const handleSubmit = () => {
    onPick({
      weather: weather || null,
      cuisine: cuisine || null,
      dining,
    })
  }

  return (
    <div className="picker">
      <section className="picker-section">
        <label className="picker-label">What's the weather like?</label>
        <div className="chip-group">
          {WEATHER_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`chip ${weather === opt.value ? 'chip-active' : ''}`}
              onClick={() => setWeather(weather === opt.value ? '' : opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      <section className="picker-section">
        <label className="picker-label">What cuisine sounds good?</label>
        <div className="chip-group">
          <button
            className={`chip ${cuisine === '' ? 'chip-active' : ''}`}
            onClick={() => setCuisine('')}
          >
            🌍 Any
          </button>
          {cuisines.map(c => (
            <button
              key={c}
              className={`chip ${cuisine === c ? 'chip-active' : ''}`}
              onClick={() => setCuisine(cuisine === c ? '' : c)}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="picker-section">
        <label className="picker-label">Eating in or going out?</label>
        <div className="chip-group">
          {DINING_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`chip ${dining === opt.value ? 'chip-active' : ''}`}
              onClick={() => setDining(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      <button className="pick-btn" onClick={handleSubmit}>
        🎲 Bon Appetit!
      </button>
    </div>
  )
}

export default Picker
