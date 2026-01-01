import { Component, type ReactNode } from "react";
import { clsx } from "clsx";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgb(var(--bg-0))]">
          <div className="max-w-md mx-auto px-6 text-center">
            <div className="glass rounded-lg border border-white/10 p-8 backdrop-blur-xl">
              <h1 className="text-2xl font-bold text-[rgb(var(--fg-0))] mb-4">
                Something went wrong
              </h1>
              <p className="text-[rgb(var(--fg-1))] mb-6">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className={clsx(
                  "px-6 py-3 rounded-lg transition-all",
                  "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20",
                  "text-[rgb(var(--fg-0))] font-medium",
                  "focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-transparent"
                )}
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

