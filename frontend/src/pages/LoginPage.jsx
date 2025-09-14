import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, validateLoginForm } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  BookOpen,
  ExternalLink,
  Eye,
  EyeOff,
  ImageOff,
  Loader2,
  Lock,
  RefreshCw,
  ShieldCheck,
  User2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CodeBlock } from "@/components/ui/code-block";
import ExpandableSwitch from "../components/ExpandableSwitch";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

export function LoginPage({ className, ...props }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { captchaImage, loadingCaptcha, getCaptcha, logningIn, login } =
    useAuthStore();

  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
    captcha: "",
  });
  const [errors, setErrors] = useState({
    studentId: "",
    password: "",
    captcha: "",
    form: "",
  });

  useEffect(() => {
    getCaptcha();
  }, []);

  const handleInput = (e) => {
    // Clear error for this field when typing
    setErrors((prev) => ({ ...prev, [e.target.id]: "", form: "" }));
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateLoginForm(formData, setErrors)) return;
    const result = await login(formData);
    if (result) navigate("/");
  };

  return (
    <div className="h-svh">
      <Header />
      <div className="max-w-md p-4 mx-auto flex items-center justify-center mt-8">
        <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
          <form onSubmit={handleLogin}>
            {/* Display form-level error */}
            {errors.form && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
                {errors.form}
              </div>
            )}

            <div className="flex flex-col gap-6">
              {/* University logo and title... */}
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-bold">
                  Welcome to{" "}
                  <span className="text-red-500 font-serif">Graphic Era</span>
                </h1>
                <div>
                  <ExpandableSwitch />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {/* Student ID Field */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="studentId">Student Id</Label>
                    <Link
                      to={"/forgot-id"}
                      className="text-sm text-muted-foreground font-medium underline-offset-4 hover:underline"
                    >
                      Forgot your id?
                    </Link>
                  </div>
                  <div className="relative rounded-md">
                    <span className="absolute top-0 text-muted-foreground h-full border-r left-0 flex items-center justify-center w-8">
                      <User2 className="size-5" />
                    </span>
                    <Input
                      id="studentId"
                      value={formData.studentId}
                      onChange={handleInput}
                      placeholder="Enter your Student Id"
                      className={`h-11 rounded-lg focus-visible:ring-2 pl-9 bg-input/30 ${
                        errors.studentId ? "ring-2 ring-destructive" : ""
                      }`}
                    />
                  </div>
                  {errors.studentId && (
                    <p className="text-red-500 text-xs">{errors.studentId}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to={"/forgot-password"}
                      className="text-sm text-muted-foreground font-medium underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="relative rounded-md">
                    <span className="absolute top-0 text-muted-foreground h-full border-r left-0 flex items-center justify-center w-8">
                      <Lock className="size-5" />
                    </span>
                    <Input
                      id="password"
                      value={formData.password}
                      type={showPassword ? "text" : "password"}
                      onChange={handleInput}
                      placeholder="Enter your password"
                      className={`h-11 rounded-lg focus-visible:ring-2 px-9 bg-input/30 ${
                        errors.password ? "ring-2 ring-destructive" : ""
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-muted-foreground rounded-l-none size-5 h-full absolute top-0 right-0"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs">{errors.password}</p>
                  )}
                </div>

                {/* Captcha Field */}
                <div className="grid gap-2">
                  {loadingCaptcha ? (
                    <Skeleton className={"h-14 rounded-none"} />
                  ) : (
                    <Avatar className="h-14 rounded-none border w-full bg-white mx-auto">
                      <AvatarImage
                        className="w-full h-full object-contain"
                        src={captchaImage}
                        alt="captchaImage"
                      />
                      <AvatarFallback className="text-sm flex gap-2 items-center font-medium text-muted-foreground/50 rounded-none w-full h-full">
                        Failed To Load Captcha
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div className="relative rounded-md">
                    <span className="absolute top-0 text-muted-foreground h-full border-r left-0 flex items-center justify-center w-8">
                      <ShieldCheck className="size-5" />
                    </span>
                    <Input
                      id="captcha"
                      value={formData.captcha}
                      onChange={handleInput}
                      placeholder="Fill the Captcha"
                      disabled={loadingCaptcha || !captchaImage}
                      autoComplete="off"
                      className={`h-11 rounded-lg focus-visible:ring-2 pl-9 bg-input/30 ${
                        errors.captcha ? "ring-2 ring-destructive" : ""
                      }`}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-muted-foreground rounded-l-none size-5 h-full absolute top-0 right-0"
                      onClick={getCaptcha}
                      disabled={loadingCaptcha}
                    >
                      <RefreshCw
                        className={loadingCaptcha ? "animate-spin" : ""}
                      />
                    </Button>
                  </div>
                  {errors.captcha && (
                    <p className="text-red-500 text-xs">{errors.captcha}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loadingCaptcha || logningIn || !captchaImage}
                  className="w-full h-11 rounded-lg"
                >
                  Login
                  {logningIn && (
                    <Loader2 className="animate-spin ml-2" size={16} />
                  )}
                </Button>
              </div>
            </div>
          </form>

          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <Link
              to={"/privacy-policy"}
              className="text-muted-foreground font-medium underline-offset-4 underline"
            >
              Privacy Policy
            </Link>
          </div>
          <blockquote className="text-sm text-muted-foreground bg-input/30 border-l-2 p-2 rounded-md overflow-hidden border-accent pl-4 italic">
            “The portal does not store any credentials and is fully open-source.
            You can verify our security practices by reviewing the source code.”
            <a
              href="https://github.com/abhijeetSinghRajput/geu-erp"
              target="_blank"
              className="inline-flex items-center gap-1 underline underline-offset-4 text-primary font-medium ml-1"
            >
              github
              <ExternalLink size={14} />
            </a>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
