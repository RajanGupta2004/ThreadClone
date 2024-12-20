import Header from "./components/common/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Protected/Home";
import Search from "./pages/Protected/Search";
import Error from "./pages/Error";
import { Box } from "@mui/material";
import ProtectedLayout from "./pages/Protected/ProtectedLayout";
import ProfileLayout from "./pages/Protected/profile/ProfileLayout";
import Threads from "./pages/Protected/profile/Threads";
import Replies from "./pages/Protected/profile/Replies";
import Repost from "./pages/Protected/profile/Repost";
import SinglePost from "./pages/SinglePost";
import Register from "./pages/Register";
import { useMyInfoQuery } from "./redux/service";
import { useSelector } from "react-redux";

function App() {
  const { data, isError } = useMyInfoQuery();
  // const { myInfo } = useSelector((state) => state.service);
  // console.log("myInfo", isError, data);

  if (isError || !data) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Register />} />
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <>
      <Box minHeight={"100vh"}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<ProtectedLayout />}>
              <Route path="" element={<Home />} />
              <Route path="post/:id" element={<SinglePost />} />
              <Route path="search" element={<Search />} />
              <Route exact path="profile" element={<ProfileLayout />}>
                <Route path="threads/:id" element={<Threads />} />
                <Route path="replies/:id" element={<Replies />} />
                <Route path="reposts/:id" element={<Repost />} />
              </Route>
            </Route>

            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
