import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ArrowLeftIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileSchema, UserProfileSchema } from "@/lib/schema/schema";
import { Button } from "@/components/ui/button";
import { FieldErrors } from "react-hook-form";

const EditProfile = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<UserProfileSchema>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      bio: "",
      phone: "",
    },
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const onSubmit = (data: UserProfileSchema) => {
    console.log("Form Data:", data);
    console.log("Images:", thumbnail); // images from useState
    // Send data + images to API
  };
  const onError = (errors: FieldErrors<UserProfileSchema>) => {
    console.error("Validation Errors:", errors);
  };
  //change these to update the profile
  return (
    <div>
      <div>
        <div className="px-3 pt-3">
          <div onClick={() => window.history.back()}>
            <ArrowLeftIcon size={40} />
          </div>
        </div>
        <div className="flex w-full justify-center text-xl font-semibold">
          Edit Profile
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col items-center justify-center w-full h-full gap-y-4 py-5"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea {...register("bio")} id="bio" placeholder="bio" />
          {errors.bio && (
            <p className="text-sm text-red-500">{errors.bio.message}</p>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input
            {...register("phone", { valueAsNumber: true })}
            type="number"
            id="price"
            placeholder="Price"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="w-full">
          <div className="grid w-full items-center justify-center gap-1.5 mb-3">
            <Label htmlFor="images">Profile Thumbnail</Label>
            <Input
              type="file"
              id="images"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setThumbnail(e.target.files[0]);
                }
              }}
            />
          </div>
          <div className="p-2 flex w-full justify-center items-center  gap-1.5">
            {thumbnail && (
              <div className="relative w-[75%]">
                <img
                  src={thumbnail ? URL.createObjectURL(thumbnail) : ""}
                  alt="uploaded image"
                  className=" w-full aspect-square object-cover border border-black rounded-xl shadow-xl "
                />
                <div
                  className="absolute top-1 right-1 cursor-pointer bg-neutral-800 text-white rounded-full px-3 py-1"
                  onClick={() => setThumbnail(null)}
                >
                  <X size={32} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full justify-center items-center ">
          <div className="flex w-2/3 justify-end">
            <Button className="cursor-pointer" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
