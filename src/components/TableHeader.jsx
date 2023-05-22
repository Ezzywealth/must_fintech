import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable react/prop-types */
const approvalStatus = [
	{
		id: 1,
		title: 'approved',
	},
	{
		id: 2,
		title: 'pending',
	},
	{
		id: 3,
		title: 'rejected',
	},
];

const itemsToView = [
	{
		id: 1,
		number: 5,
	},
	{
		id: 2,
		number: 10,
	},
	{
		id: 3,
		number: 15,
	},
];

const sortByDate = [
	{
		id: 1,
		title: 'Application date',
	},
	{
		id: 2,
		title: 'Approval date',
	},
];
const TableHeader = ({ membersData, setPageItems, pending, selectedMembers, setItemsPerPage, setSelectedMembers }) => {
	const [approvalStatusValue, setApprovalStatusValue] = useState('');

	const handleNumberSort = (number) => {
		setPageItems(membersData.slice(0, number));
	};
	const handleDateSort = (date) => {
		console.log(date);
	};
	const handleApprovalSort = (approval) => {
		const newData = membersData.filter((item) => item.approvalStatus === approval);
		setPageItems(newData);
	};

	useEffect(() => {
		setItemsPerPage(itemsToView[0].number);
		setApprovalStatusValue(approvalStatus[0].title);
	}, []);

	const handleChangeStatus = (status) => {
		setPageItems((prev) =>
			prev.map((item) => {
				if (selectedMembers.includes(item)) {
					return { ...item, approvalStatus: status, selected: false };
				}
				return item;
			})
		);
		toast.success(`You have successfully updated the status of ${selectedMembers.length} ${selectedMembers.length > 1 ? 'members' : 'member'}`);
		setSelectedMembers([]);
	};

	return (
		<>
			<ToastContainer position='top-center' />
			<section>
				<form className='flex justify-between pt-[45px] pb-[12px] items-center box-border border-b border-[#D7D8DA] border-solid'>
					<p className='text-[#0B101A] text-[20px] leading-[24px] font-semibold'>
						Application List <span className='text-[#5A616A]'> ({`${membersData.length} Members | ${pending} pending approval`})</span>
					</p>
					<div className=' flex items-center gap-1 '>
						<select name='Approval Status' id='approval_status' defaultValue='Approval Status' className='capitalize' onChange={(e) => handleApprovalSort(e.target.value)}>
							<option disabled className='transition-all duration-300 ease-linear'>
								Approval Status
							</option>
							{approvalStatus.map((item) => {
								return (
									<option key={item.id} value={item.title} className='transition-all capitalize duration-300 ease-linear'>
										{item.title}
									</option>
								);
							})}
						</select>
						<select name='Approval Status' id='approval_status' className='capitalize' onChange={(e) => handleNumberSort(e.target.value)}>
							{itemsToView.map((item) => {
								return (
									<option key={item.id} value={item.number} className='transition-all capitalize duration-300 ease-linear'>
										{`view ${item.number} items`}
									</option>
								);
							})}
						</select>
						<select name='Approval Status' id='approval_status' className='capitalize' onChange={(e) => handleDateSort(e.target.value)}>
							{sortByDate.map((item) => {
								return (
									<option key={item.id} value={item.title} className='transition-all capitalize duration-300 ease-linear'>
										{item.title}
									</option>
								);
							})}
						</select>
					</div>
				</form>
			</section>
			<section className='flex justify-between items-center mt-[12.37px]'>
				<h3 className='border py-1 text-white px-[16px] bg-[#2A3958] rounded-[10px]'>Registration</h3>
				<div className='flex justify-between items-center gap-1'>
					<p className='mr-3 text-[14px]'>{selectedMembers.length} Selected Member</p>
					<select name='Approval Status' id='approval_status' onChange={(e) => setApprovalStatusValue(e.target.value)} className='capitalize focus:outline-none'>
						{approvalStatus.map((item) => {
							return (
								<option key={item.id} value={item.title}>
									{item.title}
								</option>
							);
						})}
					</select>
					<button onClick={() => handleChangeStatus(approvalStatusValue)} className='border py-1 text-white px-[16px] bg-[#2A3958] rounded-[10px]'>
						Save
					</button>
				</div>
			</section>
		</>
	);
};

export default TableHeader;
