import { useState } from 'react'
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-csharp"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import axios from 'axios'
import CodeInput from './CodeInput'
import ReviewResults from './ReviewResults'
import ReviewTabs from './ReviewTabs'
import '../App.css'

export default function CodeReviewUI() {
  const [code, setCode] = useState('// Paste your code here\nfunction example() {\n  return "Hello";\n}')
  const [language, setLanguage] = useState('javascript')
  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('issues')

  const handleReview = async () => {
    if (!code.trim()) {
      setError('Please enter some code to review')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.post('http://localhost:5000/api/review', {
        code,
        language
      })
      setReview(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to review code. Make sure the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setCode('')
    setReview(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 pl-6">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Code Reviewer AI</h1>
                <p className="text-sm text-slate-400">Intelligent code analysis powered by AI</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-slate-400 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                Ready
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main max-w-6xl mx-auto px-6 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-300 flex items-start gap-3">
            <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-auto">
          {/* Input Section */}
          <CodeInput 
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            onReview={handleReview}
            onClear={handleClear}
            loading={loading}
          />

          {/* Results Section */}
          <div className="flex flex-col h-[70vh]">
            {!review ? (
              <div className="flex-1 bg-slate-800 rounded-lg border border-slate-700 p-8 flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0m-9 5h.01M15.89 11.586a1 1 0 10-1.414-1.414l-4.158 4.159a1 1 0 001.414 1.414l4.158-4.159z" />
                </svg>
                <h3 className="text-lg font-semibold text-slate-300 mb-2">Ready to review</h3>
                <p className="text-slate-400 text-center text-sm max-w-xs">
                  Paste your code on the left and click "Review Code" to get AI-powered analysis and suggestions.
                </p>
              </div>
            ) : (
              <ReviewTabs 
                review={review}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
