import { useState } from 'react';
import Modal from './Modal';
import { CareerTool, generateInputsForTool } from '@/lib/ai-tools';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface FeatureModalProps {
  tool: CareerTool | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FeatureModal({ tool, isOpen, onClose }: FeatureModalProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  if (!tool) return null;

  const toolInputs = generateInputsForTool(tool.id);

  const handleInputChange = (id: string, value: string) => {
    setInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setResult('');

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId: tool.id, inputs }),
      });

      const data = await response.json();
      setResult(data.result || 'Failed to generate response');
    } catch (error) {
      setResult('Error generating response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={tool.name}>
      <p className="text-gray-300 mb-6">{tool.description}</p>
      
      <div className="space-y-4">
        {toolInputs.map((input) => (
          <div key={input.id}>
            {input.type === 'textarea' ? (
              <textarea
                id={`tool-input-${input.id}`}
                className="w-full bg-white/10 p-3 rounded-lg border border-white/20 h-24 text-white placeholder-gray-400"
                placeholder={input.placeholder}
                value={inputs[input.id] || ''}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
              />
            ) : input.type === 'select' ? (
              <select
                id={`tool-input-${input.id}`}
                className="w-full bg-white/10 p-3 rounded-lg border border-white/20 text-white"
                value={inputs[input.id] || ''}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
              >
                <option value="">{input.placeholder}</option>
                {input.options?.map((opt) => (
                  <option key={opt} value={opt} className="bg-gray-800">
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`tool-input-${input.id}`}
                type={input.type}
                placeholder={input.placeholder}
                className="w-full bg-white/10 p-3 rounded-lg border border-white/20 text-white placeholder-gray-400"
                value={inputs[input.id] || ''}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full mt-6 bg-linear-to-r from-[#7c79c6] to-[#00f5d4] text-white font-bold py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Generating AI Response...
          </>
        ) : (
          '✨ Generate AI Response'
        )}
      </button>

      {result && (
        <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-white/10 min-h-[150px]">
          <div className="prose prose-invert max-w-none prose-lg prose-p:my-4 prose-headings:my-6 prose-ul:my-4 prose-li:my-2 prose-blockquote:my-4 prose-strong:text-white">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
          </div>
        </div>
      )}
    </Modal>
  );
}

