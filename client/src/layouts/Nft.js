import styled from "styled-components";
import { useNavigate } from 'react-router-dom'

const StyledDiv = styled.div`
    border-radius:10px;
    border: solid 1.5px #EAECEF;  
    max-width: 280px;
    padding: 10px;
    margin-top: 10px;
    margin-left: 20px;
    float: left; 
`

const NftCollectionName = styled.p`
    color: rgb(112, 122, 131);
    font-weight: 500;
    font-size: 13px;
`

const NftImage = styled.img`
    max-width: 100%;
`
const NftName = styled.p`
    color: rgb(53, 56, 64);
    font-size: 15px;
    letter-spacing: 0.1px;
    font-weight: 600;
    margin-top: -12px;
    text-align: left;
`

function NFT(props) {

    const navigate = useNavigate();
    const el = props.el;

    return (
        <StyledDiv key={el.index} onClick={() => navigate("/detail/" + el.tokenId)}>
            <NftImage src={el.image} alt=""/>
            <NftCollectionName>{el.collection}</NftCollectionName>
            <NftName>{el.name}</NftName>
        </StyledDiv>
    )
}

export default NFT;