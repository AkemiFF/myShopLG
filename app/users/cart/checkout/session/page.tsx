"use client"
import LoadingSpinner from "@/components/LoadingSpinner"
import { CartSkeleton } from "@/components/skeleton/CartSkeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/context/UserContext"
import { API_BASE_URL } from '@/utils/api'
import { setTokens } from '@/utils/cookies'
import generatePassword from "@/utils/password"
import { initiateCartPayment } from "@/utils/payments"
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

interface CartItem {
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
    description: string;
    total_price: number;
    image_url: string | null;
}
interface Country {
    name: string;
    code: string;
}
export default function CheckoutSessionPage() {
    const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const [number, setNumber] = useState<string>('');
    const [cartId, setCartId] = useState<number>(0);
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPaying, setIsPaying] = useState(false);
    const router = useRouter();
    const total = subtotal
    const { user, setUser } = useUser();

    const [countryList, setCountryList] = useState<Country[]>([]);
    const [isSaved, setSaved] = useState(false);
    useEffect(() => {
        fetch('/json/countries.json')
            .then(response => response.json())
            .then(data => {
                setCountryList(data);
            });
    }, []);


    const createClient = async (clientData: any) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/create/order/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include",
                body: JSON.stringify(clientData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                toast.error("Vous avez déjà un compte lié à cette email, veullez vous connecter ou choisir un autre email", {
                    theme: "colored",
                    autoClose: 800,
                });

                return { success: false, data: errorData };
            }

            const data = await response.json();
            setTokens(data.access, data.refresh);
            setUser(data.user);
            saveOrderData(data.user.id);


            setSaved(true);
            toast.info('Compte créé avec succès', {
                theme: "colored",
                autoClose: 500,
            });
            return { success: true, data: data };
        } catch (error) {
            toast.error('Vous avez déjà un compte lié à l\'email', {
                theme: "colored",
                autoClose: 1000,
            });
            return { success: false, error: 'Erreur réseau' };
        }
    }


    const checkForm = () => {
        // Vérifie si des champs sont vides
        if (!email) {
            showAlert("Veuillez entrer votre adresse email.");
            return false;
        }
        if (!lastName) {
            showAlert("Veuillez entrer votre nom.");
            return false;
        }
        if (!number) {
            showAlert("Veuillez entrer votre numéro de téléphone.");
            return false;
        }
        if (!address) {
            showAlert("Veuillez entrer votre adresse.");
            return false;
        }
        if (!city) {
            showAlert("Veuillez entrer votre ville.");
            return false;
        }
        if (!postalCode) {
            showAlert("Veuillez entrer votre code postal.");
            return false;
        }
        if (!country) {
            showAlert("Veuillez sélectionner votre pays.");
            return false;
        }

        return true; // Tous les champs sont valides
    };

    const showAlert = (message: string) => {
        toast.error(message, {
            theme: "colored",
            autoClose: 1000,
        })
    }

    const fetchCartItems = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/cart/session/`, {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            if (response.status === 404) {
                setCartItems([]);
                router.push("/users");
            } else if (!response.ok) {
                throw new Error("Erreur lors de la récupération des articles du panier");
            } else {
                const data = await response.json();
                setCartId(data.cart_id);
                setCartItems(data.items);
            }
        } catch (error) {
            router.push("/users");
            // console.error("Erreur:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handlePayement = async () => {
        setIsPaying(true);
        const payementStatus = await initiateCartPayment(cartId, router);

        if (payementStatus) {
            setIsPaying(false);
            router.push('/users/cart/order-confirmation');
        } else {
            setIsPaying(false);
            toast.error("Une erreur s'est produit, veuiller rééssayer", {
                theme: "colored",
                autoClose: 1000,
            });
        }
        return true
    }


    const handleConfirmOrder = async () => {
        if (!isSaved) {
            const check = checkForm();
            if (check) {

                setIsDialogOpen(true);
            }
        } else {
            handleSubmit();
        }
    }

    const handleSubmit = async () => {
        setIsDialogOpen(false);

        const clientData = {
            username: lastName.replace(/ /g, "_") + '_' + email,
            password: generatePassword({ postalCode, lastName, email }),
            phone_number: number,
            address: address,
            email: email,
            shipping_address: {
                address: address,
                city: city,
                postal_code: postalCode,
                country: country,
                phone_number: number
            }
        };

        const created = await createClient(clientData);
        if (created.success) {
            await handlePayement();
        }
    }

    const saveOrderData = (id: number) => {
        const data = {
            user: id,
            total_price: total,
            shipping_address: {
                phone_number: number,
                address: address,
                city: city,
                postal_code: postalCode,
                country: country,
            },
        };

        try {
            localStorage.setItem('orderData', JSON.stringify(data));
            console.log("Order data saved successfully.");
        } catch (error) {
            console.error("Failed to save order data:", error);
        }
    }


    return (
        <>
            <LoadingSpinner visible={isPaying} />
            <div className="min-h-screen bg-gray-100">

                <main className="container mx-auto py-8">
                    <h1 className="text-3xl font-bold mb-8">Paiement</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Adresse de livraison</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="lastName">Nom Complet</Label>
                                                <Input
                                                    id="lastName"
                                                    placeholder="Doe"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="firstName">Contact</Label>
                                                <Input
                                                    id="contact"
                                                    placeholder="+01 00 000 000"
                                                    value={number}
                                                    onChange={(e) => setNumber(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="firstName">Email</Label>
                                                <Input
                                                    id="email"
                                                    placeholder="trucdechose@truc.truc"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                        </div>
                                        <div>
                                            <Label htmlFor="address">Adresse</Label>
                                            <Input
                                                id="address"
                                                placeholder="123 Rue Principale"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="city">Ville</Label>
                                                <Input
                                                    id="city"
                                                    placeholder="Paris"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="postalCode">Code postal</Label>
                                                <Input
                                                    id="postalCode"
                                                    placeholder="75000"
                                                    value={postalCode}
                                                    onChange={(e) => setPostalCode(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="country">Pays</Label>
                                            <Select value={country} onValueChange={setCountry}>
                                                <SelectTrigger id="country">
                                                    <SelectValue placeholder="Sélectionnez un pays" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {countryList.map(country => (
                                                        <SelectItem key={country.code} value={country.code}>
                                                            {country.name}
                                                        </SelectItem>
                                                    ))}

                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                        <div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Résumé de la commande</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {isLoading ? (
                                        <CartSkeleton />
                                    ) : (
                                        <div className="space-y-2">
                                            {cartItems.map((item) => (
                                                <div key={item.product_id} className="flex justify-between">
                                                    <span>{item.product_name} (x{item.quantity})</span>
                                                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                                                </div>
                                            ))}
                                            <div className="border-t pt-2 mt-2">
                                                <div className="flex justify-between">
                                                    <span>Sous-total</span>
                                                    <span>{subtotal.toFixed(2)} €</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Frais de livraison</span>
                                                    <span>Inclus</span>
                                                </div>
                                                <div className="flex justify-between font-bold text-lg mt-2">
                                                    <span>Total</span>
                                                    <span>{total.toFixed(2)} €</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <Button className="w-full mt-4" onClick={handleConfirmOrder} disabled={isLoading}>
                                        {isLoading ? 'Chargement...' : 'Confirmer la commande'}
                                    </Button>

                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogContent aria-describedby="truc" aria-description="Truc" className="w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-background p-6 rounded-lg shadow-2xl">
                                            <DialogHeader className="mb-4">
                                                <DialogTitle className="text-2xl font-bold">Confirmation des informations</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-6">
                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label className="font-semibold">Nom:</Label>
                                                        <span>{lastName}</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="font-semibold">Email:</Label>
                                                        <span>{email}</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label className="font-semibold">Téléphone:</Label>
                                                        <span>{number}</span>
                                                    </div>
                                                    <div className="space-y-2 sm:col-span-2">
                                                        <Label className="font-semibold">Adresse:</Label>
                                                        <span>{address}, {city}, {postalCode}, {country}</span>
                                                    </div>
                                                </div>
                                                <div className="border-t border-gray-200 pt-4">
                                                    <p className="text-sm text-gray-600 mb-4">
                                                        Veuillez noter que ces informations ne pourront pas être modifiées pour cette commande.
                                                        Votre mot de passe sera envoyé à l'adresse email fournie.
                                                    </p>
                                                </div>
                                                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
                                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">Modifier</Button>
                                                    <Button onClick={handleSubmit} className="w-full sm:w-auto">Confirmer et payer</Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

