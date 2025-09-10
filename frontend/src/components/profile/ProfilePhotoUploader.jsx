import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent } from "../ui/card";
import {
  Upload,
  Image as ImageIcon,
  Loader2,
  X,
  UserRoundPenIcon,
  Pen,
  Camera,
} from "lucide-react";
import imageCompression from "browser-image-compression";
import { useStudentStore } from "../../stores/useStudentStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProfilePhotoUploader = () => {
  const { idCard, updateAvatar, uploadingAvatar } = useStudentStore();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [compressing, setCompressing] = useState(false);
  const [fileSize, setFileSize] = useState(null);
  const inputRef = useRef(null);

  const compressImage = async (imageFile) => {
    const options = {
      maxSizeMB: 0.04, // 40KB
      maxWidthOrHeight: 250,
      useWebWorker: true,
      fileType: "image/jpeg",
      initialQuality: 0.85,
    };

    try {
      setCompressing(true);
      let compressedFile = await imageCompression(imageFile, options);

      if (compressedFile.size > 40000) {
        const lowerQualityOptions = { ...options, initialQuality: 0.7 };
        compressedFile = await imageCompression(imageFile, lowerQualityOptions);
      }

      return compressedFile;
    } catch (error) {
      console.error("Error compressing image:", error);
      throw error;
    } finally {
      setCompressing(false);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(selectedFile.type)) {
      alert("Only JPG, JPEG, PNG formats are supported.");
      return;
    }

    try {
      const compressedFile = await compressImage(selectedFile);
      setFile(compressedFile);
      setFileSize((compressedFile.size / 1024).toFixed(2)); // in KB
      setPreview(URL.createObjectURL(compressedFile));
    } catch (error) {
      alert("Error processing image: " + error.message);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    updateAvatar(file);
    // Reset state after upload
    // handleRemove();
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setFileSize(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="secondary">
          <Camera />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <DialogTitle>Upload Profile Photo</DialogTitle>
        </DialogHeader>

        <Card className="border-none shadow-none">
          <CardContent className="flex flex-col items-center gap-4 p-4">
            <div className="relative">
              <Avatar className="size-32">
                <AvatarImage src={preview || idCard?.Photo} />
                <AvatarFallback>
                  <img src="/avatar.svg" className="opacity-30" />
                </AvatarFallback>
              </Avatar>
              {preview && (
                <Button
                  onClick={handleRemove}
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -right-2 rounded-full size-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {fileSize && (
              <p className="text-sm text-muted-foreground">
                Compress to: <span className="font-medium">{fileSize} KB</span>
              </p>
            )}

            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              ref={inputRef}
              className="hidden"
              onChange={handleFileChange}
              disabled={compressing}
            />

            <div className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => inputRef.current.click()}
                disabled={compressing || uploadingAvatar}
              >
                <ImageIcon /> Choose
              </Button>

              <Button
                onClick={handleUpload}
                disabled={!file || compressing || uploadingAvatar}
                className="flex items-center gap-2"
              >
                {uploadingAvatar ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload /> Upload
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePhotoUploader;
