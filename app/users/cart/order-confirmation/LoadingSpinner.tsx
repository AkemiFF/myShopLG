import React from 'react'

const LoadingSpinner: React.FC<{ visible: boolean }> = ({ visible }) => {
  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-md" />
      <div className="relative z-10 text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="w-20 h-20 border-4 border-primary/60 border-t-transparent rounded-full animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <div className="w-16 h-16 border-4 border-primary/30 border-t-transparent rounded-full animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="text-3xl font-bold text-white mb-4">
          Vérification en cours...
        </div>
        <p className="text-xl text-gray-200">
          Veuillez patienter pendant que nous vérifions votre commande
        </p>
      </div>
    </div>
  )
}

export default LoadingSpinner

