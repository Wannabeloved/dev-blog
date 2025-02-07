"use client";
import styled from "styled-components";

export default styled.div<{ width?: string }>`
	width: ${(props) => props.width || "auto"};
	flex: 1;
	background-color: #f9fafb;
	border-radius: 0.5rem;
	padding-right: 1.5rem;
	padding-left: 1.5rem;
	padding-top: 2rem;
	padding-bottom: 1rem;
`;
