import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"

const SeverityBadge = ({ severity }) => {
  const styles = {
    error: 'bg-red-900/20 text-red-300 border border-red-500/50',
    warning: 'bg-yellow-900/20 text-yellow-300 border border-yellow-500/50',
    info: 'bg-blue-900/20 text-blue-300 border border-blue-500/50'
  }
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-semibold ${styles[severity] || styles.info}`}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  )
}

export default function ReviewResults({ review, activeTab }) {
  if (!review) {
    return (
      <div className="p-8 text-center text-slate-400">
        No review data available
      </div>
    )
  }

  if (activeTab === 'issues') {
    return (
      <div className="divide-y divide-slate-700">
        {review?.issues && review.issues.length > 0 ? (
          review.issues.map((issue, idx) => (
            <IssueCard key={idx} issue={issue} />
          ))
        ) : (
          <div className="p-8 text-center text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">No issues found!</p>
            <p className="text-sm mt-1">Your code looks great.</p>
          </div>
        )}
      </div>
    )
  }

  if (activeTab === 'suggestions') {
    return (
      <div className="divide-y divide-slate-700">
        {review?.suggestions && review.suggestions.length > 0 ? (
          review.suggestions.map((suggestion, idx) => (
            <SuggestionCard key={idx} suggestion={suggestion} />
          ))
        ) : (
          <div className="p-8 text-center text-slate-400">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="font-medium">No suggestions</p>
            <p className="text-sm mt-1">Your code is already optimized.</p>
          </div>
        )}
      </div>
    )
  }

  if (activeTab === 'summary') {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {/* Score */}
          {review?.score && (
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-300">Code Quality Score</h3>
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-blue-400">{review.score}</div>
                  <span className="text-slate-400">/100</span>
                </div>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${review.score}%` }}
                />
              </div>
            </div>
          )}

          {/* Summary Text */}
          {review?.summary && (
            <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Summary</h3>
              <div className="text-sm text-slate-300 leading-relaxed space-y-2">
                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {review.summary}
                </Markdown>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <StatCard 
              label="Issues" 
              value={review?.issues?.length || 0}
              color="red"
            />
            <StatCard 
              label="Suggestions" 
              value={review?.suggestions?.length || 0}
              color="yellow"
            />
            <StatCard 
              label="Lines" 
              value={review?.lineCount || 0}
              color="blue"
            />
          </div>
        </div>
      </div>
    )
  }

  return null
}

function IssueCard({ issue }) {
  return (
    <div className="p-4 hover:bg-slate-700/30 transition-colors">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-slate-200 text-sm">{issue.title}</h4>
            <SeverityBadge severity={issue.severity || 'error'} />
          </div>
          <p className="text-sm text-slate-400 mb-2">{issue.description}</p>
          {issue.line && (
            <p className="text-xs text-slate-500">Line: {issue.line}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function SuggestionCard({ suggestion }) {
  return (
    <div className="p-4 hover:bg-slate-700/30 transition-colors">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
        </svg>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-200 text-sm mb-1">{suggestion.title}</h4>
          <p className="text-sm text-slate-400 mb-2">{suggestion.description}</p>
          {suggestion.example && (
            <div className="mt-2 p-2 bg-slate-900/50 rounded border border-slate-600 text-xs text-slate-300 font-mono">
              {suggestion.example}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, color }) {
  const colorStyles = {
    red: 'bg-red-900/20 border-red-500/50 text-red-300',
    yellow: 'bg-yellow-900/20 border-yellow-500/50 text-yellow-300',
    blue: 'bg-blue-900/20 border-blue-500/50 text-blue-300'
  }

  return (
    <div className={`p-3 rounded-lg border ${colorStyles[color]}`}>
      <p className="text-xs opacity-75 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
