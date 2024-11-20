import ManagerAside from '@/components/ManagerAside'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <ManagerAside />

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        {/* <div className="container mx-auto px-6 py-8"> */}
        {children}
        {/* </div> */}
      </main>
    </div>
  )
}