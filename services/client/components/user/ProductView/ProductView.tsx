import React, { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { authRequired, chatWithSeller, followUser, getSpecificProduct, unFollowUser } from '@/store/actions/userActions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { FiUserCheck } from 'react-icons/fi'
import { ImPower } from 'react-icons/im'
import { BsChatDots } from 'react-icons/bs'
import { PRODUCT_IMAGES_URL } from '@/constants'

const ProductView = () => {
    const dispatch: any = useDispatch()
    const router: any = useRouter()

    const searchParams = useSearchParams();
    const productId: string | any = searchParams.get("product");

    const handleFollow = async ( ) => {
        console.log(`clicked for follow`);
        dispatch(followUser(product?.userId))
    }

    const handleUnfollow = async ( ) => {
        console.log(`clicked for unfollow`);
        dispatch(unFollowUser(product?.userId))
    }

    const handleClickForChat = async () => {
        console.log(`clicked for to chat with seller`);
        dispatch(chatWithSeller(product?.userId))
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(authRequired(router));
                await dispatch(getSpecificProduct(productId));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [productId]);

    const product = useSelector((state: any) => state?.user?.data?.currentProduct)
    const seller = useSelector((state: any) => state?.user?.data?.seller)
    const sellerStatus = useSelector((state: any) => state?.user?.data?.status)

    return (
        <>
            <div className="p-4 pt-6 bg-slate-50">
                <div className="w-full flex justify-center">
                    <img className="sm:w-full md:w-1/2 lg:w-3/4 h-96 p-4 border border-black object-fill" src={`${PRODUCT_IMAGES_URL}/${product?.images[0]}`} alt="" />
                    <div className='bg-slate-50 sm:w-full md:w-1/2 lg:w-1/4'>
                        {product && Object?.keys(product?.inputFields).map(key => (
                            <div className='p-2' key={key}>
                                <h3 className='text-xl'>{key}</h3>
                                <p className='px-2'>{product?.inputFields[key]}</p>
                            </div>
                        ))}
                        {product && Object?.keys(product?.checkBoxes).map(key => (
                            <div className='p-2' key={key}>
                                <h3 className='text-xl'>{key}</h3>
                                <ul className='px-2'>
                                    {product?.checkBoxes[key].map((value: any, index: any) => (
                                        <li key={index}>{value}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {product && Object?.keys(product?.radioButtons).map(key => (
                            <div className='p-2' key={key}>
                                <h3 className='text-xl'>{key}</h3>
                                <p className='px-2'>{product?.radioButtons[key]}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 justify-center mx-20 gap-4 m-2">
                    <div className=" bg-white p-3 shadow">
                        <div className="flex justify-start gap-4">
                            <div className="bg-purple-400 text-teal-50 p-2 rounded-md flex justify-around items-center">
                                <ImPower /> <span className='ps-2'>FEATURED</span>
                            </div>
                            <div className="bg-slate-200 p-2 rounded-md text-slate-700 flex justify-around items-center">
                                <FiUserCheck /> VERIFIED SELLER
                            </div>
                        </div>
                        <>
                            <p>{product?.categoryName}</p>
                            <h1 className="text-3xl font-bold">{product?.productName}</h1>
                            <p className="text-2xl font-bold">&#x20B9; {product?.price} </p>
                            <span> posted on: {product?.createdAt}</span>
                        </>

                    </div>
                    <div className=" bg-white p-3 shadow ">
                        <p className="text-xl font-bold text-black pb-2">Seller details</p>
                        <>
                            <p>{seller?.userName}</p>
                            <div className='w-full flex justify-center items-center gap-2'>
                                {sellerStatus && sellerStatus === "following" && (
                                    <>
                                        <button className='bg-slate-950 px-4 rounded-md'>
                                            <span 
                                            onClick={handleUnfollow}
                                            className='px-4 text-teal-50' >UNFOLLOW</span>
                                        </button>
                                        <button 
                                        onClick={handleClickForChat}
                                        className='bg-slate-700 p-1 text-white'>
                                            <BsChatDots />
                                        </button>
                                    </>
                                )}
                                {sellerStatus && sellerStatus === "not-following" && (
                                    <>
                                        <button 
                                        onClick={handleFollow}
                                        className='bg-slate-950 px-4 rounded-md'>
                                            <span className='px-4 text-teal-50' >FOLLOW</span>
                                        </button>
                                        <button 
                                        onClick={handleClickForChat}
                                        className='bg-slate-700 p-1 text-white'>
                                            <BsChatDots />
                                        </button></>
                                )}
                            </div>
                        </>
                        <>
                            {seller ?
                                '' :
                                <p className="text-red-800">
                                    Sorry for the inconvenience! Seller details are not available.
                                </p>}
                        </>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductView