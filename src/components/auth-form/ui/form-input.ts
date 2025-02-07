"use client";
import styled from "styled-components";

export default styled.input`
	width: 100%;
	display: block;
	border-radius: 0.375rem; /* rounded-md */
	border: 1px solid #e5e7eb; /* border-gray-200 */
	padding-top: 9px; /* py-[9px] */
	padding-bottom: 9px; /* py-[9px] */
	padding-left: 2.5rem; /* pl-10 */
	font-size: 0.875rem; /* text-sm */
	outline-width: 2px; /* outline-2 */
	&::placeholder {
		color: #6b7280; /* placeholder:text-gray-500 */
	}
`;
