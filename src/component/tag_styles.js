import styled from 'styled-components';

export const HeadBox = styled.div`
position:fixed;
 background: #fff;
width: 100%;
`;

export const HeadBoxNoDisplay = styled(HeadBox)`
display: none;
`;

export const FootBox = styled.div`
position:fixed;
background: black;
bottom: 0;
width: 100%;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	margin: 0 auto;
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 15px;
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(185px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color: #fff;
margin-bottom: 0px;
font-size: 10px;
text-decoration: none;

&:hover {
	color: green;
	transition: 200ms ease-in;
}
`;
export const HeadHeading = styled.p`
font-size: 16px;
color: black;
margin-bottom: 0px;
margin-top: 0px;
font-weight: bold;
`;
export const FootHeading = styled.p`
font-size: 12px;
color: #fff;
margin-bottom: 0px;
font-weight: bold;
`;
