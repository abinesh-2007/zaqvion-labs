import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:{default:'ZAQVION LABS — Working Systems',template:'%s | ZAQVION LABS'},description:'Engineering project discovery and private enquiry platform.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="icon" href="/images/brand/zaqvion-logo.png" /></head><body>{children}</body></html>}
