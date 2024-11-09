"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { API_BASE_URL } from '@/utils/api'
import { getAdminAccessToken } from '@/utils/cookies'
import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface GraphStats {
    name: string
    sales: number
    orders: number
    visitors: number
}

export default function SalesChart() {
    const [graphStats, setGraphStats] = useState<GraphStats[]>([])
    const [period, setPeriod] = useState("year")

    useEffect(() => {
        const fetchSales = async () => {
            const accessToken = await getAdminAccessToken()
            try {
                const response = await fetch(`${API_BASE_URL}api/dashboard/sales-orders/?period=${period}`, {
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

        fetchSales()
    }, [period])

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-normal">Aperçu des performances</CardTitle>
                    <CardDescription>
                        Ventes, commandes et visiteurs pour la période sélectionnée
                    </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                    <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sélectionner la période" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="year">Cette année</SelectItem>
                            <SelectItem value="month">Ce mois</SelectItem>
                            <SelectItem value="week">Cette semaine</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent className="pb-4">
                <ChartContainer
                    config={{
                        sales: {
                            label: "Ventes",
                            color: "hsl(var(--chart-1))",
                        },
                        orders: {
                            label: "Commandes",
                            color: "hsl(var(--chart-2))",
                        },
                        visitors: {
                            label: "Visiteurs",
                            color: "hsl(var(--chart-3))",
                        },
                    }}
                    className="h-[400px]"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={graphStats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Area type="monotone" dataKey="sales" stackId="1" stroke="var(--color-sales)" fill="var(--color-sales)" fillOpacity={0.5} />
                            <Area type="monotone" dataKey="orders" stackId="2" stroke="var(--color-orders)" fill="var(--color-orders)" fillOpacity={0.5} />
                            <Area type="monotone" dataKey="visitors" stackId="3" stroke="var(--color-visitors)" fill="var(--color-visitors)" fillOpacity={0.5} />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}