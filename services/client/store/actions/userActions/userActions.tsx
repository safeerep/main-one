import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signUpCredentialsWithOtp, signInCredentials } from "@/types/user";
import { USERS_SERVICE_BASE_URL, PRODUCT_SERVICE_BASE_URL, CHAT_SERVICE_BASE_URL } from '../../../constants/index'
import toast from "react-hot-toast";


export const register = createAsyncThunk('/user/register', async ({userCredentials, setIsModalOpen, router, setModalError}:
    {userCredentials: signUpCredentialsWithOtp, setIsModalOpen: any, router: any, setModalError: any}) => {
    try {
        const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/user/signup`, { ...userCredentials }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response) {
            console.log('hey ');
            console.log(response);
            
            if (response?.data?.success) {
                // close the modal
                setModalError(response?.data?.message)
                setIsModalOpen(false);
                router.push('/')
            }
            else {
                // otp is not matching
                setModalError(response?.data?.message)
            }
            return response.data;
        } else {
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        // when response with status 401
        console.log(error?.response?.data?.message);
        setModalError(error?.response?.data?.message)
        return {
            message: 'otp is not matching'
        }
    }
})


export const sendOtp = createAsyncThunk('/user/send-otp-for-signup',
    async ({ userCredentials, setError, setCredentials, setIsModalOpen }: { userCredentials: any, setError: any, setCredentials: any, setIsModalOpen: any }) => {
        try {
            const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/user/send-otp-for-signup`, { ...userCredentials }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                if (response?.data?.success) {
                    setError()
                    setCredentials(userCredentials)
                    setIsModalOpen(true);
                }
                else {
                    setError(response?.data?.message)
                }
                console.log(response?.data);
                return response?.data;
            } else {
                throw new Error(response?.data?.message)
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    })


export const login = createAsyncThunk('/user/login',
    async ({ userCredentials, router, setError }: { userCredentials: signInCredentials, router: any, setError: React.Dispatch<React.SetStateAction<any>> }) => {
        try {
            const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/user/signin`, { ...userCredentials }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response) {
                if (response.data.success) router.push('/')
                else if (!response.data.success) setError(response?.data?.message)
            } else throw new Error(response?.data?.message)
        } catch (error: any) {
            // when response with status 401
            console.log(error.response.data);
            setError(error?.response?.data?.message)
            return error.response.data
        }
    })

export const checkAuth = createAsyncThunk('/user/check-auth', async (router: any) => {
    try {
        const response: any = await axios.get(`${USERS_SERVICE_BASE_URL}/user/check-auth`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response?.data) {
            console.log('check auth response');
            console.log(response.data.userData);
            console.log(response.data.success);
            if (response.data.success) router.push('/')
            return response.data;
        } else {
            console.log('in else');
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        console.log('something went wrong', error);
    }
})

export const authRequired = createAsyncThunk('/user/auth-required', async (router: any) => {
    try {
        const response: any = await axios.get(`${USERS_SERVICE_BASE_URL}/user/check-auth`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response?.data) {
            if (!response.data.success) router.push('/sign-up')
            else return response.data;
        } else {
            console.log('in else');
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        console.log('something went wrong', error);
    }
})


export const logout = createAsyncThunk('/user/logout', async (router: any) => {
    try {
        const response: any = await axios.get(`${USERS_SERVICE_BASE_URL}/user/logout`, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        })
        if (response?.data) {
            if (response.data.success) router.push('/')
            return response.data;
        } else {
            throw new Error(response?.data?.message)
        }
    } catch (error: any) {
        console.log('something went wrong', error);
    }
})

export const sendEmailToResetPassword = createAsyncThunk('/user/send-email',
    async ({ userEmail, setSuccess, setError }: { userEmail: any, setSuccess: any, setError: any }) => {
        try {
            const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/user/send-reset-password-email`,
                { ...userEmail }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                if (response?.data?.success) {
                    setError(null)
                    setSuccess(response?.data?.message)
                }
                else {
                    setSuccess(null)
                    setError(response?.data?.message)
                };
            }
            else throw new Error('something went wrong')
        } catch (error: any) {
            console.log('something went wrong', error);
        }
    }
)


export const RequestToResetPassword = createAsyncThunk('/user/reset-password',
    async ({ passwords, token, setSuccess, setError, router }: { passwords: any, token: string, setSuccess: any, setError: any, router: any }) => {
        try {
            const response: any = await axios.post(`${USERS_SERVICE_BASE_URL}/user/change-password`,
                { ...passwords, token }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                if (response?.data?.success) {
                    setError(null)
                    setSuccess(response?.data?.message)
                    router.push('/')
                    return response?.data;
                }
                else {
                    setSuccess(null)
                    setError(response?.data?.message)
                };
            }
            else throw new Error('something went wrong')
        } catch (error: any) {
            console.log('something went wrong', error);
        }
    }
)

export const getAllCategories = createAsyncThunk(`/user/categories`, 
    async () => {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/category/get-all-categories-user`,{
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                }
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during fetching all categories ${error}`);
            return error?.response?.data;
        }
    }
)


export const addProduct = createAsyncThunk(`/user/add-product`, async ({ productDetails, router }: { productDetails: any, router: any }) => {
    try {
        const formData = new FormData();

        // Append standard fields
        formData.append('categoryName', productDetails.categoryName);
        formData.append('productName', productDetails.productName);
        formData.append('description', productDetails.description);
        formData.append('price', productDetails.price);

        // Append images
        productDetails.images.forEach((imageFile: any) => {
            formData.append('images', imageFile);
        });

        // Serialize complex fields
        formData.append('inputFields', JSON.stringify(productDetails.inputFields));
        formData.append('checkBoxes', JSON.stringify(productDetails.checkBoxes));
        formData.append('radioButtons', JSON.stringify(productDetails.radioButtons));


        const response = await axios.post(`${PRODUCT_SERVICE_BASE_URL}/add-product`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });

        if (response?.data) {
            console.log(response.data);
            if (response?.data?.success) {
                toast.success('Successfully added the product');
                router.push('/');
                return response.data;
            } else {
                toast.error(response?.data?.message);
            }
            return response.data;
        }
    } catch (error: any) {
        console.log(`An error happened during fetching all categories ${error}`);
        return error?.response?.data;
    }
});


export const editProduct = createAsyncThunk(`/user/edit-product`, async ({ productDetails, router }: { productDetails: any, router: any }) => {
    try {
        const formData = new FormData();

        // Append standard fields
        formData.append('categoryName', productDetails.categoryName);
        formData.append('productName', productDetails.productName);
        formData.append('description', productDetails.description);
        formData.append('price', productDetails.price);

        // appending images
        productDetails.images.forEach((imageFile: any) => {
            formData.append('images', imageFile);
        });

        // serializing complex fields
        formData.append('inputFields', JSON.stringify(productDetails.inputFields));
        formData.append('checkBoxes', JSON.stringify(productDetails.checkBoxes));
        formData.append('radioButtons', JSON.stringify(productDetails.radioButtons));


        const response = await axios.post(`${PRODUCT_SERVICE_BASE_URL}/update-product`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });

        if (response?.data) {
            console.log(response.data);
            if (response?.data?.success) {
                toast.success('Successfully updated product details');
                router.push('/');
                return response.data;
            } else {
                toast.error(response?.data?.message);
            }
            return response.data;
        }
    } catch (error: any) {
        console.log(`An error happened during fetching all categories ${error}`);
        return error?.response?.data;
    }
});

export const getProducts = createAsyncThunk(`/user/get-products`, 
    async () => {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/get-all-products`,{
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                }      
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during fetching all categories ${error}`);
            return error?.response?.data;
        }
    }
)


export const getCurrentUserProducts = createAsyncThunk(`/user/user-products`, 
    async () => {
        console.log('called');
        
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/current-user-products`,{
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })        
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                } 
                return response.data;
            } else {
                console.log(`no response`);
                return;
            }
        } catch (error: any) {
            console.log(`an error happened during fetching current user' products ${error}`);
            return error?.response?.data;
        }
    }
)

export const getSpecificProduct = createAsyncThunk(`/user/get-specific-product`, 
    async ( productId: string) => {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_BASE_URL}/get-specific-product/${productId}`,{
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                } 
                return response.data;
            } else {
                console.log(`no response`);
                return;
            }
        } catch (error: any) {
            console.log(`an error happened during fetching current user' products ${error}`);
            return error?.response?.data;
        }
    }
)

export const followUser = createAsyncThunk(`/user/follow-user`, 
    async (userId: string) => {
        try {
            const response = await axios.patch(`${USERS_SERVICE_BASE_URL}/user/follow/${userId}`,{
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                }      
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during trying to follow ${error}`);
            return error?.response?.data;
        }
    }
)

export const unFollowUser = createAsyncThunk(`/user/unfollow-user`, 
    async (userId: string) => {
        try {
            const response = await axios.patch(`${USERS_SERVICE_BASE_URL}/user/unfollow/${userId}`,{
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                }      
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during trying to unfollow ${error}`);
            return error?.response?.data;
        }
    }
)

export const chatWithSeller = createAsyncThunk(`/user/chat-with-seller`, 
    async (userId: string) => {
        try {
            const response = await axios.patch(`${CHAT_SERVICE_BASE_URL}/${userId}`,{
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            })
            if (response?.data) {
                console.log(response.data);
                if (response?.data?.success) {
                    return response.data;
                }      
                return response.data;
            }
        } catch (error: any) {
            console.log(`an error happened during trying to unfollow ${error}`);
            return error?.response?.data;
        }
    }
)