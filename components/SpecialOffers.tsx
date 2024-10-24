'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const offers = [
  { id: 1, title: 'Offre 1', description: 'Description de l\'offre 1' },
  { id: 2, title: 'Offre 2', description: 'Description de l\'offre 2' },
  { id: 3, title: 'Offre 3', description: 'Description de l\'offre 3' },
]

export default function SpecialOffers() {
  const [currentOffer, setCurrentOffer] = useState(0)

  const nextOffer = () => {
    setCurrentOffer((prev) => (prev + 1) % offers.length)
  }

  const prevOffer = () => {
    setCurrentOffer((prev) => (prev - 1 + offers.length) % offers.length)
  }

  return (
    <div className="relative">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-2">{offers[currentOffer].title}</h3>
          <p>{offers[currentOffer].description}</p>
        </CardContent>
      </Card>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-2 transform -translate-y-1/2"
        onClick={prevOffer}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-2 transform -translate-y-1/2"
        onClick={nextOffer}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}