// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Route, Routes } from "react-router-dom";

import Campground from "@/pages/campground/Campground";
import Delete from "@/pages/campground/Delete/Delete";
import DeleteReview from "@/pages/campground/DeleteReview/DeleteReview";
import Edit from "@/pages/campground/Edit/Edit";
import New from "@/pages/campground/New/New";
import Reviews from "@/pages/campground/Reviews/Reviews";
import Show from "@/pages/campground/Show/Show";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Logout from "@/pages/logout/Logout";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/register/Register";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/api/campground/" element={<Campground />} />
      {/* <Route path="/" element={<Campground />} /> */}
      <Route path="/api/campground/new" element={<New />} />
      <Route path="/api/campground/:id/detail" element={<Show />} />
      <Route path="/api/campground/:id/edit" element={<Edit />} />
      <Route path="/api/campground/:id/delete" element={<Delete />} />
      <Route path="/api/campground/:id/reviews" element={<Reviews />} />
      <Route
        path="/api/campground/:id/reviews/:reviewId"
        element={<DeleteReview />}
      />
      <Route path="/api/auth" />
      <Route path="/api/auth/register" element={<Register />} />
      <Route path="/api/auth/login" element={<Login />} />
      <Route path="/api/auth/logout" element={<Logout />} />
      {/* <Route path="/api/users">
        <Route path="/:id/update" element />
      </Route> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
