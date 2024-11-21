"use client";
import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import FileUpload from "@/components/FileUpload";
import { useToast } from "../ui/use-toast";
import { AlertModal } from "../modal/alert-modal";
import FileUpload from "../file-upload";
import { UploadButton } from "@/libs/uploadthing";
import FileUpload2 from "../file-upload2";
import { ISubCategory } from "@/models/SubCategory";
const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
});
export const IMG_MAX_LIMIT = 3;

const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: "product Name must be at least 3 characters" }),
  category: z.string(),
  // .min(3, { message: "Category Name must be at least 3 characters" })
  subCategory: z.string(),
  // .min(3, { message: "product Name must be at least 3 characters" })
  price: z.coerce.number().min(1, { message: "price must be at least 1" }),
  description: z
    .string()
    .min(10, { message: "description must be at least 10 characters" }),
  // images: z
  //   .array(ImgSchema)
  //   .max(IMG_MAX_LIMIT, { message: "You can only add up to 3 images" })
  // .min(1, { message: "At least one image must be added." }),
});

type productFormValues = z.infer<typeof productSchema>;

interface productFormProps {
  initialData: any | null;
  categories: any;
  subCategories: any;
  statusOptions: any;
}

export const ProductsForm: React.FC<productFormProps> = ({
  initialData,
  categories,
  subCategories,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [images, setImages] = useState<{ url: string; key: string }[]>([]);
  const title = initialData ? "Edit product" : "Create product";
  const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "product updated." : "product created.";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        active: "",
        category: "",
        subCategory: "",
        price: "",
        description: "",
        imgUrl: "",
        images: [],
      };

  const form = useForm<productFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const onSubmit = async (data: productFormValues) => {
    console.log({ onSubmitData: data });
    const formtedData = {
      ...data,
      images: images.map(({ key, url }: any) => ({ url, key })),
      imgUrl: images[0]?.url || "",
    };
    // return alert(JSON.stringify(formtedData))c
    try {
      setLoading(true);
      if (initialData) {
        await axios.put(`/api/product/${initialData._id}`, formtedData);
      } else {
        const res = await axios.post(`/api/product`, formtedData);
        console.log({ data, res });
      }
      router.refresh();
      router.push(`/dashboard/products`);
      toast({
        title: "Success",
        description: toastMessage,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };
  function handleSetImages(data: any) {
    setImages(data);
  }
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/product/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-2">
            <FormField
              // control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUpload
                      onChange={handleSetImages}
                      value={images}
                      onRemove={handleSetImages}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select Category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* @ts-ignore  */}
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.getValues().category.length ? (
              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SubCategory</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select Category"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {/* @ts-ignore  */}
                        {subCategories
                          .filter(
                            (sc: any) =>
                              sc.category === form.getValues().category
                          )
                          .map((subCategory:any) => (
                            <SelectItem
                              key={subCategory._id}
                              value={subCategory._id}
                            >
                              {subCategory.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              ""
            )}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price(Ksh)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="product price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*  */}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
