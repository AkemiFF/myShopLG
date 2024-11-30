"use client"
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function CartPage() {
    const { user } = useUser();
    const router = useRouter();

    const CheckUser = () => {
        if (user) {
            router.push("/users/cart/cart-user");
        } else {
            router.push("/users/cart/cart-session");
        }
    };

    useEffect(() => {
        CheckUser();
    }, []);

    return null
}