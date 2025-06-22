"use client"
import { useAuth } from "@/hooks/useAuth";
import React from "react";

export default function AuthProvider({ children } : {children : React.ReactNode}){
    const { loading, auth } = useAuth();

    if(loading){
        return <div>Loading...</div>
    }
    if (!auth) return null; 
    return <>{children}</>
}