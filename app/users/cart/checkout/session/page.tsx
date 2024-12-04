"use client"
import LoadingSpinner from "@/components/LoadingSpinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/context/UserContext"
import { API_BASE_URL } from '@/utils/api'
import { setTokens } from '@/utils/cookies'
import { initiateCartPayment } from "@/utils/payments"
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { AlertCircle } from "lucide-react"
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
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [isPaying, setIsPaying] = useState(false);
    const router = useRouter();
    const total = subtotal
    const { user, setUser } = useUser();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [countryList, setCountryList] = useState<Country[]>([]);
    const [isSaved, setSaved] = useState(false);
    useEffect(() => {
        fetch('/json/countries.json')
            .then(response => response.json())
            .then(data => {
                setCountryList(data);
            });
    }, []);

    const handleAddPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.')
            return
        }

        if (password.length < 8) {
            setError('Doit faire au moins 8 caractères')
            return
        }

        if (!/[A-Z]/.test(password)) {
            setError('Le mot de passe doit contenir au moins une lettre majuscule.');
            return;
        }

        if (!/[a-z]/.test(password)) {
            setError('Le mot de passe doit contenir au moins une lettre minuscule.');
            return;
        }

        if (!/[0-9]/.test(password)) {
            setError('Le mot de passe doit contenir au moins un chiffre.');
            return;
        }

        const clientData = {
            username: lastName.replace(/ /g, "_") + '_' + email,
            password: password,
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
            setIsDialogOpen(true);
        } else {
            showAlert('Vous avez déjà un compte lié à l\'email');
        }
    }

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
                return { success: false, data: errorData };
            }

            const data = await response.json();
            setTokens(data.access, data.refresh);
            setUser(data.user);
            saveOrderData(data.user.id);
            console.log(data.user.id);

            setSaved(true);
            setIsPasswordDialogOpen(false);
            toast.info('Compte créé avec succès', {
                theme: "colored",
                autoClose: 500,
            });
            return { success: true, data: data };
        } catch (error) {
            toast.error('Vous avez déjà un compte lié à l\'email', {
                theme: "colored",
                autoClose: 500,
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
        }
        return true
    }


    const handleConfirmOrder = async () => {
        if (!isSaved) {
            const check = checkForm();
            if (check) {
                setIsPasswordDialogOpen(true);
            }
        } else {
            handleSubmit();
        }
    }

    const handleSubmit = async () => {
        setIsDialogOpen(false);
        await handlePayement();
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
                                                    onChange={(e) => setLastName(e.target.value)} // Mettre à jour l'état
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="firstName">Contact</Label>
                                                <Input
                                                    id="contact"
                                                    placeholder="+01 00 000 000"
                                                    value={number}
                                                    onChange={(e) => setNumber(e.target.value)} // Mettre à jour l'état
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="firstName">Email</Label>
                                                <Input
                                                    id="email"
                                                    placeholder="trucdechose@truc.truc"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)} // Mettre à jour l'état
                                                />
                                            </div>

                                        </div>
                                        <div>
                                            <Label htmlFor="address">Adresse</Label>
                                            <Input
                                                id="address"
                                                placeholder="123 Rue Principale"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)} // Mettre à jour l'état
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="city">Ville</Label>
                                                <Input
                                                    id="city"
                                                    placeholder="Paris"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)} // Mettre à jour l'état
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="postalCode">Code postal</Label>
                                                <Input
                                                    id="postalCode"
                                                    placeholder="75000"
                                                    value={postalCode}
                                                    onChange={(e) => setPostalCode(e.target.value)} // Mettre à jour l'état
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="country">Pays</Label>
                                            <Select value={country} onValueChange={setCountry}> {/* Mettre à jour l'état */}
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
                                    <Button className="w-full mt-4" onClick={handleConfirmOrder}>Confirmer la commande</Button>

                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>

                                        <DialogContent aria-describedby="truc" aria-description="Truc" className="w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-background p-6 rounded-lg shadow-2xl">
                                            <DialogHeader className="mb-4">
                                                <DialogTitle className="text-2xl font-bold">Confirmation de la commande</DialogTitle>
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
                                                    <div className="space-y-2 sm:col-span-2">
                                                        <Label className="font-semibold">Adresse:</Label>
                                                        <span>{address}, {city}, {postalCode}, {country}</span>
                                                    </div>
                                                </div>
                                                <div className="border-t border-gray-200 pt-4">
                                                    <h4 className="font-bold text-lg mb-3">Résumé de la commande:</h4>
                                                    <div className="space-y-2">
                                                        {cartItems.map((item) => (
                                                            <div key={item.product_id} className="flex justify-between items-center">
                                                                <span>{item.product_name} (x{item.quantity})</span>
                                                                <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} €</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="border-t border-gray-200 mt-4 pt-4">
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-semibold">Sous-total:</span>
                                                            <span>{subtotal.toFixed(2)} €</span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="font-semibold">Frais de livraison:</span>
                                                            <span>Inclus</span>
                                                        </div>
                                                        <div className="flex justify-between items-center text-lg font-bold mt-2">
                                                            <span>Total:</span>
                                                            <span>{total.toFixed(2)} €</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
                                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full sm:w-auto">Annuler</Button>
                                                    <Button onClick={handleSubmit} className="w-full sm:w-auto">Confirmer la commande</Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>

                                        <DialogContent className="w-11/12 max-w-md overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-background p-6 rounded-lg shadow-2xl">
                                            <DialogHeader className="mb-4">
                                                <DialogTitle className="text-2xl font-bold">Créer un mot de passe</DialogTitle>
                                            </DialogHeader>
                                            <form onSubmit={handleAddPassword} className="space-y-6">
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="password" className="font-semibold">
                                                            Mot de passe
                                                        </Label>
                                                        <Input
                                                            id="password"
                                                            type="password"
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            required
                                                            className="w-full px-3 py-2 border rounded-md" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="confirmPassword" className="font-semibold">
                                                            Confirmer le mot de passe
                                                        </Label>
                                                        <Input
                                                            id="confirmPassword"
                                                            type="password"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            required
                                                            className="w-full px-3 py-2 border rounded-md" />
                                                    </div>
                                                </div>
                                                {error && (
                                                    <div className="flex items-center space-x-2 text-red-600" role="alert">
                                                        <AlertCircle size={20} />
                                                        <span>{error}</span>
                                                    </div>
                                                )}
                                                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
                                                    <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)} className="w-full sm:w-auto">
                                                        Annuler
                                                    </Button>
                                                    <Button type="submit" className="w-full sm:w-auto">
                                                        Confirmer
                                                    </Button>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </main>
            </div></>
    )
}
