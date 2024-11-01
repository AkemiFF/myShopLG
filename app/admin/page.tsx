'use client'
import AdminHeader from '@/components/AdminHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ArrowUpRight, DollarSign, PercentIcon, ShoppingCart, Users } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Extended simulated data
const salesData = [
  { name: 'Jan', sales: 4000, orders: 400, visitors: 1200 },
  { name: 'Feb', sales: 3000, orders: 380, visitors: 1100 },
  { name: 'Mar', sales: 5000, orders: 500, visitors: 1400 },
  { name: 'Apr', sales: 4500, orders: 450, visitors: 1300 },
  { name: 'May', sales: 6000, orders: 520, visitors: 1500 },
  { name: 'Jun', sales: 5500, orders: 480, visitors: 1450 },
]

const recentOrders = [
  { id: '1234', customer: 'Jean Dupont', total: 129.99, status: 'Livré' },
  { id: '1235', customer: 'Marie Martin', total: 79.99, status: 'En cours de livraison' },
  { id: '1236', customer: 'Pierre Durand', total: 199.99, status: 'En préparation' },
  { id: '1237', customer: 'Sophie Lefebvre', total: 149.99, status: 'En attente de paiement' },
  { id: '1238', customer: 'Luc Moreau', total: 89.99, status: 'Livré' },
]

const topProducts = [
  { name: 'Smartphone XYZ', sales: 120, revenue: 59999.99 },
  { name: 'Casque audio ABC', sales: 85, revenue: 12749.99 },
  { name: 'Tablette 123', sales: 62, revenue: 24799.99 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6 bg-[#EAEDED] min-h-screen p-6">
      <AdminHeader
        title="Tableau de bord"
        url="/admin"
        urlName="Retour à l'accueil"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#232F3E]">Chiffre d'affaires total</CardTitle>
            <DollarSign className="h-4 w-4 text-[#232F3E]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#232F3E]">45 231,89 €</div>
            <p className="text-xs text-[#007600] flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              +20.1% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#232F3E]">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-[#232F3E]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#232F3E]">+573</div>
            <p className="text-xs text-[#007600] flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              +201 depuis la semaine dernière
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#232F3E]">Clients</CardTitle>
            <Users className="h-4 w-4 text-[#232F3E]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#232F3E]">+2350</div>
            <p className="text-xs text-[#007600] flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              +180 nouveaux clients
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#232F3E]">Taux de conversion</CardTitle>
            <PercentIcon className="h-4 w-4 text-[#232F3E]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#232F3E]">3.2%</div>
            <p className="text-xs text-[#007600] flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              +0.1% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-[#232F3E]">Aperçu des performances</CardTitle>
            <CardDescription className="text-[#545B64]">Ventes, commandes et visiteurs pour l'année en cours</CardDescription>
          </div>
          <Select defaultValue="year">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner la période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">Cette année</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9900" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF9900" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#146EB4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#146EB4" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#232F3E" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#232F3E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#545B64" />
                <YAxis stroke="#545B64" />
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E5E5' }}
                  labelStyle={{ color: '#232F3E' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#FF9900" fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="orders" stroke="#146EB4" fillOpacity={1} fill="url(#colorOrders)" />
                <Area type="monotone" dataKey="visitors" stroke="#232F3E" fillOpacity={1} fill="url(#colorVisitors)" />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  payload={[
                    { value: 'Ventes', type: 'line', color: '#FF9900' },
                    { value: 'Commandes', type: 'line', color: '#146EB4' },
                    { value: 'Visiteurs', type: 'line', color: '#232F3E' }
                  ]}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-[#232F3E]">Produits les plus vendus</CardTitle>
            <CardDescription className="text-[#545B64]">Top 3 des produits par ventes et revenus</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#232F3E]">Produit</TableHead>
                  <TableHead className="text-right text-[#232F3E]">Ventes</TableHead>
                  <TableHead className="text-right text-[#232F3E]">Revenus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-[#232F3E]">{product.name}</TableCell>
                    <TableCell className="text-right text-[#232F3E]">{product.sales}</TableCell>
                    <TableCell className="text-right text-[#232F3E]">{product.revenue.toFixed(2)} €</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-[#232F3E]">Commandes récentes</CardTitle>
            <CardDescription className="text-[#545B64]">Aperçu des dernières commandes passées</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#232F3E]">Numéro</TableHead>
                  <TableHead className="text-[#232F3E]">Client</TableHead>
                  <TableHead className="text-right text-[#232F3E]">Total</TableHead>
                  <TableHead className="text-right text-[#232F3E]">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-[#232F3E]">{order.id}</TableCell>
                    <TableCell className="text-[#232F3E]">{order.customer}</TableCell>
                    <TableCell className="text-right text-[#232F3E]">{order.total.toFixed(2)} €</TableCell>
                    <TableCell className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs ${order.status === 'Livré' ? 'bg-green-100 text-green-800' :
                        order.status === 'En cours de livraison' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'En préparation' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#FF9900] hover:bg-[#FFAC31] text-[#232F3E] font-bold">
          Voir tous les rapports
        </Button>
      </div>
    </div>
  )
}