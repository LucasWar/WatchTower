"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TriggredAlert() {
  return(
    <Card className="max-h-45 bg-primary-color text-gray-300 sm:min-h-45">
      <CardHeader>
        <CardTitle>Triggered Alerts </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center h-full text-4xl text-scarlet/70">
       <span>
        3 Active
       </span>
      </CardContent>
    </Card>
  )
}