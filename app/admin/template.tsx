// Force le rendu dynamique pour toutes les pages admin
export const dynamic = 'force-dynamic'

export default function AdminTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
