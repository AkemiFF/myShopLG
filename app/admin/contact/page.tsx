'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { API_BASE_URL } from '@/utils/api'
import { getAdminAccessToken } from '@/utils/cookies'
import { format } from 'date-fns'
import { Eye, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    submitted_at: string;
}

export default function AdminContactUsPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const filteredMessages = messages.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true)
            const accessToken = await getAdminAccessToken();

            try {
                const response = await fetch(`${API_BASE_URL}/api/contacts/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des messages');
                }

                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Erreur:', error);
            } finally {
                setIsLoading(false)
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="container mx-auto px-6 py-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold">Messages de Contact</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative mb-4">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher un message..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Sujet</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array(5).fill(0).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-8 w-8 rounded-full ml-auto" /></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                filteredMessages.map((message) => (
                                    <TableRow key={message.id}>
                                        <TableCell>{message.name}</TableCell>
                                        <TableCell>{message.email}</TableCell>
                                        <TableCell>{message.subject}</TableCell>
                                        <TableCell>{format(new Date(message.submitted_at), 'dd/MM/yyyy')}</TableCell>
                                        <TableCell className="text-right">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" onClick={() => setSelectedMessage(message)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-3xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Détails du message</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label className="text-right">Nom</Label>
                                                            <div className="col-span-3">{message.name}</div>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label className="text-right">Email</Label>
                                                            <div className="col-span-3">{message.email}</div>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label className="text-right">Sujet</Label>
                                                            <div className="col-span-3">{message.subject}</div>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-center gap-4">
                                                            <Label className="text-right">Date</Label>
                                                            <div className="col-span-3">{format(new Date(message.submitted_at), 'dd/MM/yyyy HH:mm')}</div>
                                                        </div>
                                                        <div className="grid grid-cols-4 items-start gap-4">
                                                            <Label className="text-right">Message</Label>
                                                            <div className="col-span-3 whitespace-pre-wrap">{message.message}</div>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

