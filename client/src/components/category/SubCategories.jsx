import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ModalButton from '../ModalButton';
import UpdateBtn from './UpdateBtn';
import DeleteBtn from './DeleteBtn';
import Form from '../Form';


const api = "http://localhost:5000"
const SubCategories = () => {
    const [allCategories, setAllCategories] = useState([])
    const [allSubCategories, setAllSubCategories] = useState([])

    const getCategoryName = (id) => {
        return allCategories.find(category => category?._id === id)?.name;
    }

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
            <div>
                <ModalButton
                    label={"Create Subcategory"}
                    title="Create Subcategory"
                    Content={({ toggleModal }) => {
                        return (
                            <Form
                                type="subcategory"
                                target="create"
                                allCategories={allCategories}
                                getAllCategories={getAllCategories}
                                onDone={() => toggleModal()}
                            />
                        )
                    }}
                />
            </div>

            <div>
                <div className="container mx-auto mt-6">
                    <h1 className="text-2xl font-semibold mb-4 underline">Subcategories</h1>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className='bg-blue-500 text-white'>
                            <tr>
                                <th className="py-2 px-4 border-b text-left">Category</th>
                                <th className="py-2 px-4 border-b text-left">Name</th>
                                <th className="py-2 px-4 border-b text-left">Description</th>
                                <th className="py-2 px-4 border-b text-left">Status</th>
                                <th className="py-2 px-4 border-b text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allSubCategories?.map((cat, idx) => (
                                <tr key={idx}>
                                    <td className="py-2 px-4 border-b capitalize">{getCategoryName(cat?.parentId)}</td>
                                    <td className="py-2 px-4 border-b capitalize">{cat?.name}</td>
                                    <td className="py-2 px-4 border-b capitalize">{cat?.description}.</td>
                                    <td className="py-2 px-4 border-b capitalize">{cat?.status}</td>
                                    <td className="py-2 px-4 border-b flex gap-3">
                                        <UpdateBtn
                                            type="subcategory"
                                            id={cat?._id}
                                            allCategories={allCategories}
                                            getAllCategories={getAllCategories}
                                        />

                                        <DeleteBtn
                                            type="subcategory"
                                            id={cat?._id}
                                            getAllCategories={getAllCategories}
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

export default SubCategories