import { Routes, Route } from "react-router-dom";
import MyPage from "./routes/MyPage";
import Home from "./routes/Home";
import { Menubar } from "./components/export";
import Create from "./routes/Create";
import { useEffect, useState } from "react";
import Detail from "./routes/Detail";

function App() {
  const [nftList, setNftList] = useState([]);
  const [address, setAddress] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({
          // method: "wallet_switchEthereumChain",
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x4",
              rpcUrls: ["https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"],
            },
          ], // chainId must be in hexadecimal numbers
        })
        .then((accounts) => {
          alert("지갑 연결 성공!");
        })
        .catch((err) => {
          console.error(err);
          alert(err.code);
        });
    } else {
      alert("Please install metamask!");
    }
  }, []);

  return (
    <div className="App">
      <Menubar
        setSearchKeyword={setSearchKeyword}
        address={address}
        setAddress={setAddress}
        setNftList={setNftList}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              searchKeyword={searchKeyword}
              nftList={nftList}
              setNftList={setNftList}
              address={address}
              setAddress={setAddress}
            ></Home>
          }
        ></Route>
        <Route path="/detail/:tokenId" element={<Detail></Detail>}></Route>
        <Route path="/create" element={<Create></Create>}></Route>
        <Route
          path="/mypage"
          element={<MyPage nftList={nftList} address={address}></MyPage>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
