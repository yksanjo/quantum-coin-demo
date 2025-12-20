/**
 * Simple quantum simulator for educational demos
 * Simulates quantum states and operations without requiring actual quantum hardware
 */

// Quantum state representation: [amplitude_for_0, amplitude_for_1]
// |ψ⟩ = α|0⟩ + β|1⟩ where |α|² + |β|² = 1

export class QuantumSimulator {
  constructor() {
    this.reset();
  }

  reset() {
    // Initialize to |0⟩ state
    this.state = [1, 0];
  }

  // Apply Hadamard gate (creates superposition)
  hadamard() {
    const [a, b] = this.state;
    this.state = [
      (a + b) / Math.sqrt(2),
      (a - b) / Math.sqrt(2)
    ];
  }

  // Apply Pauli-X gate (bit flip)
  pauliX() {
    const [a, b] = this.state;
    this.state = [b, a];
  }

  // Apply Pauli-Z gate (phase flip)
  pauliZ() {
    const [a, b] = this.state;
    this.state = [a, -b];
  }

  // Measure the qubit (collapses to |0⟩ or |1⟩)
  measure() {
    const prob0 = Math.abs(this.state[0]) ** 2;
    const result = Math.random() < prob0 ? 0 : 1;
    
    // Collapse the state
    if (result === 0) {
      this.state = [1, 0];
    } else {
      this.state = [0, 1];
    }
    
    return result;
  }

  // Get probability of measuring |0⟩
  getProbability0() {
    return Math.abs(this.state[0]) ** 2;
  }

  // Get probability of measuring |1⟩
  getProbability1() {
    return Math.abs(this.state[1]) ** 2;
  }

  // Get current state as string
  getStateString() {
    const prob0 = this.getProbability0();
    const prob1 = this.getProbability1();
    return `${(prob0 * 100).toFixed(1)}% |0⟩, ${(prob1 * 100).toFixed(1)}% |1⟩`;
  }
}

// Entangled pair simulator
export class EntangledPair {
  constructor() {
    this.reset();
  }

  reset() {
    // Create Bell state |Φ⁺⟩ = (|00⟩ + |11⟩) / √2
    this.state = {
      '00': 1 / Math.sqrt(2),
      '01': 0,
      '10': 0,
      '11': 1 / Math.sqrt(2)
    };
    this.measured = false;
    this.measurementA = null;
    this.measurementB = null;
  }

  measureA() {
    if (this.measured) return this.measurementA;
    
    const prob00 = Math.abs(this.state['00']) ** 2;
    const prob11 = Math.abs(this.state['11']) ** 2;
    const prob0 = prob00 + prob11; // Both |00⟩ and |11⟩ have A=0
    
    this.measurementA = Math.random() < prob0 ? 0 : 1;
    
    // Collapse based on measurement
    if (this.measurementA === 0) {
      this.state = { '00': 1, '01': 0, '10': 0, '11': 0 };
      this.measurementB = 0;
    } else {
      this.state = { '00': 0, '01': 0, '10': 0, '11': 1 };
      this.measurementB = 1;
    }
    
    this.measured = true;
    return this.measurementA;
  }

  measureB() {
    if (this.measured) return this.measurementB;
    return this.measureA(); // Measuring B collapses both
  }

  areCorrelated() {
    return this.measured && this.measurementA === this.measurementB;
  }
}

// Grover's algorithm simulator (simplified)
export class GroverSearch {
  constructor(size = 8) {
    this.size = size;
    this.target = Math.floor(Math.random() * size);
    this.classicalAttempts = 0;
    this.quantumAttempts = 0;
  }

  // Classical search: check each item one by one
  classicalSearch() {
    this.classicalAttempts = 0;
    for (let i = 0; i < this.size; i++) {
      this.classicalAttempts++;
      if (i === this.target) {
        return i;
      }
    }
    return -1;
  }

  // Quantum search: Grover's algorithm (simplified simulation)
  quantumSearch() {
    // Grover's algorithm finds the target in approximately √N iterations
    // For N=8, that's about 2-3 iterations
    const iterations = Math.ceil(Math.sqrt(this.size));
    this.quantumAttempts = iterations;
    
    // Simulate the quantum search
    return this.target;
  }

  setNewTarget() {
    this.target = Math.floor(Math.random() * this.size);
    this.classicalAttempts = 0;
    this.quantumAttempts = 0;
  }

  getTarget() {
    return this.target;
  }
}

// Quantum random number generator
export class QuantumRandom {
  static generateBits(count = 8) {
    const bits = [];
    for (let i = 0; i < count; i++) {
      // Simulate quantum measurement
      bits.push(Math.random() < 0.5 ? 0 : 1);
    }
    return bits;
  }

  static generateNumber(min = 0, max = 100) {
    const range = max - min + 1;
    const bitsNeeded = Math.ceil(Math.log2(range));
    const bits = this.generateBits(bitsNeeded * 2); // Extra bits for better distribution
    
    let value = 0;
    for (let i = 0; i < bitsNeeded; i++) {
      value = (value << 1) | bits[i];
    }
    
    return (value % range) + min;
  }

  static generatePassword(length = 12) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      const index = this.generateNumber(0, chars.length - 1);
      password += chars[index];
    }
    return password;
  }
}


