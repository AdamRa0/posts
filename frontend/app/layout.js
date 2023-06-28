import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ['latin'] 
})

export const metadata = {
  title: 'Posts',
  description: 'Meet, greet, connect.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  )
}
