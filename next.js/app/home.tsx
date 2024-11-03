import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ThumbsUp, MessageCircle, Share2, Send } from "lucide-react"

export default function Component() {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/placeholder.svg?height=50&width=50" alt="User avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">John Doe</h2>
          <p className="text-sm text-muted-foreground">2 hours ago</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base mb-4">
          Just finished a great hike in the mountains! The view was absolutely breathtaking. 🏔️ #NatureLover #WeekendAdventure
        </p>
        <img
          src="/placeholder.svg?height=400&width=600"
          alt="Mountain view"
          className="w-full h-64 object-cover rounded-lg"
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <Button variant="ghost" className="flex-1">
            <ThumbsUp className="w-4 h-4 mr-2" />
            Like
          </Button>
          <Button variant="ghost" className="flex-1">
            <MessageCircle className="w-4 h-4 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=30&width=30" alt="Your avatar" />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <Input placeholder="Write a comment..." className="flex-1" />
          <Button size="icon" variant="ghost">
            <Send className="w-4 h-4" />
            <span className="sr-only">Send comment</span>
          </Button>
        </div>
        <div className="w-full">
          <div className="flex items-start gap-2 mb-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=30&width=30" alt="Commenter avatar" />
              <AvatarFallback>JA</AvatarFallback>
            </Avatar>
            <div className="bg-muted p-2 rounded-lg">
              <p className="font-semibold">Jane Smith</p>
              <p className="text-sm">Wow, that view is amazing! Which trail did you take?</p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}