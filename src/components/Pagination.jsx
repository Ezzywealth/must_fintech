/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
const Pagination = ({ data, setPageItems, membersData, startCount, endCount, setStartCount, setEndCount, itemsPerPage, pageItems, currentPage, setCurrentPage, numOfPages }) => {
	// Function to handle the jump to the page number clicked
	const handleJump = (page) => {
		setStartCount((prevStartCount) => page * itemsPerPage - itemsPerPage);
		setEndCount((prevEndCount) => page * itemsPerPage);
		setPageItems((prevMembersData) => data.slice(startCount, endCount));
		setCurrentPage(page);
	};

	// Function to handle the next page button
	const handleNext = () => {
		console.log(data);
		if (currentPage === numOfPages) {
			return;
		}
		setStartCount((prevStartCount) => prevStartCount + itemsPerPage);
		setEndCount((prevEndCount) => prevEndCount + itemsPerPage);
		setPageItems((prevMembersData) => data.slice(startCount, endCount));
		setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
	};

	// Function to handle the previous page button
	const handlePrev = () => {
		if (currentPage === 1) {
			return;
		}
		setStartCount((prevStartCount) => prevStartCount - itemsPerPage);
		setEndCount((prevEndCount) => prevEndCount - itemsPerPage);
		setPageItems((prevMembersData) => data.slice(startCount, endCount));
		setCurrentPage((prevCurrentPage) => prevCurrentPage - 1);
	};

	// Function to handle the double next jump button
	const handleDoubleNextJump = () => {
		if (currentPage + 1 > numOfPages) {
			return;
		}
		setStartCount((prevStartCount) => numOfPages * itemsPerPage - itemsPerPage);
		setEndCount((prevEndCount) => numOfPages * itemsPerPage);
		setPageItems((prevMembersData) => prevMembersData.slice(startCount, endCount));
		setCurrentPage(numOfPages);
	};

	// Function to handle the double previous jump button
	const handleDoublePrevJump = () => {
		if (currentPage - 1 < 1) {
			return;
		}
		setStartCount((prevStartCount) => 1 * itemsPerPage - itemsPerPage);
		setEndCount((prevEndCount) => 1 * itemsPerPage);
		setPageItems((prevMembersData) => prevMembersData.slice(startCount, endCount));
		setCurrentPage(1);
	};

	return (
		<div className='bg-[#F1F3F5] flex justify-center'>
			<section className='flex'>
				<span className='flex items-center'>
					<MdKeyboardDoubleArrowLeft onClick={handleDoublePrevJump} className='text-xl text-[#9599A1]  cursor-pointer' />
					<MdKeyboardArrowLeft onClick={handlePrev} className='text-xl text-[#9599A1]  cursor-pointer' />
				</span>
				<div className='flex items-center mx-4 gap-1 p-[12px]'>
					{
						//convert the number of pages to an array
						[...Array(numOfPages)].map((item, ind) => (
							<button onClick={() => handleJump(ind + 1)} key={ind} className={`font-bold transition-all ease-linear duration-300 text-[16px] cursor-pointer h-8 w-8 flex items-center text-base gap-4 justify-center ${currentPage === ind + 1 ? 'rounded-[4px] bg-[#2A3958] text-white' : 'text-[#A1A1A1]'}`}>
								{ind + 1}
							</button>
						))
					}
				</div>
				<span className='flex items-center'>
					<MdKeyboardArrowRight onClick={handleNext} className='text-xl text-[#9599A1]  cursor-pointer' />
					<MdKeyboardDoubleArrowRight onClick={handleDoubleNextJump} className='text-xl text-[#9599A1] cursor-pointer ' />
				</span>
			</section>
		</div>
	);
};

export default Pagination;
