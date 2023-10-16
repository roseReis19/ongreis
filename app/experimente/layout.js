import ResponsiveMenu from "../components/menu"


export const metadata = {
  title: 'Instituto Rose Reis',
  description: 'Instituto Rose Reis',
}

export default function Layout({ children }) {
  return (
        <div >
          <ResponsiveMenu />
          {children}
        </div>
  )
}
