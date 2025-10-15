import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, validateLoginForm } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  ExternalLink,
  Eye,
  EyeOff,
  Lock,
  RefreshCw,
  ShieldCheck,
  User2,
  Users,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExpandableSwitch from "../components/ExpandableSwitch";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Ring } from "ldrs/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertTitle } from "@/components/ui/alert";

export function LoginPage({ className, ...props }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState([]);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const { captchaImage, loadingCaptcha, getCaptcha, loggingIn, login, error } =
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

  // Load saved accounts on mount
  useEffect(() => {
    getCaptcha();
    loadSavedAccounts();
    attemptAutoFill();
  }, []);

  const loadSavedAccounts = () => {
    if (window.CredentialManager && window.CredentialManager.getAllAccounts) {
      try {
        const accountsJson = window.CredentialManager.getAllAccounts();
        const accounts = JSON.parse(accountsJson);
        setSavedAccounts(accounts);
      } catch (e) {
        console.error("Error loading accounts:", e);
      }
    }
  };

  const attemptAutoFill = () => {
    if (
      window.CredentialManager &&
      window.CredentialManager.hasSavedAccounts &&
      window.CredentialManager.hasSavedAccounts()
    ) {
      setTimeout(() => {
        const username = window.CredentialManager.getLastUsedUsername();
        const password = window.CredentialManager.getLastUsedPassword();

        if (username && password) {
          setFormData((prev) => ({
            ...prev,
            studentId: username,
            password: password,
          }));
        }
      }, 300);
    }
  };

  const handleInput = (e) => {
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

    if (result) {
      // Save credentials using CredentialManager
      if (
        window.CredentialManager &&
        window.CredentialManager.saveCredentials
      ) {
        window.CredentialManager.saveCredentials(
          formData.studentId,
          formData.password
        );
        loadSavedAccounts(); // Reload account list
      }

      navigate("/");
    }
    else{
      setFormData(prev=>({
        ...prev,
        captcha: '',
      }))
    }
  };

  const handleAccountSelect = (username) => {
    if (
      window.CredentialManager &&
      window.CredentialManager.getPasswordForUsername
    ) {
      const password =
        window.CredentialManager.getPasswordForUsername(username);

      setFormData((prev) => ({
        ...prev,
        studentId: username,
        password: password,
      }));

      // Set as last used account
      if (window.CredentialManager.setLastUsedAccount) {
        window.CredentialManager.setLastUsedAccount(username);
      }

      setShowAccountMenu(false);
    }
  };

  const handleDeleteAccount = (username, e) => {
    e.stopPropagation();

    if (window.confirm(`Delete saved credentials for ${username}?`)) {
      if (window.CredentialManager && window.CredentialManager.deleteAccount) {
        window.CredentialManager.deleteAccount(username);
        loadSavedAccounts();

        // Clear form if deleted account was selected
        if (formData.studentId === username) {
          setFormData({
            studentId: "",
            password: "",
            captcha: formData.captcha,
          });
        }
      }
    }
  };

  const handleClearAllAccounts = () => {
    if (window.confirm("Delete all saved credentials?")) {
      if (
        window.CredentialManager &&
        window.CredentialManager.clearAllCredentials
      ) {
        window.CredentialManager.clearAllCredentials();
        setSavedAccounts([]);
        setFormData({
          studentId: "",
          password: "",
          captcha: formData.captcha,
        });
      }
    }
  };

  return (
    <div className="h-svh">
      <Header />
      <div className="max-w-md p-4 mx-auto flex items-center justify-center mt-8">
        <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
          <form onSubmit={handleLogin}>
            {errors.form && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
                {errors.form}
              </div>
            )}

            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                <h1 className="text-xl font-bold">
                  Welcome to{" "}
                  <span className="text-red-500 font-serif">Graphic Era</span>
                </h1>
                <div>
                  <ExpandableSwitch />
                </div>
              </div>
              {(error.login || error.getCaptcha) && (
                <Alert variant="destructive" className="text-center">
                  <AlertTitle>{error.login || error.getCaptcha}</AlertTitle>
                </Alert>
              )}

              <div className="flex flex-col gap-4">
                {/* Student ID Field with Account Selector */}
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

                  <div className="flex gap-2">
                    <div className="relative rounded-md flex-1">
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

                    {/* Account Dropdown */}
                    {savedAccounts.length > 0 && (
                      <DropdownMenu
                        open={showAccountMenu}
                        onOpenChange={setShowAccountMenu}
                      >
                        <DropdownMenuTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-11 px-3"
                          >
                            <Users className="size-5" />
                            <ChevronDown className="size-4 ml-1" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64">
                          <DropdownMenuLabel className="flex items-center justify-between">
                            <span>Saved Accounts ({savedAccounts.length})</span>
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />

                          {savedAccounts.map((account) => (
                            <DropdownMenuItem
                              key={account.username}
                              onClick={() =>
                                handleAccountSelect(account.username)
                              }
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <User2 className="size-4" />
                                <span className="font-medium">
                                  {account.username}
                                </span>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
                                onClick={(e) =>
                                  handleDeleteAccount(account.username, e)
                                }
                              >
                                <Trash2 className="size-3" />
                              </Button>
                            </DropdownMenuItem>
                          ))}

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={handleClearAllAccounts}
                            className="text-destructive focus:text-destructive cursor-pointer"
                          >
                            <Trash2 className="size-4 mr-2" />
                            Clear All Accounts
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
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
                  disabled={loadingCaptcha || loggingIn || !captchaImage}
                  className="w-full h-11 rounded-lg"
                >
                  Login
                  {loggingIn && (
                    <Ring
                      size={20}
                      speed={1.5}
                      stroke={2}
                      color="hsl(var(--primary-foreground))"
                    />
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
            "The portal does not store any credentials and is fully open-source.
            You can verify our security practices by reviewing the source code."
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
