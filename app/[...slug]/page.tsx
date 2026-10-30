import { Site } from '../../components/site';
export default async function CatchAll({params}:{params:Promise<{slug:string[]}>}){const p=await params;return <Site page={p.slug.join('/')}/>}
