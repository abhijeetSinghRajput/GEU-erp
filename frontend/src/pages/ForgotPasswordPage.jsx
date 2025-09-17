import React, { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  Loader2,
  Mail,
  User2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "../lib/utils";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import validator from "validator";
import { format } from "date-fns";
import { useStudentStore } from "../stores/useStudentStore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { useCookieStore } from "../stores/useCookieStore";
import { Ring } from "ldrs/react";

const ForgotPasswordPage = ({ className, ...props }) => {
  const { campus } = useCookieStore();
  const { requestPasswordResetLink, sendingMail } = useStudentStore();
  const [formData, setFormData] = useState({
    studentId: "",
    email: "",
    DOB: "",
  });
  const [errors, setErrors] = useState({
    studentId: "",
    email: "",
  });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  const handleInput = (e) => {
    setErrors((prev) => ({ ...prev, [e.target.id]: "" }));
    setAlert({ type: "", message: "" });
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = { studentId: "", email: "" };
    let isValid = true;

    // Student ID validation
    if (validator.isEmpty(formData.studentId.trim())) {
      newErrors.studentId = "Please insert registered Student ID";
      isValid = false;
    }

    // Email validation
    if (validator.isEmpty(formData.email.trim())) {
      newErrors.email = "Please insert registered Email-ID";
      isValid = false;
    } else if (!validator.isEmail(formData.email.trim())) {
      newErrors.email = "Invalid Email format";
      isValid = false;
    }

    // DOB validation
    if (!formData.DOB) {
      setAlert({
        type: "error",
        message: "Please insert registered Date of Birth",
      });
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    const result = await requestPasswordResetLink(formData);

    if (result === "error") {
      setAlert({ type: "error", message: "Please contact ERP Cell" });
    } else if (result === "renew") {
      setAlert({
        type: "error",
        message: "Your service is expired, please renew it",
      });
    } else if (result === "NotMatch") {
      setAlert({
        type: "error",
        message: "Please verify your details and try again",
      });
    } else if (result === "0") {
      setAlert({
        type: "success",
        message:
          "Your new password has been sent to your registered mobile number",
      });
    } else {
      setAlert({
        type: "success",
        message:
          "Please check your registered Email (Inbox/Spam) to reset password.",
      });
      setFormData({ studentId: "", email: "", DOB: "" });
      setDate(null);
    }
  };

  return (
    <div className="h-svh">
      <Header />
      <div className="max-w-md p-4 mx-auto flex items-center justify-center mt-8">
        <div className={cn("flex flex-col gap-6 w-full", className)} {...props}>
          <form onSubmit={handleSubmit}>
            {/* Alert for form-level messages */}

            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2">
                {alert.message ? (
                  <Alert
                    variant={alert.type === "error" ? "destructive" : "default"}
                    className="mb-4"
                  >
                    {alert.type === "error" ? (
                      <AlertCircle className="h-4 w-4" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    <AlertTitle>
                      {alert.type === "error" ? "Error" : "Success"}
                    </AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                  </Alert>
                ) : (
                  <a
                    href="#"
                    className="flex flex-col items-center gap-2 font-medium"
                  >
                    <div className="flex size-24 items-center justify-center rounded-md">
                      <img
                        src={
                          campus === "hill"
                            ? "./gehu-circular-logo.png"
                            : "./geu-circular-logo.png"
                        }
                        alt="University Logo"
                      />
                    </div>
                  </a>
                )}
                <h1 className="text-xl font-bold">FORGOT PASSWORD</h1>
              </div>

              <div className="flex flex-col gap-4">
                {/* Student ID */}
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

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative rounded-md">
                    <span className="absolute top-0 text-muted-foreground h-full border-r left-0 flex items-center justify-center w-8">
                      <Mail className="size-5" />
                    </span>
                    <Input
                      id="email"
                      value={formData.email}
                      type="email"
                      onChange={handleInput}
                      placeholder="Enter your email"
                      className={`h-11 rounded-lg focus-visible:ring-2 px-9 bg-input/30 ${
                        errors.email ? "ring-2 ring-destructive" : ""
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>

                {/* DOB */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="DOB" className="px-1">
                    Date of birth
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="DOB"
                        className="justify-between font-normal w-full h-11 bg-input/30"
                      >
                        {formData.DOB ? formData.DOB : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        className={"bg-card"}
                        onSelect={(selected) => {
                          if (selected) {
                            setDate(selected);
                            setFormData((prev) => ({
                              ...prev,
                              DOB: format(selected, "dd/MM/yyyy"),
                            }));
                            setOpen(false);
                          }
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 rounded-lg"
                  disabled={sendingMail}
                >
                  {sendingMail ? (
                    <>
                      <Ring
                        size={20}
                        speed={1.5}
                        stroke={2}
                        color="hsl(var(--primary-foreground))"
                      />
                      Please wait...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
