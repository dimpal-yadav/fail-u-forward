"use client";
import { useEffect,useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { firebaseApp } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
export default function Messages() {
  const router =useRouter()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
    const auth = getAuth(firebaseApp)
    const user = auth.currentUser
    if(!user){
      router.push("/login");
      return
    } 
    else{
      setLoading(false)
    }
    } catch (error:any) {
      toast.error("Error fetching user data:", error);
    }
   
  }, [router])
  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <HashLoader color="white"/>
    </div>
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="grid grid-cols-3 min-h-[600px]">
          <div className="border-r">
            <div className="p-4">
              <Input placeholder="Search messages..." />
            </div>
            <ScrollArea className="h-[520px]">
              {[1, 2, 3, 4, 5].map((chat) => (
                <motion.div
                  key={chat}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 hover:bg-accent cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 ring-1 ring-border" />
                    <div className="flex-1">
                      <p className="font-semibold">Jane Smith</p>
                      <p className="text-sm text-gray-500 truncate">
                        Latest message preview...
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </ScrollArea>
          </div>

          <div className="col-span-2 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 ring-1 ring-border" />
                <div>
                  <p className="font-semibold">Jane Smith</p>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {[1, 2, 3].map((message, index) => (
                  <motion.div
                    key={message}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        index % 2 === 0
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-100"
                      }`}
                    >
                      <p>This is a sample message content that could be longer.</p>
                      <p className="text-xs mt-1 opacity-70">2:30 PM</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input placeholder="Type a message..." />
                <Button size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}