import { useState } from 'react'
import { Tabs } from '@consta/uikit/Tabs'
import { CustomersTable } from './components/CustomersTable'
import { LotsTable } from './components/LotsTable'
import './App.css'

const sections = [
  { id: 'customers', label: 'Контрагенты' },
  { id: 'lots', label: 'Лоты' },
]

function App() {
  const [activeSection, setActiveSection] = useState(sections[0])

  return (
    <div className="app">
      <header className="app__header">
        <div className="container">
          <h1>Управление закупками</h1>
          <p>Справочники контрагентов и лотов</p>
        </div>
      </header>

      <main className="container app__main">
        <Tabs
          className="app__tabs"
          items={sections}
          value={activeSection}
          onChange={setActiveSection}
          getItemKey={(item) => item.id}
          view="clear"
        />

        {activeSection.id === 'customers' ? (
          <CustomersTable />
        ) : (
          <LotsTable />
        )}
      </main>
    </div>
  )
}

export default App
