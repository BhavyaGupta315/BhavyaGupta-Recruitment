"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { loginSchema } from "@/lib/schemas";

type ErrRes = {
  error: string;
};

type FinalRes = {
  accessToken: string;
  refreshToken: string;
};

type MyRes = ErrRes | FinalRes;

export default function SigninForm(){
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username : "",
        password : ""
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    const handleSignin = async () => {
        try {
            setLoading(true);
            const result = loginSchema.safeParse(formData);
            if (!result.success) {
            const errors = result.error.flatten().fieldErrors;

            const errorMsg =
                errors.username?.[0] ??
                errors.password?.[0] ??
                "Invalid input, please check your credentials.";
                alert(errorMsg);
                return;
            }

            const response = await axios.post<MyRes>("https://tnp-recruitment-challenge.manitvig.live/login", formData);
            if("accessToken" in response.data){
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                router.push("/");
            }else{
                alert("Username or Password Incorrect")
                console.log(response.data.error);
            }
        }catch(e){
            alert("Username or Password Incorrect")
            console.log("Error while logging in ", e);
        }finally{
            setLoading(false);
        }
    }
    
    return <>
        <div className="font-bold text-4xl pt-6" >
            Sign In
        </div>
        <div className="text-slate-500 text-md pt-1 px-4 pb-4">
            Enter Your Credentials
        </div>
        <div>
            <div className="text-sm font-medium text-left py-2">
                Username
            </div>
            <input placeholder="Enter your Username" onChange={handleChange} className="w-full px-2 py-1 border rounded border-slate-200" name="username"/>
        </div>
        <div>
            <div className="text-sm font-medium text-left py-2">
                Password
            </div>
            <input placeholder="Enter your Password" onChange={handleChange} className="w-full px-2 py-1 border rounded border-slate-200" name="password" type="password"/>
        </div>
        <div className="py-4">
            <Button onClick={handleSignin}>{loading ? "Signing in..." : "Sign in"}</Button>
        </div>
    </>
}