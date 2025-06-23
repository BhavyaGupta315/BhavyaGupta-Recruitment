"use client"
import AuthProvider from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { Copy } from "lucide-react";
import { useState } from "react";

type ErrRes = {
  error: string;
};

type FinalRes = {
  shareToken : string;
};

type MyRes = ErrRes | FinalRes;

export default function Home(){
  const { logout } = useAuth();
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullUrl = `${location.origin}/data/${link}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleOnClick = async () => {
    try{
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post<MyRes>("https://tnp-recruitment-challenge.manitvig.live/share",{},{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
      if("shareToken" in res.data){
          setLink(res.data.shareToken);
          setLoading(false);
          return;
      }else{
        alert("Failed to generate link. Try re-logging in.");
      }
    }catch (e){
      console.log("Error while generating Link - ", e);
      alert("Something went wrong.");
    }finally{
      setLoading(false);
    }
  }
  return (
    <div>
      <AuthProvider>
        <div className="h-screen w-full border flex justify-center">
          <div className="border-2 w-full flex flex-col max-w-3xl">
            <div className="border rounded-xl h-[35%] p-4 shadow-sm bg-gray-200 dark:bg-transparent">
              <div className="flex justify-end">
                <Button
                  onClick={logout}
                  className="text-sm font-medium mt-2 hover:underline hover:cursor-pointer"
                >
                  Logout
                </Button>
              </div>

              <div className="flex justify-center items-center h-full text-6xl font-bold tracking-wide">
                Admin Panel
              </div>
            </div>
          <div className="w-full flex flex-col items-center gap-6">
            <div className="flex justify-center items-center p-8">
              <Button
                className="text-lg px-6 py-3 font-semibold rounded-xl border transition hover:scale-101 hover:cursor-pointer"
                onClick={handleOnClick}
              >
                {loading ? "Generating..." : "Generate Shareable Link"}
              </Button>
              {/* We can also use a checkbox here, to enable or disable the link manually.*/}
            </div>
            {link !== "" && (
              <div className="max-w-2xl w-full px-4 text-center">
                <p className="mb-2 text-sm font-medium">Shareable Link:</p>
                <div className="flex items-center justify-between p-3 border rounded-lg shadow-sm">
                  <a
                    className="text-sm text-left truncate flex-1"
                    href={`/data/${link}`}
                    target="_blank"
                  >
                    {`${location.origin}/data/${link}`}
                  </a>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 px-3 py-1.5 border rounded-md text-xs hover:bg-gray-100 hover:cursor-pointer transition"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      </AuthProvider>
    </div>
  );
}
