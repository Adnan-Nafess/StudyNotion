// src/components/ResponsiveTable.jsx
import dynamic from 'next/dynamic'

const ResponsiveTable = dynamic(
  () => import('react-super-responsive-table').then(mod => {
    window.global = window
    return mod
  }),
  { ssr: false }
)

export default ResponsiveTable