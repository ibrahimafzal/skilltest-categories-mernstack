import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UpdateProductModal from './UpdateProductModal'


const api = "http://localhost:5000"
const ProductList = () => {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${api}/product/all-products`)
            setProducts(data)

        } catch (error) {
            console.log(`Error! ${error}`)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])


    const deleteProductHandler = async (id) => {

        const willDelete = window.confirm("Are you sure to delete this product?")

        if (willDelete) {
            await axios.delete(`${api}/product/delete-product/${id}`)
        }

        window.location.reload()

    }

    return (
        <div>
            <Link to={'/create-new-product'} className='bg-green-400 px-4 py-3 rounded-md'>
                <button>Create new Product</button>
            </Link>

            <div className='mt-6'>
                <h1 className="text-2xl mb-5">
                    All Products
                </h1>

                <div className="flex flex-wrap gap-2">
                    {products?.map((prod) => (
                        <div key={prod?._id} className='w-[17rem] h-auto bg-white border border-1 shadow-lg p-2'>
                            <img src={prod?.pic} alt={prod?.name} width={250} height={200} className='flex justify-center min-h-[200px]' />
                            <p className='font-semibold capitalize mt-2'>{prod?.name}</p>
                            <p className='text-red-600 font-semibold'>${prod.price}</p>
                            <div className="flex justify-between mt-1">
                                <UpdateProductModal prod={prod}>
                                    <button className='bg-blue-300 px-2 py-1 rounded-md'>Update</button>
                                </UpdateProductModal>
                                <button
                                    onClick={() => deleteProductHandler(prod?._id)}
                                    className='bg-red-300 px-2 py-1 rounded-md'>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList