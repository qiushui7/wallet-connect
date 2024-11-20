import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.className
      )}>
        {children}
        <Toaster/>
      </body>
    </html>
  )
} 