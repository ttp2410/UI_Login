import React, {useState, useEffect} from 'react';
import Head from 'next/head';

import {User as IconUser, Lock as IconLock, Eye as IconEye, EyeSlash as IconEyeSlash, Sms as IconSms, Add as IconAdd} from "iconsax-react";
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

	const _HandleSubmit = (type, e) => {
		e.preventDefault();
		if(type == "login"){
			if(username?.length == 0 || password?.length == 0){
				Toast.fire({
					icon: 'error',
					title: `Please complete all information`,
					color: '#ffffff',
					background: '#0a0a0a',
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
					color: '#ffffff',
					background: '#000000',
					iconColor: "#22c55e"
				}) 

			}
		}else if(type == "signup"){
			if(username?.length == 0 || password?.length == 0 || email?.length == 0){
				Toast.fire({
					icon: 'error',
					title: `Please complete all information`,
					color: '#ffffff',
					background: '#0a0a0a',
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
					color: '#ffffff',
					background: '#000000',
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
			<main className="h-screen overflow-hidden flex flex-col justify-center items-center gap-5 bg-black relative">
				<div className='relative w-[50%] h-[80%]'>
					<div className='bg-white/5 h-full p-7 pr-48 rounded-md overflow-hidden relative'>
						<div className='flex space-x-3 relative z-[1]'>
							<div className={`${tab == "login" ? "bg-yellow-500" : "bg-black" } transition duration-200 w-3 h-3 rounded-full`} />
							<div className={`${tab == "signup" ? "bg-yellow-500" : "bg-black" } transition duration-200 w-3 h-3 rounded-full`} />
						</div>
						<div className='w-full overflow-hidden h-full relative z-[1]'>
							<div className={`${tab == "login" ? "" : "-translate-x-[50%]" } transition duration-200 flex w-[200%] h-full`}>
								<div className='w-full ml-5 h-full flex flex-col justify-between py-10'>
									<h1 className='uppercase text-2xl font-bold text-white mt-3'>Log In</h1>
									<div className='space-y-8'>
										<div className='ml-5 relative'>
											<input value={username} onChange={_HandleChangeValue.bind(this, "username")} type='text' name='name' placeholder='Username' className='bg-gradient-to-r from-[#101010] to-[#0e0e0e] pr-6 pl-20 py-4 w-full outline-none rounded-md text-white placeholder:text-white/30 peer' />
											<div className='h-14 w-14 bg-black/50 absolute -top-2.5 -left-2.5 rounded blur peer-focus:translate-x-2.5 peer-focus:translate-y-2.5 transition duration-200' />
											<div className={`${nullUsername && username?.length == 0 ? "bg-red-600 text-white" : "bg-[#141414] text-yellow-500" } h-14 w-14 flex flex-col justify-center items-center rounded absolute -top-4 -left-4 peer-focus:translate-x-3 peer-focus:translate-y-3 transition duration-200`}><IconUser variant="Broken" /></div>
										</div>
										<div className='relative ml-5 flex flex-col justify-center'>
											<input value={password} onChange={_HandleChangeValue.bind(this, "password")} type={`${typePassword ? "password" : "text"}`} placeholder='Password' className='bg-gradient-to-r from-[#101010] to-[#0e0e0e] pr-8 pl-20 py-4 w-full outline-none rounded-md text-white placeholder:text-white/30 peer' />
											<div className='h-14 w-14 bg-black/50 absolute -top-2.5 -left-2.5 rounded blur peer-focus:translate-x-2.5 peer-focus:translate-y-2.5 transition duration-200' />
											<div className={`${nullPassword && password?.length == 0 ? "bg-red-600 text-white" : "bg-[#141414] text-yellow-500" } h-14 w-14 flex flex-col justify-center items-center rounded absolute -top-4 -left-4 peer-focus:translate-x-3 peer-focus:translate-y-3 transition duration-200`}><IconLock variant="Broken" /></div>
											<button onClick={_ToggleChangeType.bind(this)} className='absolute right-5 text-white'>
												{typePassword ? <IconEye variant="Broken" /> : <IconEyeSlash variant="Broken" />}
											</button>
										</div>
										<div className='flex justify-end'>
											<BtnForgotPw />
										</div>
									</div>
									<button onClick={_HandleSubmit.bind(this, "login")} className='w-full bg-gradient-to-r from-yellow-400 via-yellow-500 via-yellow-600 to-yellow-500 font-bold py-4 text-xl rounded-md btn-animation'>Log In</button>
								</div>
								<div className='w-full ml-5 h-full flex flex-col justify-between py-10'>
									<h1 className='uppercase text-2xl font-bold text-white mt-3'>Sign Up</h1>
									<div className='space-y-8'>
										<div className='ml-5 relative'>
											<input value={email} onChange={_HandleChangeValue.bind(this, "email")} type='text' name="email" placeholder='Email' className='bg-gradient-to-r from-[#101010] to-[#0e0e0e] pr-6 pl-20 py-4 w-full outline-none rounded-md text-white placeholder:text-white/30 peer' />
											<div className='h-14 w-14 bg-black/50 absolute -top-2.5 -left-2.5 rounded blur peer-focus:translate-x-2.5 peer-focus:translate-y-2.5 transition duration-200' />
											<div className={`${nullEmail && email?.length == 0 ? "bg-red-600 text-white" : "bg-[#141414] text-yellow-500" } h-14 w-14 flex flex-col justify-center items-center rounded absolute -top-4 -left-4 peer-focus:translate-x-3 peer-focus:translate-y-3 transition duration-200`}><IconSms variant="Broken" /></div>
										</div>
										<div className='ml-5 relative'>
											<input value={username} onChange={_HandleChangeValue.bind(this, "username")} type='text' name='name' placeholder='Username' className='bg-gradient-to-r from-[#101010] to-[#0e0e0e] pr-6 pl-20 py-4 w-full outline-none rounded-md text-white placeholder:text-white/30 peer' />
											<div className='h-14 w-14 bg-black/50 absolute -top-2.5 -left-2.5 rounded blur peer-focus:translate-x-2.5 peer-focus:translate-y-2.5 transition duration-200' />
											<div className={`${nullUsername && username?.length == 0 ? "bg-red-600 text-white" : "bg-[#141414] text-yellow-500" } h-14 w-14 flex flex-col justify-center items-center rounded absolute -top-4 -left-4 peer-focus:translate-x-3 peer-focus:translate-y-3 transition duration-200`}><IconUser variant="Broken" /></div>
										</div>
										<div className='relative ml-5 flex flex-col justify-center'>
											<input value={password} onChange={_HandleChangeValue.bind(this, "password")} type={`${typePassword ? "password" : "text"}`} placeholder='Password' className='bg-gradient-to-r from-[#101010] to-[#0e0e0e] pr-8 pl-20 py-4 w-full outline-none rounded-md text-white placeholder:text-white/30 peer' />
											<div className='h-14 w-14 bg-black/50 absolute -top-2.5 -left-2.5 rounded blur peer-focus:translate-x-2.5 peer-focus:translate-y-2.5 transition duration-200' />
											<div className={`${nullPassword && password?.length == 0 ? "bg-red-600 text-white" : "bg-[#141414] text-yellow-500" } h-14 w-14 flex flex-col justify-center items-center rounded absolute -top-4 -left-4 peer-focus:translate-x-3 peer-focus:translate-y-3 transition duration-200`}><IconLock variant="Broken" /></div>
											<button onClick={_ToggleChangeType.bind(this)} className='absolute right-5 text-white'>
												{typePassword ? <IconEye variant="Broken" /> : <IconEyeSlash variant="Broken" />}
											</button>
										</div>
									</div>
									<button onClick={_HandleSubmit.bind(this, "signup")} className='w-full bg-gradient-to-r from-yellow-400 via-yellow-500 via-yellow-600 to-yellow-500 font-bold py-4 text-xl rounded-md btn-animation'>Sign Up</button>
								</div>
							</div>
						</div>
						<div className='w-20 h-20 rounded-full bg-yellow-500 blur-[60px] absolute -top-5 -left-5' />
					</div>
					<div className='absolute -right-5 top-12 flex flex-col space-y-5'>
						<div className='relative w-fit h-fit'>
							<button onClick={_HandleSelectTab.bind(this, "login")} className={`${tab == "login" ? "translate-y-2 -translate-x-1.5 bg-[#131313] cursor-auto" : "bg-[#1c1c1c]" } transition duration-200 rounded-l-full text-white text-lg font-medium w-40 py-3 text-center relative z-[1]`}>Log In</button>
							<div className='rounded-l-full w-full h-full bg-black absolute top-2 right-1' />
						</div>
						<div className='relative w-fit h-fit'>
							<button onClick={_HandleSelectTab.bind(this, "signup")} className={`${tab == "signup" ? "translate-y-2 -translate-x-1.5 bg-[#131313] cursor-auto" : "bg-[#1c1c1c]" } transition duration-200 rounded-l-full text-white text-lg font-medium w-40 py-3 text-center relative z-[1]`}>Sign Up</button>
							<div className='rounded-l-full w-full h-full bg-black absolute top-2 right-1' />
						</div>
					</div>
				</div>

				<div className='w-40 h-40 rounded-full drop-shadow-[0_0_20px_black] shadow-2xl bg-gradient-to-l from-yellow-700 via-yellow-500 to-yellow-400 absolute bottom-32 -left-10' />
				<div className='w-60 h-60 rounded-full drop-shadow-[0_0_20px_black] bg-gradient-to-bl from-yellow-700 via-yellow-500 to-yellow-400 absolute -bottom-10 -left-10' />
				<div className='w-40 h-40 rounded-full drop-shadow-[0_0_20px_black] bg-gradient-to-b from-yellow-700 via-yellow-500 to-yellow-400 absolute -bottom-14 left-32' />

				<div className='w-40 h-40 rounded-full drop-shadow-[0_0_20px_black] shadow-2xl bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-400 absolute top-32 -right-10' />
				<div className='w-60 h-60 rounded-full drop-shadow-[0_0_20px_black] bg-gradient-to-tr from-yellow-700 via-yellow-500 to-yellow-400 absolute -top-10 -right-10' />
				<div className='w-40 h-40 rounded-full drop-shadow-[0_0_20px_black] bg-gradient-to-t from-yellow-700 via-yellow-500 to-yellow-400 absolute -top-14 right-32' />
			</main>
		</>
	);
}

const BtnForgotPw = React.memo(() => {
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
				color: '#ffffff',
				background: '#000000',
				iconColor: "#ef4444"
			}) 
		}else{
			sIsOpen(false)
			sNullEmail(true)
			sEmail("")
			Toast.fire({
				icon: 'success',
				title: `Confirm successfully`,
				color: '#ffffff',
				background: '#000000',
				iconColor: "#22c55e"
			}) 
		}
	}

	return(
		<>
			<button onClick={_HandleIsOpen.bind(this, true)} className='text-white/50 hover:text-white/80'>Forgot password?</button>
			<Popup
				open={isOpen}
				closeOnDocumentClick={false}
				className={`popup-edit`}
			>
				<div className='w-[500px] p-5 bg-[#0a0a0a] rounded-md relative'>
					<div className='absolute -top-3 -left-2 bg-[#131313] text-white text-xl font-medium px-8 py-3 rounded-md -skew-x-[20deg]'><h2 className='skew-x-[20deg]'>Reset password</h2></div>
					<button onClick={_HandleIsOpen.bind(this, false)} className='bg-[#131313] h-10 w-10 rounded-full flex flex-col justify-center items-center absolute -top-3 -right-3 text-white hover:drop-shadow-[0_0_10px_#ca8a04]'><IconAdd variant='Broken' className='rotate-45' /></button>
					<div className='ml-5 mt-20 relative'>
						<input value={email} onChange={_HandleChangeValue.bind(this)} type='text' name="email" placeholder='Email' className='bg-gradient-to-r from-[#101010] to-[#0c0c0c] pr-6 pl-20 py-4 w-full outline-none rounded-md text-white placeholder:text-white/30 peer' />
						<div className='h-14 w-14 bg-black/50 absolute -top-2.5 -left-2.5 rounded blur peer-focus:translate-x-2.5 peer-focus:translate-y-2.5 transition duration-200' />
						<div className={`${nullEmail && email?.length == 0 ? "bg-red-600 text-white" : "bg-[#141414] text-yellow-500" } h-14 w-14 flex flex-col justify-center items-center rounded absolute -top-4 -left-4 peer-focus:translate-x-3 peer-focus:translate-y-3 transition duration-200`}><IconSms variant="Broken" /></div>
					</div>
					<div className='mt-16 flex justify-center'>
						<button onClick={_HandleSubmit.bind(this)} className='w-[60%] bg-gradient-to-r from-yellow-400 via-yellow-500 via-yellow-600 to-yellow-500 font-bold py-4 text-lg rounded-md btn-animation'>Confirm</button>
					</div>
				</div>
			</Popup>
		</>
	)
})

export default Index;
