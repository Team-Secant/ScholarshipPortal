import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import axios from "axios"


export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8000` }),
    reducerPath: "adminApi",    // name of splice
    tagTypes: ["User", "Products", "Customers",],          // represents the value the state which you identify the particular data
    endpoints: (build) => ({
        // identify the api calls we make
        getUser: build.query({
            query: (id) => `general/user/${id}`,        // our part start with general  and then in general routes its user/:id thats why general/user/id
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query: () => "client/products",
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => "client/customers",
            providesTags: ["Customers"],
        }),
        getTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"],
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"],
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"],
        }),
        getAdmins: build.query({
            query: () => "management/admins",
            providesTags: ["Admins"],
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
        }),
        getScholarships: build.query({
            query: () => "scholarship",
            providesTags: ["Scholarship"],
        })
    })
})


export const {
    useGetUserQuery,              // it comes from getUser
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetScholarshipsQuery,
    useGetDashboardQuery,
    useGetAdminsQuery,
} = api;



// // For scholarship
// const URL = "http://localhost:8000"
// export const getScholarships = async (id) => {
//     try {
//         return await axios.get(`${URL}/scholarship`)       // kch data return so return
//     }
//     catch (e) {
//         console.log("Error at get Scholarship " + e)
//     }
// }


// export const addScholarship = async (scholarship) => {  // scholarship ki jagah data bhi chala ga and neeche bhi
//     try {
//         // 2nd argument is body
//         axios.post(`${URL}/scholarship/add`, scholarship)

//     } catch (e) {
//         console.log("Error at add user " + e)
//     }
// }

// export const deleteScholarship = async (id) => {
//     return await axios.delete(`${URL}/scholarship/${id}`);
// }


// export const getScholarship = async (id) => {
//     // id = id || '';
//     return await axios.get(`${URL}/scholarship/${id}`);
// }



// export const editScholarship = async (scholarship, id) => {
//     try {
//         return await axios.put(`${URL}/scholarship/${id}`, scholarship)
//     } catch (e) {
//         console.log("Error at edit users " + e)
//     }
// }




// // for annoucement

// export const getAnnoucements = async (id) => {
//     try {
//         return await axios.get(`${URL}/annoucement`)       // kch data return so return
//     }
//     catch (e) {
//         console.log("Error at get Annoucement " + e)
//     }
// }


// export const addAnnoucement = async (annoucement) => {
//     try {
//         // 2nd argument is body
//         axios.post(`${URL}/annoucement/add`, annoucement)

//     } catch (e) {
//         console.log("Error at add user " + e)
//     }
// }

// export const deleteAnnoucement = async (id) => {
//     return await axios.delete(`${URL}/annoucement/${id}`);
// }


// export const getAnnoucement = async (id) => {
//     // id = id || '';
//     return await axios.get(`${URL}/annoucement/${id}`);
// }



// export const editAnnoucement = async (annoucement, id) => {
//     try {
//         return await axios.put(`${URL}/annoucement/${id}`, annoucement)
//     } catch (e) {
//         console.log("Error at edit users " + e)
//     }
// }