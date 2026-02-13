
export interface ExplanationItem {
  line: number;
  explain: string;
}

export const FILE_INTRO_EN = `
# GPT-from-Scratch: Algorithm Overview

This file represents the **ultimate minimal implementation** of a Generative Pre-trained Transformer (GPT). Written in pure, dependency-free Python, it provides a transparent look into how modern AI works from the ground up.

### Key Components
1. **The Autograd Engine (\`Value\` class)**:
   A scalar-level automatic differentiation engine that implements the backpropagation algorithm. It builds a computation graph dynamically.
2. **Character Tokenizer**:
   A simple mapping between characters and integers, turning text into a language the neural network can process.
3. **The Transformer Architecture**:
   Implements Multi-head Self-Attention, RMS Normalization, and Residual Connections—the building blocks of models like GPT-4.
4. **Adam Optimizer**:
   A custom implementation of the Adam optimization algorithm to update model weights based on calculated gradients.

### How to use this Explorer
- **Click any line** on the left to see exactly what that specific piece of code does.
- **Search** for specific terms like "Attention" or "Loss" to find relevant logic.
- **Switch Languages** at the top to view explanations in Chinese or English.
`;

export const EXPLANATIONS_EN: ExplanationItem[] = [
  { "line": 1, "explain": "**Docstring Start**: A multi-line string that documents the purpose of this program. This is the most atomic (minimal) way to implement GPT training and inference in pure Python without any external dependencies." },
  { "line": 9, "explain": "**Import \`os\` module**: The \`os\` module provides operating system interface functions. Here we specifically use \`os.path.exists()\` to check if files exist on the filesystem." },
  { "line": 10, "explain": "**Import \`math\` module**: The \`math\` module provides mathematical functions. We use \`math.log()\` for natural logarithm and \`math.exp()\` for exponential function in neural network calculations." },
  { "line": 11, "explain": "**Import \`random\` module**: The \`random\` module generates pseudo-random numbers. We use \`random.seed()\` for reproducibility, \`random.gauss()\` for normal distribution sampling, \`random.shuffle()\` for randomizing data, and \`random.choices()\` for weighted sampling." },
  { "line": 14, "explain": "**Set random seed**: \`random.seed(42)\` ensures reproducible results across different runs by fixing the pseudo-random number generator's starting state. The number 42 is arbitrary but commonly used." },
  { "line": 17, "explain": "**Check input file existence**: \`os.path.exists('input.txt')\` returns \`True\` if the file exists, \`False\` otherwise. This prevents errors when trying to read a non-existent file." },
  { "line": 18, "explain": "**Import urllib.request**: This is Python's built-in HTTP client library for downloading files from URLs. We import it only when needed (lazy import)." },
  { "line": 19, "explain": "**Define data URL**: Store the URL to Andrej Karpathy's name dataset. This is a text file containing thousands of names, one per line." },
  { "line": 20, "explain": "**Download dataset**: \`urllib.request.urlretrieve(url, filename)\` downloads the file from the URL and saves it locally as 'input.txt'." },
  { "line": 21, "explain": "**Parse documents**: Complex list comprehension that: 1) Opens and reads 'input.txt', 2) Strips whitespace with \`.strip()\`, 3) Splits on newlines with \`.split('\\\\n')\`, 4) Filters out empty lines with \`if l.strip()\`, 5) Creates a list where each element is a cleaned document string." },
  { "line": 22, "explain": "**Shuffle documents**: \`random.shuffle(docs)\` randomly reorders the list in-place. This ensures training examples are seen in random order, which improves neural network training." },
  { "line": 35, "explain": "**Value class definition**: This is the core of our automatic differentiation (autograd) system. It wraps scalar values and tracks gradients for backpropagation, similar to PyTorch tensors but simpler." },
  { "line": 151, "explain": "**GPT forward function**: The main model function that processes one token at a time, updating the key-value cache for attention." }
];
