export default function LoadingSpinner({ visible: boolean }) {
  if (visible) {
    return (

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="space-y-4 text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <div className="w-12 h-12 border-4 border-primary/60 border-t-transparent rounded-full animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-lg font-medium text-gray-600">
            Traitement du paiement en cours...
          </div>
          <p className="text-sm text-gray-500">
            Veuillez ne pas fermer cette fenêtre
          </p>
        </div>
      </div>
    )
  }
  else { return null; }
}

