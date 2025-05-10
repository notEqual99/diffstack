import { h } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';

interface Difference {
  lineNumber: number;
  text1: string;
  text2: string;
}

interface Props {
  path?: string;
}

export default function DiffCheck({ path: _ }: Props): h.JSX.Element {
  const [text1, setText1] = useState<string>('');
  const [text2, setText2] = useState<string>('');
  const [differences, setDifferences] = useState<Difference[]>([]);
  const [compared, setCompared] = useState<boolean>(false);
  const textArea1Ref = useRef<HTMLTextAreaElement>(null);
  const textArea2Ref = useRef<HTMLTextAreaElement>(null);
  const lineNumbers1Ref = useRef<HTMLDivElement>(null);
  const lineNumbers2Ref = useRef<HTMLDivElement>(null);
  const updateLineNumbers = (textArea: HTMLTextAreaElement | null, lineNumbersDiv: HTMLDivElement | null): void => {
    if (!textArea || !lineNumbersDiv) return;
    
    const lineCount = textArea.value.split('\n').length;
    const lineNumbersContent = Array.from({ length: lineCount }, (_, i) => i + 1)
      .map(num => `<div class="line-number-item">${num}</div>`)
      .join('');
    
    lineNumbersDiv.innerHTML = lineNumbersContent;

    lineNumbersDiv.scrollTop = textArea.scrollTop;
  };

  useEffect(() => {
    updateLineNumbers(textArea1Ref.current, lineNumbers1Ref.current);
  }, [text1]);
  
  useEffect(() => {
    updateLineNumbers(textArea2Ref.current, lineNumbers2Ref.current);
  }, [text2]);

  const handleScroll = (textArea: HTMLTextAreaElement | null, lineNumbersDiv: HTMLDivElement | null): void => {
    if (!textArea || !lineNumbersDiv) return;
    lineNumbersDiv.scrollTop = textArea.scrollTop;
  };

  useEffect(() => {
    const updateLineNumbersHeight = () => {
      if (textArea1Ref.current && lineNumbers1Ref.current) {
        lineNumbers1Ref.current.style.height = `${textArea1Ref.current.offsetHeight}px`;
      }
      
      if (textArea2Ref.current && lineNumbers2Ref.current) {
        lineNumbers2Ref.current.style.height = `${textArea2Ref.current.offsetHeight}px`;
      }
    };

    updateLineNumbersHeight();

    const resizeObserver = new ResizeObserver(updateLineNumbersHeight);

    if (textArea1Ref.current) {
      resizeObserver.observe(textArea1Ref.current);
    }

    if (textArea2Ref.current) {
      resizeObserver.observe(textArea2Ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  
  const compareTexts = (): void => {
    const result: Difference[] = [];
    const lines1: string[] = text1.split('\n');
    const lines2: string[] = text2.split('\n');
    
    const maxLines: number = Math.max(lines1.length, lines2.length);
    
    for (let i = 0; i < maxLines; i++) {
      const line1: string = i < lines1.length ? lines1[i] : '';
      const line2: string = i < lines2.length ? lines2[i] : '';
      
      if (line1 !== line2) {
        result.push({
          lineNumber: i + 1,
          text1: line1,
          text2: line2
        });
      }
    }
    
    setDifferences(result);
    setCompared(true);
  };

  return (
    <div className="compare-ctn mx-auto">
      <h1 className="text-center mb-6">Text Comparison Tool</h1>
      
      <div className="flex flex-row gap-4 mb-4 w-full">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Text 1</label>
          <div className="flex relative border border-gray-300 rounded">
            <div 
              ref={lineNumbers1Ref} 
              className="line-numbers-container bg-gray-100 text-gray-600 py-2 px-2 text-right select-none overflow-hidden"
            >
              <div className="line-number-item">1</div>
            </div>
            <textarea
              ref={textArea1Ref}
              className="w-full p-2 border-l border-gray-300 focus:outline-none"
              value={text1}
              onInput={(e) => setText1((e.target as HTMLTextAreaElement).value)}
              onScroll={() => handleScroll(textArea1Ref.current, lineNumbers1Ref.current)}
              placeholder="Paste first text here..."
            />
          </div>
        </div>
        
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-1">Text 2</label>
          <div className="flex relative border border-gray-300 rounded">
            <div 
              ref={lineNumbers2Ref} 
              className="line-numbers-container bg-gray-100 text-gray-600 py-2 px-2 text-right select-none overflow-hidden"
            >
              <div className="line-number-item">1</div>
            </div>
            <textarea
              ref={textArea2Ref}
              className="w-full p-2 border-l border-gray-300 focus:outline-none"
              value={text2}
              onInput={(e) => setText2((e.target as HTMLTextAreaElement).value)}
              onScroll={() => handleScroll(textArea2Ref.current, lineNumbers2Ref.current)}
              placeholder="Paste second text here..."
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <button
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
          onClick={compareTexts}
        >
          Compare Texts
        </button>
      </div>
      
      {compared && (
        <div className="mt-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Comparison Results</h2>
          
          {differences.length === 0 ? (
            <div className="p-4 bg-green-100 text-green-800 rounded">
              The texts are identical!
            </div>
          ) : (
            <div className="border border-gray-300 rounded overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-center w-20 text-dark">Line</th>
                    <th className="py-2 px-4 text-center text-dark">Text 1</th>
                    <th className="py-2 px-4 text-center text-dark">Text 2</th>
                  </tr>
                </thead>
                <tbody>
                  {differences.map((diff, index) => (
                    <tr key={index} className="border-t border-gray-300">
                      <td className="py-2 px-4 text-gray-600 w-20 text-dark">{diff.lineNumber}</td>
                      <td className="py-2 px-4 bg-red-100 text-dark">{diff.text1}</td>
                      <td className="py-2 px-4 bg-green-100 text-dark">{diff.text2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}