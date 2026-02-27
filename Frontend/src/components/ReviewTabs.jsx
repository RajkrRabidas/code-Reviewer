import ReviewResults from './ReviewResults'

export default function ReviewTabs({ review, activeTab, setActiveTab }) {
  const tabs = [
    { id: 'issues', label: 'Issues', count: review?.issues?.length || 0 },
    { id: 'suggestions', label: 'Suggestions', count: review?.suggestions?.length || 0 },
    { id: 'summary', label: 'Summary' }
  ]

  return (
    <div className="flex flex-col h-full bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-700 bg-slate-700/30">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-400 bg-slate-700/50'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-slate-600 rounded-full text-xs">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">
        <ReviewResults 
          review={review} 
          activeTab={activeTab}
        />
      </div>
    </div>
  )
}
