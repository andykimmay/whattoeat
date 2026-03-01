import React, { useState } from 'react'

const WEATHER_OPTIONS = ['hot', 'mild', 'cold', 'rainy']
const WEATHER_LABELS = { hot: '☀️ Hot', mild: '🌤️ Mild', cold: '❄️ Cold', rainy: '🌧️ Rainy' }
const DINING_OPTIONS = [
  { value: 'in', label: '🏠 In' },
  { value: 'out', label: '🍴 Out' },
  { value: 'both', label: '🏠🍴 Both' },
]

function MealForm({ meal, onSave, onCancel }) {
  const [name, setName] = useState(meal?.name || '')
  const [cuisine, setCuisine] = useState(meal?.cuisine || '')
  const [weather, setWeather] = useState(meal?.weather || [])
  const [dining, setDining] = useState(meal?.dining || 'both')

  const toggleWeather = (w) => {
    setWeather(prev => prev.includes(w) ? prev.filter(x => x !== w) : [...prev, w])
  }

  const handleSave = () => {
    if (!name.trim() || !cuisine.trim() || weather.length === 0) return
    onSave({
      ...(meal || {}),
      name: name.trim(),
      cuisine: cuisine.trim(),
      weather,
      dining,
    })
  }

  return (
    <div className="meal-form">
      <div className="form-field">
        <label>Meal name</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="e.g. Chicken Tikka Masala"
          autoFocus
        />
      </div>

      <div className="form-field">
        <label>Cuisine</label>
        <input
          type="text"
          value={cuisine}
          onChange={e => setCuisine(e.target.value)}
          placeholder="e.g. Indian"
        />
      </div>

      <div className="form-field">
        <label>Good weather for this?</label>
        <div className="chip-group compact">
          {WEATHER_OPTIONS.map(w => (
            <button
              key={w}
              className={`chip small ${weather.includes(w) ? 'chip-active' : ''}`}
              onClick={() => toggleWeather(w)}
            >
              {WEATHER_LABELS[w]}
            </button>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label>Dining</label>
        <div className="chip-group compact">
          {DINING_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`chip small ${dining === opt.value ? 'chip-active' : ''}`}
              onClick={() => setDining(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button className="pick-btn small-btn" onClick={handleSave}>
          {meal ? '✓ Save' : '+ Add Meal'}
        </button>
        <button className="pick-btn secondary small-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}

function Manage({ meals, onAdd, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null) // null | 'new' | meal id
  const [search, setSearch] = useState('')

  const filtered = meals.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.cuisine.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = (mealData) => {
    if (editing === 'new') {
      onAdd(mealData)
    } else {
      onUpdate(mealData)
    }
    setEditing(null)
  }

  return (
    <div className="manage">
      <div className="manage-top">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search meals..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button
          className="pick-btn small-btn"
          onClick={() => setEditing('new')}
        >
          + Add
        </button>
      </div>

      {editing === 'new' && (
        <MealForm
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      <div className="meal-list">
        {filtered.map(meal => (
          <div key={meal.id} className="meal-item">
            {editing === meal.id ? (
              <MealForm
                meal={meal}
                onSave={handleSave}
                onCancel={() => setEditing(null)}
              />
            ) : (
              <div className="meal-row">
                <div className="meal-info">
                  <span className="meal-name">{meal.name}</span>
                  <span className="meal-meta">
                    {meal.cuisine} · {meal.dining === 'in' ? '🏠' : meal.dining === 'out' ? '🍴' : '🏠🍴'} · {meal.weather.map(w => WEATHER_LABELS[w]?.charAt(0) || w).join(' ')}
                  </span>
                </div>
                <div className="meal-actions">
                  <button className="icon-btn" onClick={() => setEditing(meal.id)}>✏️</button>
                  <button className="icon-btn" onClick={() => {
                    if (window.confirm(`Delete "${meal.name}"?`)) onDelete(meal.id)
                  }}>🗑️</button>
                </div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="empty-state">No meals found. Add some!</p>
        )}
      </div>
    </div>
  )
}

export default Manage
