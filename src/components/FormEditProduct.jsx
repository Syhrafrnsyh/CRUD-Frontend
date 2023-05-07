import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const FormEditProduct = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState('')
  const [msg, setMsg] = useState('')
  const [preview, setPreview] = useState('')
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/products/${id}`)
        setName(response.data.name)
        setPrice(response.data.price)
        setFile(response.data.image)
        setPreview(response.data.url)
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg)
        }
      }
    }
    getProductById()
  }, [id])

  const loadImage = (e) => {
    const image = e.target.files[0]
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }

  const updateProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)
    formData.append('price', price)
    try {
      await axios.patch(`http://localhost:5000/products/${id}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      navigate('/products')
    } catch (error) {
      // console.log(error);
      if (error.response) {
        setMsg(error.response.data.msg)
      }
    }
  }

  // const updateProduct = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.patch(`http://localhost:5000/products/${id}`, {
  //       name: name,
  //       price: price,
  //     });
  //     navigate("/products");
  //   } catch (error) {
  //     if (error.response) {
  //       setMsg(error.response.data.msg);
  //     }
  //   }
  // };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Edit Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Image</label>
                <div className="control">
                  <div className="file">
                    <label className="file-label">
                      <input
                        type="file"
                        className="file-input"
                        onChange={loadImage}
                      />
                      <span className="file-cta">
                        <span className="file-label">Choose a file...</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {preview ? (
                <figure className="image is-128x128">
                  <img src={preview} alt="Preview Image" />
                </figure>
              ) : (
                ''
              )}

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormEditProduct
