import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import User from "../User/User";
import { useSelector } from "react-redux";
import { GetAllUser } from "../../../../app/redux/actions/UserAction";
import { Followers } from "../../../../infrastructure/services/api/Data/FollwersData";
const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await GetAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {Followers.map((follower, id) => {
        return (
          <div className="follower">
            <div>
              <img src={follower.img} alt="" className="followerImage" />
              <div className="name">
                <span>{follower.name}</span>
                <span>{follower.username}</span>
              </div>
            </div>

            <button className="button fc-button">Follow</button>
          </div>
        );
      })}
    </div>
  );
};

export default FollowersCard;
