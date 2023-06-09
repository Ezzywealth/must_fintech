/* eslint-disable no-unused-vars */
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import { membersData } from '../../Library/membersData';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination';

const Table = () => {
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [isChecked, setIsChecked] = useState(false);
	const [startCount, setStartCount] = useState(0);
	const [endCount, setEndCount] = useState(itemsPerPage);
	const [pageItems, setPageItems] = useState([]);
	const [data, setData] = useState([]);
	const numOfPages = Math.ceil(data.length / itemsPerPage);
	const [pending, setPending] = useState(membersData.filter((item) => item.approvalStatus === 'pending').length);
	const [selectedMembers, setSelectedMembers] = useState(membersData.filter((item) => item.selected === true));

	// To change the endcount for the items on the page when itemsPerPage changes
	useEffect(() => {
		setEndCount(itemsPerPage);
	}, [itemsPerPage]);


// To change the data on the page when pagination buttons are clicked
	useEffect(() => {
		setPageItems(membersData.slice(startCount, endCount));
	}, [startCount, endCount]);

	// To set the initial data of the page on page render
	useEffect(() => {
		setData((prev) => membersData);
	}, []);

	// To update the data on the page when the current state of the application changes
	useEffect(() => {
		setPageItems(data.slice(startCount, endCount));
	}, [data, startCount, endCount, itemsPerPage]);

	return (
		<main className='mb-8'>
			<TableHeader setStartCount={setStartCount} endCount={endCount} setCurrentPage={setCurrentPage} isChecked={isChecked} setIsChecked={setIsChecked} setEndCount={setEndCount} startCount={startCount} pageItems={pageItems} data={data} setData={setData} setPending={setPending} setSelectedMembers={setSelectedMembers} setItemsPerPage={setItemsPerPage} itemsPerPage={itemsPerPage} setPageItems={setPageItems} membersData={membersData} pending={pending} selectedMembers={selectedMembers} />
			<TableBody isChecked={isChecked} setIsChecked={setIsChecked} data={data} setData={setData} startCount={startCount} endCount={endCount} pageItems={pageItems} membersData={membersData} setPageItems={setPageItems} setSelectedMembers={setSelectedMembers} />
			{numOfPages > 1 && <Pagination data={data} membersData={membersData} setPageItems={setPageItems} startCount={startCount} endCount={endCount} setStartCount={setStartCount} setEndCount={setEndCount} itemsPerPage={itemsPerPage} pageItems={pageItems} currentPage={currentPage} setCurrentPage={setCurrentPage} numOfPages={numOfPages} />}
		</main>
	);
};

export default Table;
