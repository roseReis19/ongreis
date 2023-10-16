import './globals.css'
import Providers from './providers'


export const metadata = {
  title: 'Instituto Rose Reis',
  description: 'Instituto Rose Reis',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
        <body >
          <Providers>
          {children}
          </Providers>
        </body>
  
     
    </html>
  )
}
