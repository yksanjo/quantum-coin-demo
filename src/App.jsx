import React, { useState } from 'react';
import { Coins, Zap, Eye } from 'lucide-react';
import { QuantumSimulator } from './utils/quantumSimulator';

function App() {
  const [classicalResult, setClassicalResult] = useState(null);
  const [quantumState, setQuantumState] = useState(null);
  const [isMeasured, setIsMeasured] = useState(false);
  const [simulator] = useState(() => new QuantumSimulator());

  const flipClassical = () => {
    const result = Math.random() < 0.5 ? 'H' : 'T';
    setClassicalResult(result);
  };

  const flipQuantum = () => {
    simulator.reset();
    simulator.hadamard(); // Create superposition
    setIsMeasured(false);
    setQuantumState({
      prob0: simulator.getProbability0(),
      prob1: simulator.getProbability1(),
      state: simulator.getStateString()
    });
  };

  const measureQuantum = () => {
    const result = simulator.measure();
    setIsMeasured(true);
    setQuantumState({
      prob0: simulator.getProbability0(),
      prob1: simulator.getProbability1(),
      result: result === 0 ? 'H' : 'T',
      state: simulator.getStateString()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl">⚛️</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Quantum Coin Demo</h1>
          </div>
          <p className="text-lg text-gray-600">
            Experience quantum superposition - heads AND tails simultaneously!
          </p>
        </header>

        {/* Main Demo */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Coins className="w-8 h-8 text-quantum-purple" />
            <h2 className="text-2xl font-bold text-gray-800">Quantum Coin vs Classical Coin</h2>
          </div>

          <p className="text-gray-600 mb-8 text-lg">
            A classical coin is always heads <strong>OR</strong> tails. 
            A quantum coin is heads <strong>AND</strong> tails until you measure it!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Classical Coin */}
            <div className="border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">Classical Coin</h3>
              <div className="flex flex-col items-center justify-center min-h-[200px]">
                {classicalResult ? (
                  <div className="text-6xl font-bold text-gray-800 animate-collapse">
                    {classicalResult}
                  </div>
                ) : (
                  <div className="text-gray-400 text-4xl">?</div>
                )}
              </div>
              <button
                onClick={flipClassical}
                className="w-full mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Flip Classical Coin
              </button>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Always heads OR tails
              </p>
            </div>

            {/* Quantum Coin */}
            <div className="border-2 border-quantum-purple rounded-lg p-6 bg-gradient-to-br from-purple-50 to-pink-50">
              <h3 className="text-xl font-semibold mb-4 text-quantum-purple">Quantum Coin</h3>
              <div className="flex flex-col items-center justify-center min-h-[200px]">
                {quantumState ? (
                  <>
                    {isMeasured ? (
                      <div className="text-6xl font-bold text-quantum-purple animate-collapse">
                        {quantumState.result}
                      </div>
                    ) : (
                      <>
                        <div className="text-4xl mb-4 animate-pulse-quantum">⚛️</div>
                        <div className="w-full max-w-xs space-y-2">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Heads (|0⟩)</span>
                            <span>{(quantumState.prob0 * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                              className="bg-quantum-purple h-4 rounded-full transition-all duration-500"
                              style={{ width: `${quantumState.prob0 * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>Tails (|1⟩)</span>
                            <span>{(quantumState.prob1 * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                              className="bg-quantum-pink h-4 rounded-full transition-all duration-500"
                              style={{ width: `${quantumState.prob1 * 100}%` }}
                            />
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-4 text-center">
                          {quantumState.state}
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-gray-400 text-4xl">?</div>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={flipQuantum}
                  className="flex-1 bg-quantum-purple hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Create Superposition
                </button>
                {quantumState && !isMeasured && (
                  <button
                    onClick={measureQuantum}
                    className="flex-1 bg-quantum-pink hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Measure
                  </button>
                )}
              </div>
              <p className="text-sm text-quantum-purple mt-2 text-center font-medium">
                {isMeasured ? 'Collapsed to a single state!' : 'In superposition - both states exist!'}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <p className="text-blue-800 text-sm">
              <strong>💡 Wow Moment:</strong> The quantum coin isn't undecided — it's genuinely in both states simultaneously until measurement collapses it to one!
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 text-gray-600 text-sm">
          <p>Made with ⚛️ for curious minds | Part of the Quantum Computing Demos series</p>
        </footer>
      </div>
    </div>
  );
}

export default App;


