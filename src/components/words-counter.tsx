import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

interface Props {
  path?: String;
}


export default function WordsCounter ({ path: _ }: Props): h.JSX.Element {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    alphabets: 0,
    numbers: 0,
    spaces: 0,
    specialChars: 0
  });

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const alphabets = (text.match(/[a-zA-Z]/g) || []).length;
    const numbers = (text.match(/[0-9]/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const specialChars = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    setStats({ words, alphabets, numbers, spaces, specialChars });
  }, [text]);
  
  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h2 className="text-xl font-semibold mb-2">Live Text Statistics</h2>
      <textarea
        rows={6}
        className="w-full p-2 border border-gray-300 rounded mb-3"
        value={text}
        onInput={(e: any) => setText(e.target.value)}
        placeholder="Start typing..."
      />
      <div className="mt-4">
        <p><strong>Word count:</strong> {stats.words}</p>
        <p><strong>Alphabet count:</strong> {stats.alphabets}</p>
        <p><strong>Number count:</strong> {stats.numbers}</p>
        <p><strong>Space count:</strong> {stats.spaces}</p>
        <p><strong>Special character count:</strong> {stats.specialChars}</p>
      </div>
    </div>
  );
};