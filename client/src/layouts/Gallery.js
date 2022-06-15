import styled from 'styled-components'
import Nft from './Nft'

const StyledDiv = styled.div`
    margin-right: 50px;
    margin-left: 50px;
    margin-top: 10px;
`

function Gallery({nftlist, keyword, address}) {
    return (
        <StyledDiv>
            {nftlist.map((el,index) => {
                if(keyword !== '' && !el.name.includes(keyword) ) {
                    return null;
                }
                if(address !== '' && el.owner !== address) {
                    return null;
                }
                return (
                    <Nft el={el} key={index}/>
                )
            })}
        </StyledDiv>
    )
}

export default Gallery;