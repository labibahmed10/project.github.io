import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <Card className="max-w-lg mx-auto mt-60">
      <CardHeader className="text-center space-y-2">
        <CardTitle>Sign Up for a new account</CardTitle>
        <CardDescription>Make changes to your account here</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Enter your name" type="text" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="name">Email</Label>
          <Input id="name" placeholder="Enter your email" type="text" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Password</Label>
          <Input id="username" placeholder="Enter your password" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Sign Up</Button>
        <Link to="/sign-in" className="underline text-blue-500">
          Already have an account?
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
