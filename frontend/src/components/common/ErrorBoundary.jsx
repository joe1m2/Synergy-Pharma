import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    this.setState({ info });
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: '#f9f9f9',
          fontFamily: 'monospace'
        }}>
          <div style={{
            background: '#fff',
            border: '1px solid #fca5a5',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '700px',
            width: '100%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{ color: '#dc2626', marginBottom: '1rem', fontSize: '1.25rem' }}>
              ⚠️ Runtime Error – Page Crashed
            </h2>
            <p style={{ color: '#7f1d1d', marginBottom: '1rem', fontFamily: 'sans-serif', fontSize: '0.9rem' }}>
              Something went wrong rendering this page. Error details:
            </p>
            <pre style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflow: 'auto',
              fontSize: '0.75rem',
              color: '#991b1b',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {this.state.error?.toString()}
              {'\n\n'}
              {this.state.info?.componentStack}
            </pre>
            <button
              onClick={() => this.setState({ hasError: false, error: null, info: null })}
              style={{
                marginTop: '1rem',
                background: '#0B3C5D',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontFamily: 'sans-serif'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
