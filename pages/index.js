import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import { useTheme } from 'next-themes';

import {
	User as IconUser, Lock as IconLock, Eye as IconEye, EyeSlash as IconEyeSlash, Sms as IconSms, Add as IconAdd,
	Sun1 as IconSun, Moon as IconMoon
} from "iconsax-react";
import Popup from 'reactjs-popup';
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
})

const Index = () => {
	const [tab, sTab] = useState("login");
	const _HandleSelectTab = (e) => sTab(e);

	const [typePassword, sTypePassword] = useState(true);
	const _ToggleChangeType = () => sTypePassword(!typePassword);

	const [username, sUsername] = useState("");
	const [password, sPassword] = useState("");
	const [email, sEmail] = useState("");

	const [nullUsername, sNullUsername] = useState(false);
	const [nullEmail, sNullEmail] = useState(false);
	const [nullPassword, sNullPassword] = useState(false);

	const _HandleChangeValue = (type, value) => {
		if(type == "username"){
			sUsername(value?.target.value)
		}else if(type == "password"){
			sPassword(value?.target.value)
		}else if(type == "email"){
			sEmail(value?.target.value)
		}
	}

	useEffect(() => {
		tab && sUsername("")
		tab && sPassword("")
		tab && sEmail("")
		tab && sNullUsername(false)
		tab && sNullEmail(false)
		tab && sNullPassword(false)
	}, [tab]);
	
    const {theme, setTheme} = useTheme()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
        if (theme == "system"){
            setTheme("light")
        }
    }, [])
    if (!mounted) return null;
    const currentTheme = theme;

	
	const _HandleSubmit = (type, e) => {
		e.preventDefault();
		if(type == "login"){
			if(username?.length == 0 || password?.length == 0){
				Toast.fire({
					icon: 'error',
					title: `Please complete all information`,
					color: `${theme == "dark" ? "#ffffff" : "#000000"}`,
					background: `${theme == "dark" ? "#0a0a0a" : "#f1f5f9"}`,
					iconColor: "#ef4444"
				}) 
				username?.length == 0 && sNullUsername(true)
				password?.length == 0 && sNullPassword(true)
			}else{
				sNullUsername(false)
				sNullPassword(false)
				sUsername("")
				sPassword("")
				Toast.fire({
					icon: 'success',
					title: `Login successfully`,
					color: `${theme == "dark" ? "#ffffff" : "#000000"}`,
					background: `${theme == "dark" ? "#0a0a0a" : "#f1f5f9"}`,
					iconColor: "#22c55e"
				}) 

			}
		}else if(type == "signup"){
			if(username?.length == 0 || password?.length == 0 || email?.length == 0){
				Toast.fire({
					icon: 'error',
					title: `Please complete all information`,
					color: `${theme == "dark" ? "#ffffff" : "#000000"}`,
					background: `${theme == "dark" ? "#0a0a0a" : "#f1f5f9"}`,
					iconColor: "#ef4444"
				}) 
				username?.length == 0 && sNullUsername(true)
				password?.length == 0 && sNullPassword(true)
				email?.length == 0 && sNullEmail(true)
			}else{
				sNullUsername(false)
				sNullPassword(false)
				sNullEmail(false)
				sUsername("")
				sPassword("")
				sEmail("")
				Toast.fire({
					icon: 'success',
					title: `Sign up successfully`,
					color: `${theme == "dark" ? "#ffffff" : "#000000"}`,
					background: `${theme == "dark" ? "#0a0a0a" : "#f1f5f9"}`,
					iconColor: "#22c55e"
				}) 

			}
		}
	}

	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<main className="h-screen overflow-hidden flex flex-col justify-center items-center gap-5 bg-white dark:bg-black relative">
				<div className='relative w-[50%] h-[80%]'>
					<div className='bg-slate-200/50 dark:bg-white/5 h-full p-7 pr-48 rounded-md overflow-hidden relative'>
						<div className='flex space-x-3 relative z-[1]'>
							<div className={`${tab == "login" ? "bg-yellow-500" : "dark:bg-black bg-white" } transition duration-200 w-3 h-3 rounded-full`} />
							<div className={`${tab == "signup" ? "bg-yellow-500" : "dark:bg-black bg-white" } transition duration-200 w-3 h-3 rounded-full`} />
						</div>
						<div className='w-full overflow-hidden h-full relative z-[1]'>
							<div className={`${tab == "login" ? "" : "-translate-x-[50%]" } transition duration-200 flex w-[200%] h-full`}>
								<div className='w-full ml-5 h-full flex flex-col justify-between py-10'>
									<h1 className='uppercase text-2xl font-bold dark:text-white mt-3'>Log In</h1>
									<div className='space-y-8'>
										<div className='ml-5 relative'>
											<input value={username} onChange={_HandleChangeValue.bind(this, "username")} type='text' name='name' placeholder='Username' className='bg-gradient-to-r dark:from-[#101010] dark:to-[#0e0e0e] from-slate-300/60 to-slate-100 pr-6 pl-20 py-4 w-full outline-none rounded-md dark:text-white dark:placeholder:text-white/30 peer' />
											<div className='h-14 w-14 dark:bg-black/50 bg-white absolute -top-2.5 -left-2.5 rounded blur peer-focus:translate-x-2.5 peer-focus:translate-y-2.5 transition duration-200' />
											<div className={`${nullUsername && username?.length == 0 ? "bg-red-600 text-white" : "dark:bg-[#141414] bg-slate-300/70 text-yellow-500" } h-14 w-14 flex flex-col justify-center items-center rounded absolute -top-4 -left-4 peer-focus:translate-x-3 peer-focus:translate-y-3 transition duration-200`}><IconUser variant="Broken" /></div>
										</div>
										<div className='relative ml-5 flex flex-col justify-center'>
											<input value={password} onChange={_HandleChangeValue.bind(this, "password")} type={`${typePassword ? "password" : "text"}`} placeholder='Password' className='bg-gradient-to-r dark:from-[#101010] dark:to-[#0e0e0e] from-slate-300/60 to-slate-100 pr-8 pl-20 py-4 w-full outline-none rounded-md dark:text-white dark:placeholder:text-white/30 peer' />
											<div className='h-14 w-14 dark:bg-black/50 bg-white absolute -top-2.5 -left-2.5 rounded blur peer-focus:translate-x-2.5 peer-focus:translate-y-2.5 transition duration-200' />
											<div className={`${nullPassword && password?.length == 0 ? "bg-red-600 text-white" : "dark:bg-[#141414] bg-slate-300/70 text-yellow-500" } h-14 w-14 flex flex-col justify-center items-center rounded absolute -top-4 -left-4 peer-focus:translate-x-3 peer-focus:translate-y-3 transition duration-200`}><IconLock variant="Broken" /></div>
											<button onClick={_ToggleChangeType.bind(this)} className='absolute right-5 dark:text-white'>
												{typePassword ? <IconEye variant="Broken" /> : <IconEyeSlash variant="Broken" />}
											</button>
										</div>
										<div className='flex justify-end'>
											<BtnForgotPw theme={theme} />
										</div>
									</div>
									<button onClick={_HandleSubmit.bind(this, "login")} className='w-full bg-gradient-to-r from-yellow-400 via-yellow-500 via-yellow-600 to-yellow-500 font-bold py-4 text-xl rounded-md btn-animation'>Log In</button>
								</div>
								<div className='w-full ml-5 h-full flex flex-col justify-between py-10'>
									<h1 className='uppercase text-2xl font-bold dark:text-white mt-3'>Sign Up</h1>
									<div className='space-y-8'>
										<div className='ml-5 relative'>
											<input value={email} onChange={_HandleChangeValue.bind(this, "email")} type='text' name="email" placeholder='Email' className='bg-gradient-to-r dark:from-[#101010] dark:to-[#0e0e0e] from-slate-300/60 to-slate-100 pr-6 pl-20 py-4 w-full outline-none rounded-md dark:text-white dark:placeholder:text-white/30 peer' />
											<div className='h-14 w-14 dark:bg-black/50 bg-white absolute -top-2.5 -left-2.5 rounded blur peer-focus:translate-x-2.5 peer-focus:translate-y-2.5 transition duration-200' />
											<div className={`${nullEmail && email?.length == 0 ? "bg-red-600 text-white" : "dark:bg-[#141414] bg-slate-300/70 text-yellow-500" } h-14 w-14 flex flex-col justify-center items-center rounded absolute -top-4 -left-4 peer-focus:translate-x-3 peer-focus:translate-y-3 transition duration-200`}><IconSms variant="Broken" /></div>
										</div>
										<div className='ml-5 relative'>
											<input value={username} onChange={_HandleChangeValue.bind(this, "username")} type='text' name='name' placeholder='Username' className='bg-gradient-to-r dark:from-[#101010] dark:to-[#0e0e0e] from-slate-300/60 to-slate-100 pr-6 pl-20 py-4 w-full outline-none rounded-md dark:text-white dark:placeholder:text-white/30 peer' />
											<div className='h-14 w-14 dark:bg-black/50 bg-white absolute -top-2.5 -left-2.5 rounded blur peer-focus:translate-x-2.5 peer-focus:translate-y-2.5 transition duration-200' />
											<div className={`${nullUsername && username?.length == 0 ? "bg-red-600 text-white" : "dark:bg-[#141414] bg-slate-300/70 text-yellow-500" } h-14 w-14 flex flex-col justify-center items-center rounded absolute -top-4 -left-4 peer-focus:translate-x-3 peer-focus:translate-y-3 transition duration-200`}><IconUser variant="Broken" /></div>
										</div>
										<div className='relative ml-5 flex flex-col justify-center'>
											<input value={password} onChange={_HandleChangeValue.bind(this, "password")} type={`${typePassword ? "password" : "text"}`} placeholder='Password' className='bg-gradient-to-r dark:from-[#101010] dark:to-[#0e0e0e] from-slate-300/60 to-slate-100 pr-8 pl-20 py-4 w-full outline-none rounded-md dark:text-white dark:placeholder:text-white/30 peer' />
											<div className='h-14 w-14 dark:bg-black/50 bg-white absolute -top-2.5 -left-2.5 rounded blur peer-focus:translate-x-2.5 peer-focus:translate-y-2.5 transition duration-200' />
											<div className={`${nullPassword && password?.length == 0 ? "bg-red-600 text-white" : "dark:bg-[#141414] bg-slate-300/70 text-yellow-500" } h-14 w-14 flex flex-col justify-center items-center rounded absolute -top-4 -left-4 peer-focus:translate-x-3 peer-focus:translate-y-3 transition duration-200`}><IconLock variant="Broken" /></div>
											<button onClick={_ToggleChangeType.bind(this)} className='absolute right-5 dark:text-white'>
												{typePassword ? <IconEye variant="Broken" /> : <IconEyeSlash variant="Broken" />}
											</button>
										</div>
									</div>
									<button onClick={_HandleSubmit.bind(this, "signup")} className='w-full bg-gradient-to-r from-yellow-400 via-yellow-500 via-yellow-600 to-yellow-500 font-bold py-4 text-xl rounded-md btn-animation'>Sign Up</button>
								</div>
							</div>
						</div>
						<div className='w-20 h-20 rounded-full dark:bg-yellow-500 bg-yellow-600 dark:blur-[60px] blur-[50px] absolute -top-5 -left-5' />
					</div>
					<div className='absolute right-5 top-5'>
						<div className='flex w-fit rounded-full dark:bg-[#101010] bg-[#f3f3f3]'>
							<div className='w-10 h-10 relative flex flex-col justify-center items-center'>
								<button
									onClick={() => setTheme('light')}
									className={`${currentTheme === "light" ? "cursor-auto text-amber-500 opacity-75" : "-translate-y-2 bg-[#1a1a1a] text-amber-500" } transition duration-300 rounded-full hover:text-primary flex flex-col justify-center items-center relative w-full h-full z-10`}
								>
									<IconSun size='25' />
								</button>
								<div className={`${currentTheme === "light" ? " h-full" : "bg-[#000000] h-12" } transition-[height] duration-300 w-full  rounded-full absolute bottom-0`} />
							</div>
							<div className='w-10 h-10 relative flex flex-col justify-center items-center'>
								<button
									onClick={() => setTheme('dark')}
									className={`${currentTheme === "dark" ? "cursor-auto text-amber-500 opacity-75" : "-translate-y-2 bg-[#fefefe] text-amber-500" } transition duration-300 text-amber-500 rounded-full hover:text-primary flex flex-col justify-center items-center relative w-full h-full z-10`}
								>
									<IconMoon size='25' />
								</button>      
								<div className={`${currentTheme === "dark" ? " h-full" : "bg-[#e9e9e9] h-12" } transition-[height] duration-300 w-full  rounded-full absolute bottom-0`} />
							</div>
						</div>
					</div>
					<div className='absolute -right-5 top-20 flex flex-col space-y-5'>
						<div className='relative w-fit h-fit'>
							<button onClick={_HandleSelectTab.bind(this, "login")} className={`${tab == "login" ? "translate-y-2 -translate-x-1.5 dark:bg-[#131313] bg-slate-200 cursor-auto" : "dark:bg-[#1c1c1c] bg-slate-300/80" } transition duration-200 rounded-l-full dark:text-white text-lg font-medium w-40 py-3 text-center relative z-[1]`}>Log In</button>
							<div className='rounded-l-full w-full h-full dark:bg-black bg-white absolute top-2 right-1' />
						</div>
						<div className='relative w-fit h-fit'>
							<button onClick={_HandleSelectTab.bind(this, "signup")} className={`${tab == "signup" ? "translate-y-2 -translate-x-1.5 dark:bg-[#131313] bg-slate-200 cursor-auto" : "dark:bg-[#1c1c1c] bg-slate-300/80" } transition duration-200 rounded-l-full dark:text-white text-lg font-medium w-40 py-3 text-center relative z-[1]`}>Sign Up</button>
							<div className='rounded-l-full w-full h-full dark:bg-black bg-white absolute top-2 right-1' />
						</div>
					</div>
				</div>
				<div className='w-40 h-40 rounded-full dark:drop-shadow-[0_0_20px_black] drop-shadow-[0_0_10px_white] bg-gradient-to-l dark:from-yellow-700 from-yellow-600 via-yellow-500 to-yellow-400 absolute bottom-32 -left-10' />
				<div className='w-60 h-60 rounded-full dark:drop-shadow-[0_0_20px_black] drop-shadow-[0_0_10px_white] bg-gradient-to-bl dark:from-yellow-700 from-yellow-600 via-yellow-500 to-yellow-400 absolute -bottom-10 -left-10' />
				<div className='w-40 h-40 rounded-full dark:drop-shadow-[0_0_20px_black] drop-shadow-[0_0_10px_white] bg-gradient-to-b dark:from-yellow-700 from-yellow-600 via-yellow-500 to-yellow-400 absolute -bottom-14 left-32' />

				<div className='w-40 h-40 rounded-full dark:drop-shadow-[0_0_20px_black] drop-shadow-[0_0_10px_white] bg-gradient-to-r dark:from-yellow-700 from-yellow-600 via-yellow-500 to-yellow-400 absolute top-32 -right-10' />
				<div className='w-60 h-60 rounded-full dark:drop-shadow-[0_0_20px_black] drop-shadow-[0_0_10px_white] bg-gradient-to-tr dark:from-yellow-700 from-yellow-600 via-yellow-500 to-yellow-400 absolute -top-10 -right-10' />
				<div className='w-40 h-40 rounded-full dark:drop-shadow-[0_0_20px_black] drop-shadow-[0_0_10px_white] bg-gradient-to-t dark:from-yellow-700 from-yellow-600 via-yellow-500 to-yellow-400 absolute -top-14 right-32' />
			</main>
		</>
	);
}

const BtnForgotPw = React.memo(({theme}) => {
	const [isOpen, sIsOpen] = useState(false);
	const _HandleIsOpen = (e) => sIsOpen(e);

	const [email, sEmail] = useState("");
	const _HandleChangeValue = (value) => sEmail(value?.target.value);

	const [nullEmail, sNullEmail] = useState(false);

	useEffect(() => {
		sEmail("")
		sNullEmail(false)
	}, [isOpen]);

	const _HandleSubmit = (e) => {
		e.preventDefault();
		if(email?.length == 0){
			sNullEmail(true)
			Toast.fire({
				icon: 'error',
				title: `Please enter your email`,
				color: `${theme == "dark" ? "#ffffff" : "#000000"}`,
				background: `${theme == "dark" ? "#0a0a0a" : "#f1f5f9"}`,
				iconColor: "#ef4444"
			}) 
		}else{
			sIsOpen(false)
			sNullEmail(true)
			sEmail("")
			Toast.fire({
				icon: 'success',
				title: `Confirm successfully`,
				color: `${theme == "dark" ? "#ffffff" : "#000000"}`,
				background: `${theme == "dark" ? "#0a0a0a" : "#f1f5f9"}`,
				iconColor: "#22c55e"
			}) 
		}
	}

	return(
		<>
			<button onClick={_HandleIsOpen.bind(this, true)} className='dark:text-white/50 dark:hover:text-white/80 text-black/50 hover:text-black/80'>Forgot password?</button>
			<Popup
				open={isOpen}
				closeOnDocumentClick={false}
				className={`popup-edit`}
			>
				<div className='w-[500px] p-5 dark:bg-[#0a0a0a] bg-slate-200 rounded-md relative'>
					<div className='absolute -top-3 -left-2 dark:bg-[#131313] bg-slate-300 dark:text-white text-xl font-medium px-8 py-3 rounded-md -skew-x-[20deg]'><h2 className='skew-x-[20deg]'>Reset password</h2></div>
					<button onClick={_HandleIsOpen.bind(this, false)} className='dark:bg-[#131313] bg-slate-300 h-10 w-10 rounded-full flex flex-col justify-center items-center absolute -top-3 -right-3 dark:text-white hover:drop-shadow-[0_0_10px_#ca8a04]'><IconAdd variant='Broken' className='rotate-45' /></button>
					<div className='ml-5 mt-20 relative'>
						<input value={email} onChange={_HandleChangeValue.bind(this)} type='text' name="email" placeholder='Email' className='bg-gradient-to-r dark:from-[#101010] dark:to-[#0c0c0c] from-slate-300/80 to-slate-200 pr-6 pl-20 py-4 w-full outline-none rounded-md dark:text-white dark:placeholder:text-white/30 peer' />
						<div className='h-14 w-14 dark:bg-black/50 bg-white absolute -top-2.5 -left-2.5 rounded blur peer-focus:translate-x-2.5 peer-focus:translate-y-2.5 transition duration-200' />
						<div className={`${nullEmail && email?.length == 0 ? "bg-red-600 text-white" : "dark:bg-[#141414] bg-slate-300/50 text-yellow-500" } h-14 w-14 flex flex-col justify-center items-center rounded absolute -top-4 -left-4 peer-focus:translate-x-3 peer-focus:translate-y-3 transition duration-200`}><IconSms variant="Broken" /></div>
					</div>
					<div className='mt-16 flex justify-center'>
						<button onClick={_HandleSubmit.bind(this)} className='w-[60%] bg-gradient-to-r from-yellow-400 via-yellow-500 via-yellow-600 to-yellow-500 font-bold py-4 text-lg rounded-md btn-animation'>Confirm</button>
					</div>
				</div>
			</Popup>
		</>
	)
})

const ToogleTheme = React.memo(() => {
    return(
        <div className='flex w-fit rounded-full dark:bg-[#101010] bg-[#f3f3f3]'>
            <div className='w-10 h-10 relative flex flex-col justify-center items-center'>
                <button
                    onClick={() => setTheme('light')}
                    className={`${currentTheme === "light" ? "cursor-auto text-amber-500 opacity-75" : "-translate-y-2 bg-[#1a1a1a] text-amber-500" } transition duration-300 rounded-full hover:text-primary flex flex-col justify-center items-center relative w-full h-full z-10`}
                >
                    <IconSun size='25' />
                </button>
                <div className={`${currentTheme === "light" ? " h-full" : "bg-[#000000] h-12" } transition-[height] duration-300 w-full  rounded-full absolute bottom-0`} />
            </div>
            <div className='w-10 h-10 relative flex flex-col justify-center items-center'>
                <button
                    onClick={() => setTheme('dark')}
                    className={`${currentTheme === "dark" ? "cursor-auto text-amber-500 opacity-75" : "-translate-y-2 bg-[#fefefe] text-amber-500" } transition duration-300 text-amber-500 rounded-full hover:text-primary flex flex-col justify-center items-center relative w-full h-full z-10`}
                >
                    <IconMoon size='25' />
                </button>      
                <div className={`${currentTheme === "dark" ? " h-full" : "bg-[#e9e9e9] h-12" } transition-[height] duration-300 w-full  rounded-full absolute bottom-0`} />
            </div>
        </div>
    )
})

export default Index;
