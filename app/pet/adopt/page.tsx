import { findPets } from "@/actions/find-pets";
import { Card, CardHeader } from "@/components/ui/card";

export default async function Adopt() {
  const data = await findPets();
  return (
  <Card>
      <CardHeader>{data}</CardHeader>
    </Card>
  )
}
