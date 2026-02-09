import React from "react";

interface Props {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface State {
  isError: boolean;
  error: Error | null;
}

class ErrorBoundry extends React.Component<Props, State> {
  state: State = { isError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return {
      isError: true,
      error,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.log("error caught", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
