
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Search, BrainCircuit, ChevronRight, Info, Languages, BookOpen } from 'lucide-react';
import { marked } from 'marked';
import { RAW_PYTHON_CODE } from './source_code';
import { EXPLANATIONS_EN, FILE_INTRO_EN } from './explanations_en';
import { EXPLANATIONS_CN, FILE_INTRO_CN } from './explanations_cn';
import { CodeLine } from './types';

type Language = 'en' | 'cn';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const explanationRef = useRef<HTMLDivElement>(null);

  // Mapping for dynamic data loading
  const currentExplanations = useMemo(() => {
    return language === 'en' ? EXPLANATIONS_EN : EXPLANATIONS_CN;
  }, [language]);

  const currentIntro = useMemo(() => {
    return language === 'en' ? FILE_INTRO_EN : FILE_INTRO_CN;
  }, [language]);

  const subtitle = useMemo(() => {
    return language === 'en' 
      ? "The most atomic way to train and inference a GPT in pure, dependency-free Python"
      : "使用纯 Python、零依赖实现 GPT 训练与推理的最原子化方式";
  }, [language]);

  // Process and merge source code with the currently selected language explanations
  const codeLines: CodeLine[] = useMemo(() => {
    const rawLines = RAW_PYTHON_CODE.split('\n');
    return rawLines.map((content, i) => {
      const lineNum = i + 1;
      const expObj = currentExplanations.find(item => item.line === lineNum);
      
      return {
        lineNumber: lineNum,
        content: content,
        explanation: expObj ? expObj.explain : (language === 'en' ? "*No specific explanation for this line.*" : "*此行暂无详细解释。*"),
        category: content.trim().startsWith('def ') ? 'function' : 
                  content.trim().startsWith('import ') || content.trim().startsWith('from ') ? 'import' : 
                  content.trim().startsWith('#') || content.trim().startsWith('"""') ? 'comment' : 
                  content.trim().startsWith('class ') ? 'function' : 'logic'
      };
    });
  }, [currentExplanations, language]);

  const filteredCode = useMemo(() => {
    if (!searchQuery) return codeLines;
    const q = searchQuery.toLowerCase();
    return codeLines.filter(line => 
      line.content.toLowerCase().includes(q) ||
      line.explanation.toLowerCase().includes(q)
    );
  }, [searchQuery, codeLines]);

  const handleLineClick = useCallback((index: number) => {
    setSelectedIdx(index);
    // On mobile, scroll to the explanation
    if (window.innerWidth < 768 && explanationRef.current) {
      explanationRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const selectedLine = (selectedIdx !== null && codeLines[selectedIdx]) ? codeLines[selectedIdx] : null;

  // Memoize markdown conversion
  const renderedContentHtml = useMemo(() => {
    const contentToParse = selectedLine ? selectedLine.explanation : currentIntro;
    return marked.parse(contentToParse) as string;
  }, [selectedLine, currentIntro]);

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Header */}
      <header className="h-16 border-b bg-white flex items-center justify-between px-6 shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 rounded-lg shadow-lg shadow-slate-200">
            <BrainCircuit className="text-white w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tight text-slate-900 leading-none">
              MicroGPT <span className="text-indigo-600">.py</span>
            </h1>
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter truncate max-w-[400px]">
              {subtitle}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder={language === 'en' ? "Search code or docs..." : "搜索代码或文档..."}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button 
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLanguage('cn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'cn' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              中
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden relative flex-col md:flex-row">
        {/* Left Column: Code View */}
        <section className="flex-1 overflow-y-auto bg-[#0f172a] text-slate-300 border-r border-slate-800 relative">
          <div className="sticky top-0 bg-[#0f172a]/95 backdrop-blur-md px-6 py-3 border-b border-slate-800 flex justify-between items-center z-20">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-xs font-mono text-slate-500 tracking-wider uppercase">microGPT.py</span>
            </div>
            <div className="text-[10px] text-slate-600 font-mono italic">
              {language === 'en' ? 'TOTAL' : '总计'} {codeLines.length} {language === 'en' ? 'LINES' : '行'}
            </div>
          </div>
          
          <div className="py-6">
            {filteredCode.map((line) => {
              const actualIdx = line.lineNumber - 1;
              const isSelected = selectedIdx === actualIdx;
              return (
                <div 
                  key={line.lineNumber}
                  onClick={() => handleLineClick(actualIdx)}
                  className={`group flex items-start cursor-pointer transition-all border-l-[3px] ${
                    isSelected 
                      ? 'bg-indigo-500/10 border-indigo-500 text-white' 
                      : 'border-transparent hover:bg-slate-800/30'
                  }`}
                >
                  <div className={`w-14 shrink-0 text-right pr-6 text-[11px] font-mono select-none pt-1.5 ${
                    isSelected ? 'text-indigo-400 font-bold' : 'text-slate-700'
                  }`}>
                    {line.lineNumber}
                  </div>
                  <pre className="flex-1 py-1 code-font text-[13px] leading-relaxed whitespace-pre pr-4 overflow-hidden">
                    {highlightPython(line.content)}
                  </pre>
                  {isSelected && (
                    <div className="pr-4 pt-1.5">
                      <ChevronRight className="w-4 h-4 text-indigo-500" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column: Documentation View */}
        <aside 
          ref={explanationRef}
          className="w-full md:w-[480px] lg:w-[540px] bg-white overflow-y-auto flex flex-col z-10 border-l border-slate-200"
        >
          <div className="p-10 animate-in fade-in slide-in-from-right-4 duration-500">
            {selectedLine ? (
              <>
                <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 bg-indigo-50 rounded-lg text-indigo-700 font-bold uppercase text-[10px] tracking-widest">
                  <Info className="w-3 h-3" />
                  {language === 'en' ? 'Line Reference' : '行参考号'} {selectedLine.lineNumber}
                </div>
                
                <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
                  {selectedLine.category === 'function' ? (language === 'en' ? 'Logic Definition' : '逻辑定义') : 
                   selectedLine.category === 'import' ? (language === 'en' ? 'Dependency' : '外部依赖') : 
                   selectedLine.category === 'comment' ? (language === 'en' ? 'Metadata' : '元数据说明') : 
                   (language === 'en' ? 'Implementation' : '实现细节')}
                </h2>

                <div className="group relative bg-slate-900 rounded-2xl p-6 border border-slate-800 mb-10 shadow-2xl shadow-indigo-100/30 overflow-hidden">
                  <div className="text-[10px] font-mono text-slate-500 mb-4 uppercase tracking-[0.2em]">
                    {language === 'en' ? 'Source Snippet:' : '代码源码:'}
                  </div>
                  <code className="text-emerald-400 font-mono text-sm block leading-relaxed break-all">
                    {selectedLine.content || <span className="opacity-20 italic"># Empty</span>}
                  </code>
                </div>

                <div className="space-y-10">
                  <section>
                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                      {language === 'en' ? 'Detailed Analysis' : '详细解析'}
                      <div className="h-px bg-slate-100 flex-1"></div>
                    </h3>
                    <div 
                      className="markdown-body text-slate-800"
                      dangerouslySetInnerHTML={{ __html: renderedContentHtml }}
                    />
                  </section>
                </div>
              </>
            ) : (
              <div className="animate-in fade-in duration-700">
                <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 bg-indigo-600 rounded-lg text-white font-bold uppercase text-[10px] tracking-widest">
                  <BookOpen className="w-3 h-3" />
                  {language === 'en' ? 'File Overview' : '文件总览'}
                </div>
                <div 
                  className="markdown-body text-slate-800"
                  dangerouslySetInnerHTML={{ __html: renderedContentHtml }}
                />
              </div>
            )}
          </div>
        </aside>
      </main>

      <footer className="h-10 bg-white border-t border-slate-200 px-6 flex items-center justify-between shrink-0 font-mono">
        <div className="flex items-center gap-8 text-[10px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-900 font-bold uppercase tracking-widest">System Online</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-40 font-bold">LOC:</span>
            <span className="text-slate-600">L:{selectedIdx !== null ? selectedIdx + 1 : '--'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="opacity-40 font-bold">LANG:</span>
            <span className="text-slate-900 font-bold">{language.toUpperCase()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function highlightPython(code: string) {
  if (!code) return <>&nbsp;</>;
  const patterns = [
    { type: 'comment', regex: /(#.*|""".*?"""|'''.*?''')/, color: 'text-slate-600 italic opacity-60' },
    { type: 'string', regex: /(["'])(?:(?=(\\?))\2.)*?\1/, color: 'text-amber-300' },
    { type: 'keyword', regex: /\b(def|import|from|return|if|else|elif|for|while|try|except|as|with|None|True|False|print|str|int|float|bool|list|dict|in|is|lambda|class|pass|break|continue|yield|async|await)\b/, color: 'text-indigo-400 font-bold' },
    { type: 'function', regex: /\b[a-zA-Z_][a-zA-Z0-9_]*(?=\()/, color: 'text-emerald-400' },
    { type: 'number', regex: /\b\d+(\.\d*)?\b/, color: 'text-orange-400' },
  ];
  const combinedRegex = new RegExp(`(${patterns.map(p => p.regex.source).join('|')})`, 'g');
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  while ((match = combinedRegex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      result.push(code.substring(lastIndex, match.index));
    }
    const matchedText = match[0];
    const pattern = patterns.find(p => new RegExp(`^${p.regex.source}$`).test(matchedText));
    if (pattern) {
      result.push(<span key={match.index} className={pattern.color}>{matchedText}</span>);
    } else {
      result.push(matchedText);
    }
    lastIndex = combinedRegex.lastIndex;
  }
  if (lastIndex < code.length) {
    result.push(code.substring(lastIndex));
  }
  return <>{result}</>;
}
