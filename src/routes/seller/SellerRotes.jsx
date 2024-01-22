import SellerActivation from '@/pages/seller/activation/SellerActivation'
import SellerDashboard from '@/pages/seller/dashboard/SellerDashboard'
import SellerLogin from '@/pages/seller/login/SellerLogin'
import SellerSignUp from '@/pages/seller/signUp/SellerSignUp'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Unprotected from './Unprotected'
import Protected from './Protected'
import { useDispatch } from 'react-redux'
import { useSellerVerifyQuery } from '@/app/services/seller'
import { sellerFailed, setSeller } from '@/features/seller'

function SellerRotes() {
    const dispath = useDispatch()
    const { data, isLoading, isError } = useSellerVerifyQuery()

    useEffect(() => {
        if (!isLoading) {
            if (!isError) {
                dispath(setSeller(data))
            } else {
                dispath(sellerFailed())
            }
        }
    }, [isLoading])

    return (
        <Routes>
            {/* ========== Unprotected Routes ======== */}
            <Route exact path='/seller/signup' element={
                <Unprotected>
                    <SellerSignUp />
                </Unprotected>}
            />
            <Route exact path='/seller/login' element={
                <Unprotected>
                    <SellerLogin />
                </Unprotected>}
            />
            <Route exact path='/seller/activation/:activationToken' element={
                <SellerActivation />}
            />
            {/* ========== Protected Routes ======== */}
            <Route exact path='/seller/dashboard' element={
                <Protected>
                    <SellerDashboard />
                </Protected>}
            />
        </Routes>
    )
}

export default SellerRotes