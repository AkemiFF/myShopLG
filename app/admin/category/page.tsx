"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { API_BASE_URL } from "@/utils/api"
import { toast } from 'react-toastify'

import { getAdminAccessToken } from "@/utils/cookies"
import { Pencil, Plus, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const fetchCategories = () => {
    return fetch(`${API_BASE_URL}api/product/categories/`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des catégories');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Erreur:', error);
            return [];
        });
};
type Category = {
    id: number;
    name: string;
    fr_name: string;
    description: string;
}


export default function AdminCategories() {
    const [categories, setCategories] = useState<Category[]>([])

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null)

    const handleCreateCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const newCategory = {
            name: formData.get('name') as string,
            fr_name: formData.get('fr_name') as string,
            description: formData.get('description') as string,
        };
        const accessToken = await getAdminAccessToken();
        fetch(`${API_BASE_URL}api/product/category/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(newCategory),
        })
            .then(async (response) => {

                if (!response.ok) {
                    const errorData = await response.json()
                    console.error('Erreur lors de la création de la catégorie:', errorData)
                    throw new Error('Erreur de création')
                }
                return response.json();
            })
            .then((createdCategory) => {
                setCategories([...categories, createdCategory]);
                setIsCreateDialogOpen(false);
            })
            .catch((error) => {
                console.error('Erreur réseau:', error);
            });
    };

    useEffect(() => {
        fetchCategories().then(data =>
            setCategories(data));
    }, []);


    const handleEditCategory = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (!currentCategory) return;
        console.log(categories);
        const formData = new FormData(event.currentTarget);
        const updatedCategory = {
            ...currentCategory,
            name: formData.get('name') as string,
            fr_name: formData.get('fr_name') as string,
            description: formData.get('description') as string,
        };

        fetch(`${API_BASE_URL}api/product/category/update/${currentCategory.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCategory),
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json()
                    toast.error('Erreur lors de la modification de la catégorie', {

                        theme: "colored",
                        autoClose: 3000,
                    });
                    console.error('Erreur lors de la modification de la catégorie:', errorData)
                    throw new Error('Erreur de modification')
                }
                return response.json();
            })
            .then((editedCategory) => {
                toast.success('Modification éfféctué !', {
                    theme: "colored",
                    autoClose: 3000,
                });
                setCategories(categories.map((cat) => cat.id === currentCategory.id ? editedCategory : cat));
                setIsEditDialogOpen(false);
            })
            .catch((error) => {
                console.error('Erreur réseau:', error);
            });
    };


    const handleDeleteCategory = (id: number) => {
        setCategories(categories.filter(cat => cat.id !== id))
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold">Categories</CardTitle>
                    <Button
                        onClick={() => setIsCreateDialogOpen(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>French Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.name}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>{category.fr_name}</TableCell>
                                    <TableCell>{category.description}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setCurrentCategory(category)
                                                setIsEditDialogOpen(true)
                                            }}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteCategory(category.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>

                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Category</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleCreateCategory}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="name" className="text-right">Name</label>
                                    <Input id="name" name="name" className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="fr_name" className="text-right">French Name</label>
                                    <Input id="fr_name" name="fr_name" className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="description" className="text-right">Description</label>
                                    <Textarea id="description" name="description" className="col-span-3" required />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">Create Category</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditCategory}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-name" className="text-right">Name</label>
                                    <Input id="edit-name" name="name" defaultValue={currentCategory?.name} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-fr_name" className="text-right">French Name</label>
                                    <Input id="edit-fr_name" name="fr_name" defaultValue={currentCategory?.fr_name} className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="edit-description" className="text-right">Description</label>
                                    <Textarea id="edit-description" name="description" defaultValue={currentCategory?.description} className="col-span-3" required />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">Update Category</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </Card></div>
    )
}