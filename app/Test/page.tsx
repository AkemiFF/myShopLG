"use client"
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/utils/api";

const Profile = () => {
    const testSession = () => {
        fetch(`${API_BASE_URL}api/cart/session/`, {
            method: 'POST',
            credentials: "include",
        })
    }
    return (
        <div>

            <Button onClick={testSession} variant='secondary' >Test session</Button>
        </div>
    );
};

export default Profile;
