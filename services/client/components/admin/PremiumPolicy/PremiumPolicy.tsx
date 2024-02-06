import { getPremiumPolicies, updatePremiumPolicy } from '@/store/actions/adminActions/adminActions'
import { useEffect, useState } from 'react'
import { GiChessQueen } from 'react-icons/gi'
import { AiOutlineEdit } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import ConfimationModalWithDialogue from '@/components/Modals/ConfirmationWithDialogue'
import toast from 'react-hot-toast'

const PremiumPolicy = () => {
    const dispatch: any = useDispatch()
    const [currentPolicyDuration, setCurrentPolicyDuration] = useState<any>(null)
    const [isModalOpen, setIsModalOpen] = useState<any>(null)

    useEffect(() => {
        dispatch(getPremiumPolicies())
    }, [])

    const policies = useSelector((state: any) => state?.admin?.data?.policies)

    const updatePolicy = (subscriptionAmount: any) => {
        const updatedPrice = Number(subscriptionAmount);
        if (isNaN(updatedPrice) || updatedPrice < 1) {
            toast.error('update with an amount greater than zero')
        }
        else {
            setIsModalOpen(false)
            dispatch(updatePremiumPolicy({
                policyDuration: currentPolicyDuration,
                subscriptionAmount: updatedPrice
            }))
        }
    }

    return (
        <>
            <div className="flex justify-between w-full">
                <h1 className='text-xl p-3'>Premium Policies</h1>
            </div>
            <div className="grid sm:grid-cols-2 w-full gap-4 my-2 px-12">
                <div className="relative h-40 bg-blue-100 flex flex-col items-center rounded-md">
                    <div className='w-full flex justify-start p-4 gap-2 items-center'>
                        <GiChessQueen className='ms-4 text-2xl text-yellow-600' />
                        <span className='text-2xl'>{policies && policies[0]?.policyDuration} Subscription Plan </span>
                    </div>
                    <span className='text-xl'>Subscription Amount: {policies && policies[0]?.policyDuration} </span>
                    <div
                        onClick={() => { 
                            setIsModalOpen(!isModalOpen)
                            setCurrentPolicyDuration(policies && policies[0]?.policyDuration)
                        }}
                        className="absolute top-2 right-2 cursor-pointer">
                        < AiOutlineEdit />
                    </div>
                </div>
                <div className="relative h-40 bg-blue-100 flex flex-col items-center rounded-md">
                    <div className='w-full flex justify-start p-4 gap-2 items-center'>
                        <GiChessQueen className='ms-4 text-2xl text-yellow-600' />
                        <span className='text-2xl'>{policies && policies[1]?.policyDuration} Subscription Plan </span>
                    </div>
                    <span className='text-xl'>Subscription Amount: {policies && policies[1]?.policyDuration} </span>
                    <div
                        onClick={() => {
                            setIsModalOpen(!isModalOpen)
                            setCurrentPolicyDuration(policies && policies[1]?.policyDuration)
                        }}
                        className="absolute top-2 right-2 cursor-pointer">
                        < AiOutlineEdit />
                    </div>
                </div>
            </div>
           
            < ConfimationModalWithDialogue
                afterConfirmation={updatePolicy}
                isModalOpen={isModalOpen}
                notesHead='Write a new policy amount'
                setModalOpen={setIsModalOpen}
            />
        </>
    )
}

export default PremiumPolicy