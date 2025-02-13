
"use client";

import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";

// react-router 
import { Link } from "react-router-dom";

// assets 
import Logo from "../assets/logo.svg"
import userImg from "../assets/user.jpeg"

// userContext 
import { useContext } from "react";
import { UserContext } from "../userContext";


const Admin = () => {

    const { user } = useContext(UserContext)

    return (
        <div className='flex w-full'>
            <div className='w-1/8 bg-gray-50 sticky'>
                <Sidebar aria-label="Sidebar with logo branding example">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={HiChartPie}>
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiViewBoards}>
                                Kanban
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiInbox}>
                                Inbox
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiUser}>
                                Users
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={HiShoppingBag}>
                                Products
                            </Sidebar.Item>
                            <Sidebar.Item href="/logout" icon={HiArrowSmRight}>
                                Log out
                            </Sidebar.Item>
                            <Sidebar.Item href="/login" icon={HiTable}>
                                Sign Up
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>
            <div className='w-full h-screen'>
                <div className="container h-screen mx-auto py-5">
                    <div className="flex w-full justify-between">
                        <p className="text-5xl font-bold"> Hello,{user?.name}</p>
                        <img className="w-16" src={userImg} alt="userimg" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
