import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-gray-900 text-white p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <div className="bg-red-900/50 p-4 rounded-lg mb-4 overflow-auto">
              <p className="font-mono text-sm">
                {this.state.error?.toString()}
              </p>
              <details className="mt-2">
                <summary className="text-sm cursor-pointer">Component Stack</summary>
                <pre className="mt-2 p-2 bg-black/50 rounded text-xs overflow-auto">
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
