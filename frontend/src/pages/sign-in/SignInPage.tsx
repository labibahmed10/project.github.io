/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/queries/useAuthQueries";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignInPage = () => {
  const navigate = useNavigate();
  const { mutate, isError, isSuccess } = useLoginMutation();

  const useSubmit = async (e: any) => {
    e.preventDefault();

    const email = e.target.name.value;
    const password = e.target.password.value;

    mutate({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("login successful");
      navigate("/");
    }

    if (isError) {
      toast.error("There was an error while login");
    }
  }, [isSuccess, isError]);

  return (
    <div className="p-4">
      <Card className="max-w-lg mx-auto mt-60">
        <CardHeader className="text-center space-y-2">
          <CardTitle>Sign In to Your Account</CardTitle>
          <CardDescription>Make changes to your account here</CardDescription>
        </CardHeader>
        <form action="" onSubmit={useSubmit}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="Enter your email" name="name" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Password</Label>
              <Input id="username" placeholder="Enter your password" name="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Sign In</Button>
            <Link to="/sign-up" className="underline text-blue-500">
              Create a new account
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;
