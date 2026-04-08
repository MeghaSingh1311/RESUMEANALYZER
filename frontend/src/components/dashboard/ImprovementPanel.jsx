import React, { useState } from 'react';
import { getPriorityBadgeColor } from '../../utils/scoreColors';
import { Sparkles, MessageSquare, Copy, Check, Hash, Lightbulb } from 'lucide-react';

const ActionCard = ({ action }) => {
  const [copied, setCopied] = useState(false);
  const badgeClass = getPriorityBadgeColor(action.priority);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm space-y-3">
      <div className="flex justify-between items-start">
        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${badgeClass}`}>
          {action.priority} Priority
        </span>
      </div>
      
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-gray-900 leading-tight">{action.action}</h4>
        <p className="text-xs text-gray-500 italic">{action.reason}</p>
      </div>

      {action.example_rewrite && (
        <div className="mt-4 bg-indigo-50/50 rounded-lg p-4 border border-indigo-100 relative group">
          <div className="flex items-center space-x-1.5 mb-2">
            <Sparkles className="w-3 h-3 text-indigo-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">Suggested Rewrite</span>
          </div>
          <p className="text-xs text-gray-700 leading-relaxed font-medium">
            "{action.example_rewrite}"
          </p>
          <button
            onClick={() => handleCopy(action.example_rewrite)}
            className="absolute top-3 right-3 p-1.5 bg-white rounded-md shadow-sm border border-gray-200 opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-50"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-gray-400" />}
          </button>
        </div>
      )}
    </div>
  );
};

const ImprovementPanel = ({ result }) => {
  const { improvement_plan } = result;
  const { priority_actions, keywords_to_add } = improvement_plan;
  const [activeTab, setActiveTab] = useState('Skills');

  const tabs = ['Skills', 'Summary', 'Experience', 'Projects', 'Formatting', 'Keywords'];

  const filteredActions = priority_actions?.filter(action => action.section === activeTab) || [];
  const displayActions = filteredActions.length > 0 ? filteredActions : [
    {
      priority: 'Low',
      section: activeTab,
      action: `No targeted actions were generated for ${activeTab} yet. Review the other tabs for full resume recommendations.`,
      reason: 'Your resume is currently well aligned with this section or no section-specific action was detected.',
      example_rewrite: ''
    }
  ];

  return (
    <div className="glass-panel overflow-hidden">
      <div className="p-6 border-b border-white/20 bg-white/30">
        <div className="flex items-center space-x-2 mb-1">
          <Lightbulb className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-bold text-gray-900">Improvement Plan</h3>
        </div>
        <p className="text-sm text-gray-500">Targeted actions to increase your score and shortlist chances.</p>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-2 border-b border-white/20 flex overflow-x-auto custom-scrollbar bg-white/20">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap border-b-2 transition-all duration-200 ${
              activeTab === tab 
                ? 'border-indigo-600 text-indigo-600 bg-white/40' 
                : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-white/20'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'Keywords' ? (
          <div className="space-y-6">
            <div className="bg-indigo-50/50 rounded-xl p-5 border border-indigo-100">
              <h4 className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-4 flex items-center">
                <Hash className="w-3.5 h-3.5 mr-1.5" />
                Missing Strategic Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {keywords_to_add?.length > 0 ? (
                  keywords_to_add.map((kw, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1.5 bg-white border border-indigo-100 rounded-lg text-xs font-medium text-indigo-700 shadow-sm hover:shadow transition-shadow cursor-pointer flex items-center group"
                      onClick={() => navigator.clipboard.writeText(kw)}
                    >
                      {kw}
                      <Copy className="w-2.5 h-2.5 ml-2 text-indigo-200 group-hover:text-indigo-400" />
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-indigo-400 font-medium italic">No additional keywords recommended.</p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              {displayActions.map((action, idx) => (
                <ActionCard key={idx} action={action} />
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 min-h-[300px]">
            {displayActions.map((action, idx) => (
              <ActionCard key={idx} action={action} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImprovementPanel;
