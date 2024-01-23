import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const api = "http://localhost:5000"
const Form = ({ onDone, type, target, allCategories, getAllCategories, id }) => {
    const [category, setCategory] = useState({ name: "", description: "", status: "", parentId: null })

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (!id) return
        axios.get(`${api}/category/single-category/${id}`).then(
            (res) => setCategory(res?.data)
        )
    }, [])


    const submitHandler = async () => {
        if (target === "create") {
            try {
                // create
                const { data } = await axios.post(`${api}/category/`, category)
                setCategory(data)
                toast.success(type === "category" ? "Category created successfully!" : "Subcategory created successfully!")
                onDone()
                getAllCategories()
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.msg)
            }
        } else {
            // update
            try {
                await axios.put(`${api}/category/update-category/${id}`, category)
                toast.success(type === "category" ? "Category updated successfully!" : "Subcategory updated successfully!")
                onDone()
                getAllCategories()
            } catch (err) {
                console.log(err);
                toast.error('Something went wrong!')
            }
        }
    }

    return (
        <div>
            <div>
                <form>
                    <input
                        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        type="text"
                        name='name'
                        placeholder='Name'
                        value={category?.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className="block w-full my-3 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name='description'
                        placeholder='Description'
                        value={category?.description}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        className="block w-full mb-3 rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name='status'
                        placeholder='Status'
                        value={category?.status}
                        onChange={handleChange}
                    />
                    <div className="flex items-center">
                        {type === "subcategory" &&
                            <select
                                type="text"
                                name="parentId"
                                id="department"
                                className="mb-3 mt-1 block bg-white w-full rounded-md border border-gray-300 shadow-sm sm:text-sm py-2 px-1"
                                onChange={handleChange}
                                value={category?.parentId || ""}
                            >
                                <option>Select Category</option>
                                {allCategories.map((cat) => (
                                    <option className='capitalize' value={cat?._id} key={cat?._id}>
                                        {cat?.name}
                                    </option>
                                ))}
                            </select>}
                    </div>
                </form>
            </div>
            <div className="mt-4 flex justify-end">
                <button
                    type="submit"
                    onClick={submitHandler}
                    className="text-white bg-blue-500 rounded-lg text-nomral font-semibold px-5 py-2.5 mr-2 "
                >
                    {target === "create" ? "Create" : "Update"}
                </button>
                <button
                    onClick={() => onDone()}
                    type="button"
                    className="text-[#202226] bg-gray-200 rounded-lg text-nomral font-semibold px-5 py-2.5 "
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default Form