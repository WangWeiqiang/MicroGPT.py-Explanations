
export interface CodeLine {
  lineNumber: number;
  content: string;
  explanation: string;
  category?: 'import' | 'function' | 'logic' | 'comment' | 'return';
}

export interface AppState {
  selectedLineIndex: number | null;
  searchQuery: string;
  isAutoScrollEnabled: boolean;
}
