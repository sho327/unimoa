import Home from "@/components/page/main/team/home"

export default function HomePage({ params }: { params: { teamId: string } }) {
  return <Home params={params} />
}
