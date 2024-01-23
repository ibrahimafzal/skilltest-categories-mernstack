import React, { useEffect, useState } from 'react'
import ModalButton from '../ModalButton'
import Form from '../Form'
import axios from 'axios'
import UpdateBtn from './UpdateBtn'
import DeleteBtn from './DeleteBtn'

const api = "http://localhost:5000"

const Categories = () => {
    const [allCategories, setAllCategories] = useState([])
    const [allSubCategories, setAllSubCategories] = useState([])

    const getAllCategories = async () => {
        const { data } = await axios.get(`${api}/category/all-categories`)
        const updatedData = data.filter((i => i.parentId === null))
        setAllCategories(updatedData)

        const updatedSubCat = data.filter((i => i.parentId !== null))
        setAllSubCategories(updatedSubCat)
    }

    useEffect(() => {
        getAllCategories()
    }, [])


    return (
        <div>
            <div className='flex gap-6'>
                <div>
                    <ModalButton
                        label={"Create new Category"}
                        title="Create Category"
                        Content={({ toggleModal }) => {
                            return (
                                <Form
                                    type="category"
                                    getAllCategories={getAllCategories}
                                    onDone={() => toggleModal()}
                                    target="create"
                                />
                            )
                        }}
                    />
                </div>
            </div>

            {/* category tables */}
            <div>
                <div className="container mx-auto mt-6">
                    <h1 className="text-2xl font-semibold mb-4 underline">Categories</h1>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className='bg-blue-500 text-white'>
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Name</th>
                                <th className="py-2 px-4 border-b text-left">Description</th>
                                <th className="py-2 px-4 border-b text-left">Status</th>
                                <th className="py-2 px-4 border-b text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allCategories?.map((cat, idx) => (
                                <tr key={idx}>
                                    <td className="py-2 px-4 border-b capitalize">{cat?.name}</td>
                                    <td className="py-2 px-4 border-b capitalize">{cat?.description}.</td>
                                    <td className="py-2 px-4 border-b capitalize">{cat?.status}</td>
                                    <td className="py-2 px-4 border-b flex gap-3">
                                        <UpdateBtn
                                            type="category"
                                            id={cat?._id}
                                            allCategories={allCategories}
                                            getAllCategories={getAllCategories}
                                        />

                                        <DeleteBtn
                                            type="category"
                                            id={cat?._id}
                                            // allCategories={allCategories}
                                            getAllCategories={getAllCategories}
                                            allSubCategories={allSubCategories}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Categories