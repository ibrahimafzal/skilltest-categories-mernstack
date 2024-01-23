import React, { useState } from 'react'
import Categories from './Categories'
import Products from '../../pages/Products'
import SubCategories from './SubCategories'

const SideBar = () => {
    const [activeTab, setActiveTab] = useState("categories")


    return (
        <div className='flex'>
            <div className='flex flex-col gap-5 w-1/5 mr-6 bg-blue-500 shadow-lg h-[49rem] px-3 py-6 rounded-lg'>
                <button
                    className='text-white text-xl'
                    onClick={() => setActiveTab("categories")}
                >
                    Categories
                </button>

                <button
                    className='text-white text-xl'
                    onClick={() => setActiveTab("subcategories")}
                >
                    Subcategories
                </button>

                <button
                    className='text-white text-xl'
                    onClick={() => setActiveTab("products")}
                >
                    Products
                </button>
            </div>

            <div className='bg-white w-full shadow-lg px-4 py-3 rounded-lg'>
                {
                    (activeTab === "categories" && <Categories />) ||
                    (activeTab === "subcategories" && <SubCategories />) ||
                    (activeTab === "products" && <Products />)
                }
            </div>
        </div>
    )
}

export default SideBar