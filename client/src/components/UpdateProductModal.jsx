import axios from 'axios';
import React, { useState } from 'react'
import Modal from 'react-modal';
import { toast } from 'react-toastify';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px'
  },
};


const api = "http://localhost:5000"
const UpdateProductModal = ({ children, prod }) => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [updatedProduct, setUpdatedProduct] = useState({
    name: prod?.name,
    description: prod?.description,
    price: prod?.price
  })

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const { name, description, price } = updatedProduct

  const onChange = (e) => {
    setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value })
  }

  const updateProduct = async (e, id) => {
    e.preventDefault(); 
    try {
      setLoading(true)
      await axios.put(`${api}/product/update-product/${id}`, updatedProduct)
      setLoading(false)
      setIsOpen(false)
      toast.success("Updated successfully!")
    } catch (error) {
      toast.error(error?.message)
    }
  }

  return (
    <div>
      <div onClick={openModal}>{children}</div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='flex justify-between mb-4'>
          <h2 className='capitalize font-bold text-lg'>{prod.name.substring(0, 30)}...</h2>
          <button className='font-bold bg-gray-200 hover:bg-gray-300 border border-1 rounded-full px-2 flex items-center justify-center' onClick={closeModal}>X</button>
        </div>

        <form onSubmit={(e) => updateProduct(e, prod?._id)}>
          <div>
            <label htmlFor="name" className='text-sm font-semibold mb-1'>Name</label>
            <input
              type="text"
              name='name'
              value={name}
              onChange={onChange}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className='my-3'>
            <label htmlFor="condition" className='text-sm font-semibold mb-1'>Description</label>
            <input
              type="text"
              name='description'
              value={description}
              onChange={onChange}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <label htmlFor="price" className='text-sm font-semibold mb-1'>Price</label>
            <input
              type="text"
              name='price'
              value={price}
              onChange={onChange}
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button type='submit' className='btn w-full bg-green-200 px-3 py-2 mt-3'>{loading ? "Updating..." : "Update"}</button>
        </form>
      </Modal>
    </div>
  )
}

export default UpdateProductModal