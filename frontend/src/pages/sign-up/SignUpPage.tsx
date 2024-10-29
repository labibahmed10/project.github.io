/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignupMutation } from "@/queries/useAuthQueries";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { mutate, isError, isSuccess } = useSignupMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    mutate({ name, email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("login successful");
      navigate("/");
    }

    if (isError) {
      toast.error("There was an error while login");
    }
  }, [isSuccess, isError, navigate]);
  return (
    <div className="p-4">
      <Card className="max-w-lg mx-auto mt-60">
        <CardHeader className="text-center space-y-2">
          <CardTitle>Sign Up for a new account</CardTitle>
          <CardDescription>Make changes to your account here</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" name="name" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" name="email" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="Enter your password" name="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Sign Up</Button>
            <Link to="/sign-in" className="underline text-blue-500">
              Already have an account?
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUpPage;
