import { useCreateProductMutation } from "@/app/services/products"
import FormInput from "@/components/formInput/FormInput"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { categories } from "@/data"
import getFileData from "@/utils/getFileData"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { XCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    name: z.string({
        required_error: "Name is required"
    }).min(1, {
        message: "Name is required",
    }),
    description: z.string().min(1, {
        message: "Description is required"
    }),
    feature: z.string().optional(),
    features: z.string().array()
        .nonempty({

        })
        .min(3, {
            message: "features must be atleast 3"
        }).max(6, {
            message: "features must not be more than 5"
        }),
    originalPrice: z.coerce.number({
        invalid_type_error: "Price must be number"
    })
        .finite().safe(),
    price: z.coerce.number({
        invalid_type_error: "Price must be number"
    }).finite().safe(),
    stock: z.coerce.number({
        invalid_type_error: "Stock must be number"
    }).finite().safe(),
    images: z.string().array().nonempty({
        message: "Image is required"
    }).max(3, {
        message: "Images must not be more than 3"
    }),
    category: z.string()
})

function ProductForm() {
    const { toast } = useToast()
    const [createProduct, { isLoading }] = useCreateProductMutation()
    const [features, setFeatures] = useState([])
    const [images, setImages] = useState([])

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            feature: "",
            features: [],
            originalPrice: "",
            price: "",
            stock: 1,
            images: [],
            category: ""
        },
    })

    const featureSubmit = () => {
        const value = form.getValues("feature")
        if (value.length < 1) {
            form.setError("feature", { message: "Enter a feature" }, { shouldFocus: true })
            return
        }
        const features = form.getValues("features")
        form.setValue("features", [...features, value])
        setFeatures([...features, value])
        form.resetField('feature')
    }

    const deleteFeature = (index) => {
        let features = form.getValues("features")
        features.splice(index, 1)
        form.setValue("features", [...features])
        setFeatures(features)
    }

    const handleImage = async (e) => {
        form.clearErrors('images')
        if (!e.target.files) return form.setError("images", { message: "Image is required" })
        if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(e.target.files[0].type)) return form.setError("images", { message: ".jpg, .jpeg, .png and .webp files are accepted." })
        if (e.target.files[0].size > 300000) return form.setError("images", { message: "Max file size is 3MB." })
        const image = await getFileData(e.target.files[0])
        setImages((old) => [...old, image])
        let values = form.getValues("images")
        form.setValue("images", [...values, image])
    }

    const deleteImage = (index) => {
        let imgs = form.getValues("images")
        imgs.splice(index, 1)
        form.setValue("images", [...imgs])
        setImages(imgs)
    }

    async function onSubmit(values) {
        try {
            const { feature, ...data } = values
            const res = await createProduct(data).unwrap()
            toast({
                title: "Completed",
                description: res.message,
                variant: "success",
            })
            form.reset()
            setImages([])
            setFeatures([])
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: error.data.message,
            })
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold font-popins my-8">Create Product</h2>
            <div className="bg-white p-6 min-w-[40rem] flex flex-col gap-6 shadow rounded">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 flex flex-col">
                        <FormInput form={form} name="name" label="Name" />
                        <FormInput form={form} name="description" type="textarea" label="Description" />
                        <FormInput form={form} name="category" list={categories} type="select" label="Category" />
                        <FormInput form={form} name="feature" label="Features" />
                        <Button onClick={featureSubmit} className="mt-3 bg-mytertiory" type="button">
                            Add Feature
                        </Button>
                        <ul className="list-inside list-disc">
                            {features.map((item, i) => (
                                <li key={i}>{item} <a onClick={() => deleteFeature(i)} className="text-red-500 cursor-pointer">Delete</a> </li>
                            ))}
                        </ul>
                        <FormInput form={form} name="features" className="hidden" />
                        <FormInput form={form} name="originalPrice" label="Original Price" type='number' />
                        <FormInput form={form} name="price" label="Price (with discount)" type='number' />
                        <FormInput form={form} name="stock" label="Product Stock" type='number' />
                        <FormInput form={form} name="images" label="Upload Images" handleImage={handleImage} type='image' dp={false} />
                        <div className="flex gap-4 max-w-[80vw] lg:max-w-[50vw] flex-wrap">
                            {images && images.map((item, i) => (
                                <div className="relative group" key={item}>
                                    <img src={item} className="aspect-square object-contain w-[5rem] h-auto" alt="" />
                                    <div className="absolute inset-0 bg-[rgba(255,255,255,.8)] hidden group-hover:flex items-center justify-center">
                                        <XCircle className="cursor-pointer" onClick={() => deleteImage(i)} color="#f00" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button disabled={isLoading} className="mt-3 bg-mytertiory" type="submit">
                            {isLoading ? <><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Submit"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default ProductForm