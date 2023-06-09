/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import StatusMoal from '../statusModal';
import AlertModal from '../AlertModal';
import { approvalStatus, itemsToView, sortByDate } from '../../Library/sortingData';

/* eslint-disable react/prop-types */

const TableHeader = ({ setIsChecked, isChecked, setEndCount, startCount, data, setData, setPending, membersData, setPageItems, pending, selectedMembers, setItemsPerPage, setSelectedMembers, itemsPerPage, setCurrentPage, setStartCount, endCount }) => {
	const [approvalStatusValue, setApprovalStatusValue] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [successModal, setSuccessModal] = useState(false);
	const [description, setDescription] = useState('');

	// function to handle the sorting lists by number of items to view
	const handleNumberSort = (number) => {
		setEndCount(startCount + number);
		setItemsPerPage(number);
		setStartCount((prevStartCount) => 1 * itemsPerPage - itemsPerPage);
		setEndCount((prevEndCount) => 1 * itemsPerPage);
		setPageItems(data.slice(startCount, startCount + number));
	};

	// function to handle the sorting lists by application and approval date
	const handleDateSort = (date) => {
		console.log(date);
	};

	// function to handle the sorting lists by approval status
	const handleApprovalSort = (approval) => {
		const newData = membersData.filter((item) => item.approvalStatus === approval);
		setCurrentPage((prev) => 1);
		setData(newData);
		setStartCount((prevStartCount) => 1 * itemsPerPage - itemsPerPage);
		setEndCount((prevEndCount) => 1 * itemsPerPage);
		setPageItems((prevMembersData) => data.slice(startCount, endCount));
		setCurrentPage(1);
	};

	// set the default values for the select options
	useEffect(() => {
		setItemsPerPage(itemsToView[0].number);
		setApprovalStatusValue(approvalStatus[0].title);
	}, []);

	// function to open the modal for approval
	const handleChangeStatus = (status) => {
		if (selectedMembers.length === 0) {
			setDescription('No selected applications');
		}
		if (selectedMembers.length === 1) {
			if (status === selectedMembers[0].approvalStatus && status === 'approved') {
				setDescription('This member has already been granted approval."');
			} else if (status === selectedMembers[0].approvalStatus && status === 'rejected') {
				setDescription('This member has already been rejected for approval."');
			} else if (status !== selectedMembers[0].approvalStatus) {
				setDescription(`Would you like to change the approval status of the selected item?`);
			}
		} else if (selectedMembers.length >= 1) {
			setDescription(`Would you like to change the approval status of the selected ${selectedMembers.length} items?`);
		}
		setShowModal(true);
		setApprovalStatusValue(status);
	};

	// function to handle the response from the modal
	const handleModalResponse = (response) => {
		setShowModal(false);
		handleChange(response);
	};

	// function to handle the change of approval status
	const handleChange = (response) => {
		setIsChecked(false);
		console.log(response);
		if (response === 'Confirm') {
			setPageItems((prev) =>
				prev.map((item) => {
					if (selectedMembers.includes(item) && item.approvalStatus !== approvalStatusValue) {
						return { ...item, approvalStatus: approvalStatusValue, selected: false };
					}
					return item;
				})
			);
			setData((prev) =>
				prev.map((item) => {
					if (selectedMembers.includes(item)) {
						return { ...item, approvalStatus: approvalStatusValue, selected: false };
					}
					return item;
				})
			);
			if (approvalStatusValue === 'pending') {
				setPending((prev) => prev + selectedMembers.filter((item) => item.approvalStatus !== 'pending').length);
			}
		}
		if (response === 'Confirm') {
			setSuccessModal(true);
		}
	};

	return (
		<>
			{showModal && (
				<div className='animate-slide-in fixed top-0 left-0 z-10 right-0'>
					<StatusMoal selectedMembers={selectedMembers} approvalStatusValue={approvalStatusValue} description={description} handleModalResponse={handleModalResponse} />
				</div>
			)}
			{successModal && (
				<div className='animate-slide-in fixed top-0 left-0 z-10 right-0'>
					<AlertModal setSuccessModal={setSuccessModal} />
				</div>
			)}
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

						<select name='Approval Status' id='approval_status' className='capitalize' onChange={(e) => handleDateSort(e.target.value)}>
							{sortByDate.map((item) => {
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
					</div>
				</form>
			</section>
			<section className='flex justify-between items-center mt-[12.37px]'>
				<h3 className='border py-1 text-white px-[16px] bg-[#2A3958] rounded-[10px]'>Register</h3>
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
