import { CheckCircle, XCircle } from 'lucide-react'

interface OrderStatusProps {
  isAccepted: boolean | null
}

export default function OrderStatus({ isAccepted }: OrderStatusProps) {
  if (isAccepted === null) return null

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
      {isAccepted ? (
        <>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Commande acceptée</h2>
          <p className="text-gray-600">
            Votre commande a été acceptée avec succès. Vous recevrez bientôt un e-mail de confirmation.
          </p>
        </>
      ) : (
        <>
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Commande refusée</h2>
          <p className="text-gray-600">
            Nous sommes désolés, mais votre commande n'a pas pu être traitée. Veuillez réessayer ou contacter notre service client.
          </p>
        </>
      )}
    </div>
  )
}

