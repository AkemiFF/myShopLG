"use client"
import { useUser } from "@/context/UserContext";

const Profile = () => {
    const { user, setUser } = useUser();

    if (!user) {
        return <p>Utilisateur non connecté</p>;
    }

    return (
        <div>
            <h1>Bonjour, {user.name}!</h1>
            <p>Email: {user.email}</p>
            <button onClick={() => setUser(null)}>Se déconnecter</button>
        </div>
    );
};

export default Profile;
