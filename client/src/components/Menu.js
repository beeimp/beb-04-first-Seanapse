import { Link } from "react-router-dom";
import styled from "styled-components";
import InputBox from "./InputBox";
import Propile from "./Propile";
import Wallet from "./Wallet";


function Menu() {

    const Div = styled.div`
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-grow: 1;
    
    `
    const StyledLink = styled(Link)`
        text-decoration: none;
        color: inherit;
        border: 0px;
        background-color: transparent;

        margin-left: 20px;
        margin-right: 20px;

        font-weight: 400;
        font-size: 1.8ch;
    `

    return (
      <Div>        
        <InputBox></InputBox>
        <StyledLink to='/explore'>Explore</StyledLink>
        <StyledLink to='/stats'>Stats</StyledLink>
        <StyledLink to='/resources'>Resources</StyledLink>
        <StyledLink to='/create'>Create</StyledLink>
        <StyledLink to='/account'><Propile></Propile></StyledLink>        
        {/* <StyledLink to='/login'><Propile></Propile></StyledLink>     */}
        <Wallet/>
      </Div>
    );
  }
  export default Menu;