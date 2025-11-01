import Home from "@/components/page/main/home"

export default function HomePage({ params }: { params: { teamId: string } }) {
  return <Home params={params} />
}
