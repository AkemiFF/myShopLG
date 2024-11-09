'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { API_BASE_URL } from '@/utils/api'
import { getAdminAccessToken } from '@/utils/cookies'
import { ArrowUpRight, DollarSign, Moon, PercentIcon, Play, ShoppingCart, Sun, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface Stats {
  total_revenue: number
  revenue_percentage_change: number
  total_orders: number
  orders_percentage_change: number
  total_clients: number
  new_clients_percentage_change: number
  conversion_rate: number
  conversion_rate_percentage_change: number
}

interface GraphStats {
  name: string
  sales: number
  orders: number
  visitors: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>()
  const [graphStats, setGraphStats] = useState<GraphStats[]>([])
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter();
  useEffect(() => {
    const fetchStats = async () => {
      const accessToken = await getAdminAccessToken()
      try {
        const response = await fetch(`${API_BASE_URL}api/dashboard/stats/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        })
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des statistiques')
        }
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Erreur:', error)
      }
    }

    const fetchSales = async () => {
      const accessToken = await getAdminAccessToken()
      try {
        const response = await fetch(`${API_BASE_URL}api/dashboard/sales-orders/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        })
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des ventes')
        }
        const data = await response.json()
        setGraphStats(data)
      } catch (error) {
        console.error('Erreur:', error)
      }
    }

    fetchStats()
    fetchSales()
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-100'
  const textColor = darkMode ? 'text-white' : 'text-gray-900'
  const cardBgColor = darkMode ? 'bg-gray-800' : 'bg-white'

  return (
    <div className={`space-y-6 min-h-screen p-6 ${bgColor} ${textColor}`}>
      <div className="flex justify-between items-center">
        <Button onClick={toggleDarkMode} variant="outline" size="icon">
          {darkMode ? <Sun color='black' className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
        <Button onClick={() => { router.push("/users") }} className="flex justify-between w-36" variant="outline" size="default">
          <span className="text-black">View Site </span> <Play color='black' className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className={cardBgColor}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires total</CardTitle>
            <DollarSign className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_revenue} €</div>
            <p className={`text-xs ${(stats?.revenue_percentage_change ? stats?.revenue_percentage_change >= 0 : null) ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              { }

              <ArrowUpRight className="h-4 w-4 mr-1" />
              {stats?.revenue_percentage_change ? `${stats.revenue_percentage_change > 0 ? '+' : ''}${stats.revenue_percentage_change}%` : '+0%'} par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card className={cardBgColor}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_orders}</div>
            <p className={`text-xs ${stats?.orders_percentage_change !== undefined ? (stats.orders_percentage_change >= 0 ? 'text-green-500' : 'text-red-500') : ''} flex items-center`}>
              <ArrowUpRight className="h-4 w-4 mr-1" />
              {stats?.orders_percentage_change !== undefined ? `${stats.orders_percentage_change > 0 ? '+' : ''}${stats.orders_percentage_change}%` : '+0%'} depuis la semaine dernière
            </p>
          </CardContent>
        </Card>
        <Card className={cardBgColor}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats?.total_clients}</div>
            <p className={`text-xs ${(stats?.new_clients_percentage_change ? stats?.new_clients_percentage_change >= 0 : false) ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              <ArrowUpRight className="h-4 w-4 mr-1" />
              {stats?.new_clients_percentage_change ? `${stats.new_clients_percentage_change > 0 ? '+' : ''}${stats.new_clients_percentage_change}%` : '+0%'} nouveaux clients
            </p>
          </CardContent>
        </Card>
        <Card className={cardBgColor}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
            <PercentIcon className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.conversion_rate}%</div>
            <p className={`text-xs ${(stats?.conversion_rate_percentage_change ? stats?.conversion_rate_percentage_change >= 0 : false) ? 'text-green-500' : 'text-red-500'} flex items-center`}>
              <ArrowUpRight className="h-4 w-4 mr-1" />
              {stats?.conversion_rate_percentage_change !== undefined ? `${stats.conversion_rate_percentage_change > 0 ? '+' : ''}${stats.conversion_rate_percentage_change}%` : '+0%'} par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className={cardBgColor}>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Aperçu des performances</CardTitle>
            <CardDescription>Ventes, commandes et visiteurs pour l'année en cours</CardDescription>
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
              <AreaChart data={graphStats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                    <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke={darkMode ? "#ccc" : "#666"} />
                <YAxis stroke={darkMode ? "#ccc" : "#666"} />
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#555" : "#ccc"} />
                <Tooltip
                  contentStyle={{ backgroundColor: darkMode ? '#333' : '#fff', border: `1px solid ${darkMode ? '#555' : '#ccc'}` }}
                  labelStyle={{ color: darkMode ? '#fff' : '#333' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#FF9900" fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="orders" stroke="#146EB4" fillOpacity={1} fill="url(#colorOrders)" />
                <Area type="monotone" dataKey="visitors" stroke="#00C49F" fillOpacity={1} fill="url(#colorVisitors)" />
                <Legend
                  wrapperStyle={{ paddingTop: '20px' }}
                  payload={[
                    { value: 'Ventes', type: 'line', color: '#FF9900' },
                    { value: 'Commandes', type: 'line', color: '#146EB4' },
                    { value: 'Visiteurs', type: 'line', color: '#00C49F' }
                  ]}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className={cardBgColor}>
          <CardHeader>
            <CardTitle className="text-xl">Produits les plus vendus</CardTitle>
            <CardDescription>Top 3 des produits par ventes et revenus</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead className="text-right">Ventes</TableHead>
                  <TableHead className="text-right">Revenus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: 'Smartphone XYZ', sales: 120, revenue: 59999.99 },
                  { name: 'Casque audio ABC', sales: 85, revenue: 12749.99 },
                  { name: 'Tablette 123', sales: 62, revenue: 24799.99 },
                ].map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right">{product.sales}</TableCell>
                    <TableCell className="text-right">{product.revenue.toFixed(2)} €</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className={cardBgColor}>
          <CardHeader>
            <CardTitle className="text-xl">Commandes récentes</CardTitle>
            <CardDescription>Aperçu des dernières commandes passées</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numéro</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: '1234', customer: 'Jean Dupont', total: 129.99, status: 'Livré' },
                  { id: '1235', customer: 'Marie Martin', total: 79.99, status: 'En cours de livraison' },
                  { id: '1236', customer: 'Pierre Durand', total: 199.99, status: 'En préparation' },
                  { id: '1237', customer: 'Sophie Lefebvre', total: 149.99, status: 'En attente de paiement' },
                  { id: '1238', customer: 'Luc Moreau', total: 89.99, status: 'Livré' },
                ].map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell className="text-right">{order.total.toFixed(2)} €</TableCell>
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
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
          Voir tous les rapports
        </Button>
      </div>
    </div>
  )
}