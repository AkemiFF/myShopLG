"use client"

import AdminAside from '@/components/AdminAside'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { ReactNode, useState } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <AdminAside isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 md:ml-64">
        {children}
      </main>
    </div>
  )
}
