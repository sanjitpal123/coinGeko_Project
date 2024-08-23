// CustomError.js
import { ErrorBoundary } from 'react-error-boundary';

function FallbackRender({ error, resetErrorBoundary }) {
  return (
    <div className='w-screen h-screen bg-black flex items-center justify-center'>
      <div role="alert" className="bg-red-500 text-white p-4 rounded max-w-lg mx-auto">
        <p>Something went wrong:</p>
        <pre style={{ color: 'white' }}>{error.message}</pre>
        <button 
          onClick={() => resetErrorBoundary()} 
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default function CustomError({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackRender}
      onReset={() => window.location.reload()} // Reset logic
    >
      {children}
    </ErrorBoundary>
  );
}
