import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const api = "http://localhost:5000"
const AddProduct = () => {
    const [product, setProduct] = useState({ name: '', description: '', price: '', pic: '' })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const postDetails = (pic) => {
        if (pic === undefined) {
            toast.warn("Please select an image!")
        }

        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const formData = new FormData()
            formData.append('file', pic)
            formData.append('upload_preset', 'upload')
            formData.append('cloud_name', 'cloudinaryphoto')
            fetch("https://api.cloudinary.com/v1_1/cloudinaryphoto/image/upload", {
                method: 'post',
                body: formData
            })
                .then((res) => res.json())
                .then((res) => {
                    setProduct({ ...product, pic: res.url.toString() })
                    toast.success('Picture uploaded successfully!')
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            toast.warn("Please select an image!")
            setLoading(false)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.post(`${api}/product/`, product)
            setLoading(false)

            if (data) {
                toast.success("Product Added Successfully")
                navigate("/")
            }

        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.msg)
        }
    }



    return (
        <div className=''>
            <h1 className='text-2xl font-bold'>Create a new Product</h1>
            <form className='mt-3' onSubmit={submitHandler}>
                <div className=''>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        className="block w-25 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>

                <div className='my-3'>
                    <label htmlFor="description">Description: </label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        rows="4"
                        onChange={handleChange}
                        className="block w-25 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>

                <div className=''>
                    <label htmlFor="price">Price: </label>
                    <input
                        type="text"
                        name="price"
                        id="price"
                        onChange={handleChange}
                        className="block w-25 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>

                <div className='my-3'>
                    <label htmlFor="price">Upload Picture: </label>
                    <input
                        type="file"
                        name="pic"
                        id="pic"
                        onChange={(e) => postDetails(e.target.files[0])}
                        className="block w-25 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>

                <button
                    type='submit'
                    className='bg-green-400 px-3 py-2 rounded-md'
                >
                    {loading ? "Creating" : "Create"}
                </button>
            </form>
        </div>
    )
}

export default AddProduct