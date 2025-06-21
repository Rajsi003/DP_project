import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    if (email === "admin" && password === "iamadmin") {
      navigate("/admin")
    } else if (email.toLowerCase().startsWith("b")) {
      navigate("/student")
    } else {
      navigate(`/instructor/${email}/courses`)
    }
  }
  const handleCancel = () => {
    navigate("/") // Navigate to homepage
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-black">Login</CardTitle>
          <CardDescription className="text-black">Enter your credentials to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-black">Username:</Label>
              <Input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-black">Password:</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>

          <Button onClick={handleLogin}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
