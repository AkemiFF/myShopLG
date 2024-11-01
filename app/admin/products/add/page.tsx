'use client'

import AdminHeader from "@/components/AdminHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Category } from "@/lib/store"
import { API_BASE_URL } from "@/utils/api"
import { fetchCategories } from "@/utils/base"
import { Plus, Upload } from 'lucide-react'
import { useEffect, useState } from 'react'


export default function Component() {
    const [specifications, setSpecifications] = useState([{ name: '', value: '' }])
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState<File[]>([]);
    // États pour les champs "Shipping and Delivery"
    const [weight, setWeight] = useState<number | "">("");
    const [weightUnit, setWeightUnit] = useState("kg");
    const [length, setLength] = useState<number | "">("");
    const [width, setWidth] = useState<number | "">("");
    const [height, setHeight] = useState<number | "">("");

    // États pour les champs "Pricing"
    const [price, setPrice] = useState<number | "">("");
    const [comparePrice, setComparePrice] = useState<number | "">("");

    // États pour les champs "Inventory"
    const [sku, setSku] = useState("");
    const [quantity, setQuantity] = useState<number | "">("");

    // État pour "Selling Type"
    const [sellingType, setSellingType] = useState("in-store");
    async function createProduct() {
        const productData = {
            name: productName,
            description: description,
            category: category,
            weight: weight,
            weightUnit: weightUnit,
            length: length,
            width: width,
            height: height,
            price: price,
            comparePrice: comparePrice,
            sku: sku,
            quantity: quantity,
            sellingType: sellingType,
            specifications: specifications,
        };

        const formData = new FormData();
        // Ajout des images au FormData
        images.forEach((image) => {
            formData.append('images', image);
        });

        // Ajout des autres champs au FormData
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('category', productData.category);
        formData.append('weight', productData.weight.toString());
        formData.append('weightUnit', productData.weightUnit);
        formData.append('length', productData.length.toString());
        formData.append('width', productData.width.toString());
        formData.append('height', productData.height.toString());
        formData.append('price', productData.price.toString());
        formData.append('comparePrice', productData.comparePrice.toString());
        formData.append('sku', productData.sku);
        formData.append('stock', productData.quantity.toString());
        formData.append('sellingType', productData.sellingType);

        specifications.forEach((specification) => {
            formData.append('specifications', JSON.stringify(specification));
        });

        try {
            const response = await fetch(`${API_BASE_URL}api/product/create/`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Une erreur s\'est produite lors de la création du produit.');
            }

            const responseData = await response.json();
            console.log('Produit créé avec succès:', responseData);
            return responseData;
        } catch (error) {
            console.error('Erreur lors de la création du produit:', error);
            throw error;
        }
    }



    const resetForm = () => {
        setSpecifications([{ name: '', value: '' }]);
        setProductName("");
        setDescription("");
        setCategory("");
        setImages([]);

        // États pour "Shipping and Delivery"
        setWeight("");
        setWeightUnit("kg");
        setLength("");
        setWidth("");
        setHeight("");

        // États pour "Pricing"
        setPrice("");
        setComparePrice("");

        // États pour "Inventory"
        setSku("");
        setQuantity("");

        // État pour "Selling Type"
        setSellingType("in-store");
    };
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const categoriesData = await fetchCategories();
            setCategories(categoriesData);
        };

        getCategories();
    }, []);


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImages([...images, ...Array.from(event.target.files)]);
        }
    };


    const addSpecification = () => {
        setSpecifications([...specifications, { name: '', value: '' }])
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}


            {/* Main content */}
            <div className="flex-1 overflow-auto">
                <AdminHeader
                    url="/admin/products"
                    urlName="Back to product list"
                    title="Ajout Produits"
                />

                <main className="p-6">


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Description</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">Product Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter product name"
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Enter product description"
                                            className="h-32"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={category}
                                            onValueChange={(value) => setCategory(value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {categories.map((category: Category) => (
                                                    <SelectItem key={category.id.toString()} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Product Images</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border-2 border-dashed rounded-lg p-4 flex items-center justify-center">
                                        <Button variant="outline">
                                            <label className="flex items-center cursor-pointer">
                                                <Upload className="h-4 w-4 mr-2" /> Upload Image
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    className="hidden"
                                                    onChange={handleImageUpload}
                                                />
                                            </label>
                                        </Button>
                                    </div>
                                    {images.map((image, index) => (
                                        <div key={index} className="bg-gray-100 rounded-lg p-4">
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Shipping and Delivery</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="weight">Weight</Label>
                                        <div className="flex">
                                            <Input
                                                id="weight"
                                                type="number"
                                                placeholder="Enter weight"
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : "")}
                                            />
                                            <Select
                                                value={weightUnit}
                                                onValueChange={(value) => setWeightUnit(value)}
                                                defaultValue="kg"
                                            >
                                                <SelectTrigger className="w-[80px] ml-2">
                                                    <SelectValue placeholder="Unit" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="kg">kg</SelectItem>
                                                    <SelectItem value="g">g</SelectItem>
                                                    <SelectItem value="lb">lb</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div>
                                        <Label>Dimensions</Label>
                                        <div className="grid grid-cols-3 gap-2">
                                            <Input
                                                placeholder="Length"
                                                value={length}
                                                onChange={(e) => setLength(e.target.value ? parseFloat(e.target.value) : "")}
                                            />
                                            <Input
                                                placeholder="Width"
                                                value={width}
                                                onChange={(e) => setWidth(e.target.value ? parseFloat(e.target.value) : "")}
                                            />
                                            <Input
                                                placeholder="Height"
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value ? parseFloat(e.target.value) : "")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Pricing</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="price">Price</Label>
                                        <div className="flex items-center">
                                            <span className="mr-2">$</span>
                                            <Input
                                                id="price"
                                                type="number"
                                                placeholder="0.00"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : "")}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="compare-price">Compare at Price</Label>
                                        <div className="flex items-center">
                                            <span className="mr-2">$</span>
                                            <Input
                                                id="compare-price"
                                                type="number"
                                                placeholder="0.00"
                                                value={comparePrice}
                                                onChange={(e) => setComparePrice(e.target.value ? parseFloat(e.target.value) : "")}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Inventory</h2>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                                        <Input
                                            id="sku"
                                            placeholder="Enter SKU"
                                            value={sku}
                                            onChange={(e) => setSku(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="quantity">Quantity</Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            placeholder="Enter quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value ? parseInt(e.target.value) : "")}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h2 className="text-lg font-semibold mb-4">Selling Type</h2>
                                <RadioGroup value={sellingType} onValueChange={setSellingType}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="in-store" id="in-store" />
                                        <Label htmlFor="in-store">In-store selling only</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="online" id="online" />
                                        <Label htmlFor="online">Online selling only</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="both" id="both" />
                                        <Label htmlFor="both">Available both in-store and online</Label>
                                    </div>
                                </RadioGroup>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 space-x-4 space-y-4">
                                <h2 className="text-lg font-semibold mb-4">Specifications</h2>
                                <div className="flex flex-wrap space-x-4">
                                    {specifications.map((spec, index) => (
                                        <div key={index} className="mb-4"> {/* Add a key prop here */}
                                            <div>
                                                <Label htmlFor={`spec-name-${index}`}>Name</Label>
                                                <Input
                                                    id={`spec-name-${index}`}
                                                    placeholder="Enter name"
                                                    value={spec.name}
                                                    onChange={(e) => {
                                                        const newSpecifications = [...specifications];
                                                        newSpecifications[index].name = e.target.value;
                                                        setSpecifications(newSpecifications);
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor={`spec-value-${index}`}>Value</Label>
                                                <Input
                                                    id={`spec-value-${index}`}
                                                    placeholder="Enter description"
                                                    value={spec.value}
                                                    onChange={(e) => {
                                                        const newSpecifications = [...specifications];
                                                        newSpecifications[index].value = e.target.value;
                                                        setSpecifications(newSpecifications);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setSpecifications([...specifications, { name: '', value: '' }])} // Ajoute une nouvelle spécification vide
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Add Variant
                                    </Button>
                                </div>

                            </CardContent>
                        </Card>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        <Button onClick={resetForm} variant="outline">Discard</Button>
                        {/* <Button variant="outline">Schedule</Button> */}
                        <Button onClick={createProduct}>Add Product</Button>
                    </div>
                </main>
            </div>
        </div>
    )
}