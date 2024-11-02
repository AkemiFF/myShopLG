import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { addToCartOffline } from "@/utils/base"
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'

interface LoginOrGuestDialogProps {
    productId: number
    quantity: number
    isopen: boolean
}

export default function LoginOrGuestDialog({ productId, quantity, isopen }: LoginOrGuestDialogProps) {
    const [isOpen, setIsOpen] = useState(isopen)
    const router = useRouter();
    const handleLogin = () => {
        setIsOpen(false)
        router.push("/users/login");
    }
    useEffect(() => {
        setIsOpen(isopen);
    }, [isopen]);

    const handleGuest = () => {
        setIsOpen(false)
        addToCartOffline(productId, quantity)
    }

    const promptLoginOrGuest = () => {
        setIsOpen(true)
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajouter au panier</DialogTitle>
                        <DialogDescription>
                            Voulez-vous vous connecter pour sauvegarder votre panier ou continuer sans compte ?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <Button onClick={handleLogin} variant="secondary">
                            Se connecter
                        </Button>
                        <Button onClick={handleGuest}>
                            Continuer sans compte
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}