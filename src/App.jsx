import React, { useState, useEffect } from 'react'
import Picker from './components/Picker.jsx'
import Manage from './components/Manage.jsx'
import Result from './components/Result.jsx'
import './app.css'

const DEFAULT_MEALS = [
  { id: 1, name: 'Tacos', cuisine: 'Mexican', weather: ['hot', 'mild'], dining: 'both' },
  { id: 2, name: 'Pho', cuisine: 'Vietnamese', weather: ['cold', 'rainy'], dining: 'both' },
  { id: 3, name: 'Sushi', cuisine: 'Japanese', weather: ['hot', 'mild', 'cold'], dining: 'out' },
  { id: 4, name: 'Pasta Bolognese', cuisine: 'Italian', weather: ['cold', 'rainy', 'mild'], dining: 'in' },
  { id: 5, name: 'Burgers', cuisine: 'American', weather: ['hot', 'mild'], dining: 'both' },
  { id: 6, name: 'Ramen', cuisine: 'Japanese', weather: ['cold', 'rainy'], dining: 'both' },
  { id: 7, name: 'Pizza', cuisine: 'Italian', weather: ['hot', 'mild', 'cold', 'rainy'], dining: 'both' },
  { id: 8, name: 'Pad Thai', cuisine: 'Thai', weather: ['hot', 'mild'], dining: 'both' },
  { id: 9, name: 'Soup & Sandwich', cuisine: 'American', weather: ['cold', 'rainy'], dining: 'in' },
  { id: 10, name: 'Grilled Chicken Salad', cuisine: 'American', weather: ['hot', 'mild'], dining: 'in' },
  { id: 11, name: 'Indian Curry', cuisine: 'Indian', weather: ['cold', 'rainy', 'mild'], dining: 'both' },
  { id: 12, name: 'Fish & Chips', cuisine: 'British', weather: ['cold', 'rainy', 'mild'], dining: 'out' },
  { id: 13, name: 'Bibimbap', cuisine: 'Korean', weather: ['hot', 'mild', 'cold'], dining: 'both' },
  { id: 14, name: 'Steak', cuisine: 'American', weather: ['cold', 'mild'], dining: 'both' },
  { id: 15, name: 'Falafel Wrap', cuisine: 'Mediterranean', weather: ['hot', 'mild'], dining: 'both' },
]

function App() {
  const [screen, setScreen] = useState('picker')
  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem('whattoeat-meals')
    return saved ? JSON.parse(saved) : DEFAULT_MEALS
  })
  const [result, setResult] = useState(null)
  const [lastFilters, setLastFilters] = useState(null)

  useEffect(() => {
    localStorage.setItem('whattoeat-meals', JSON.stringify(meals))
  }, [meals])

  const handlePick = (filters) => {
    let filtered = [...meals]

    if (filters.weather) {
      filtered = filtered.filter(m => m.weather.includes(filters.weather))
    }
    if (filters.cuisine) {
      filtered = filtered.filter(m => m.cuisine === filters.cuisine)
    }
    if (filters.dining && filters.dining !== 'any') {
      filtered = filtered.filter(m => m.dining === 'both' || m.dining === filters.dining)
    }

    setLastFilters(filters)

    if (filtered.length === 0) {
      setResult(null)
    } else {
      const pick = filtered[Math.floor(Math.random() * filtered.length)]
      setResult({ pick, allMatches: filtered })
    }
    setScreen('result')
  }

  const handleAddMeal = (meal) => {
    setMeals(prev => [...prev, { ...meal, id: Date.now() }])
  }

  const handleUpdateMeal = (updated) => {
    setMeals(prev => prev.map(m => m.id === updated.id ? updated : m))
  }

  const handleDeleteMeal = (id) => {
    setMeals(prev => prev.filter(m => m.id !== id))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 onClick={() => setScreen('picker')}>🍽️ WhatToEat</h1>
        <button
          className="header-btn"
          onClick={() => setScreen(screen === 'manage' ? 'picker' : 'manage')}
        >
          {screen === 'manage' ? '← Back' : '⚙️ Meals'}
        </button>
      </header>

      <main className="app-main">
        {screen === 'picker' && (
          <Picker meals={meals} onPick={handlePick} />
        )}
        {screen === 'result' && (
          <Result
            result={result}
            onBack={() => setScreen('picker')}
            onRespin={() => handlePick(lastFilters)}
          />
        )}
        {screen === 'manage' && (
          <Manage
            meals={meals}
            onAdd={handleAddMeal}
            onUpdate={handleUpdateMeal}
            onDelete={handleDeleteMeal}
          />
        )}
      </main>
    </div>
  )
}

export default App
