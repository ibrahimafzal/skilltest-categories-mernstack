import React from 'react'
import ModalButton from '../ModalButton'
import axios from 'axios'
import { toast } from 'react-toastify'


const api = "http://localhost:5000"
const DeleteBtn = ({ id, type, getAllCategories, allSubCategories }) => {

    const deleteHandle = async (id) => {
        try {
            if (type === "category") {
                await axios.delete(`${api}/category/delete-category/${id}`)
                const getSubcategories = allSubCategories.filter(cat => cat?.parentId === id)

                getSubcategories.forEach(async subCat => {
                    await axios.delete(`${api}/category/delete-category/${subCat?._id}`)
                }
                )
            } else {
                await axios.delete(`${api}/category/delete-category/${id}`)
            }
            getAllCategories()
            toast.success("Deleted Successfully!")
            getAllCategories()
        } catch (error) {
            toast.error("Something went wrong!")
        }
    }
    return (
        <div>
            <ModalButton
                title={type === "category" ? `Are you sure to delete this ${type}? All the Subcategories of this category will be deleted.` : `Are you sure to delete this ${type}?`}
                Button={({ toggleModal }) => {
                    return <button onClick={() => toggleModal()}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                }}
                Content={({ toggleModal }) => {
                    return (
                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                onClick={() => deleteHandle(id)}
                                className="text-white bg-red-500 rounded-lg text-nomral font-semibold px-5 py-2.5 mr-2"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => toggleModal()}
                                type="button"
                                className="text-[#202226] bg-gray-200 rounded-lg text-nomral font-semibold px-5 py-2.5"
                            >
                                Cancel
                            </button>
                        </div>
                    )
                }}
            />
        </div>
    )
}

export default DeleteBtn