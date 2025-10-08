
"use client";
import { useEffect,useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ThumbsDown, MessageCircle, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { firebaseApp } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
export default function Notifications() {
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
  const notifications = [
    {
      id: 1,
      type: "relate",
      user: "Jane Smith",
      action: "related to your failure",
      content: "Spilling coffee on the CEO",
      time: "2 minutes ago",
      icon: ThumbsDown,
    },
    {
      id: 2,
      type: "comment",
      user: "John Doe",
      action: "sympathized with your post",
      content: "Missing the important client meeting",
      time: "1 hour ago",
      icon: MessageCircle,
    },
    {
      id: 3,
      type: "connection",
      user: "Alice Johnson",
      action: "wants to join your failure network",
      content: "",
      time: "2 hours ago",
      icon: UserPlus,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Notifications</h2>
        </div>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{notification.user}</p>
                      <p className="text-gray-500">{notification.action}</p>
                    </div>
                    {notification.content && (
                      <p className="text-sm text-gray-500">"{notification.content}"</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                  <notification.icon className="h-5 w-5 text-gray-500" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
